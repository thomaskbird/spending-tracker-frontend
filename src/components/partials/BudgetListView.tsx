import * as React from "react";
import { Budget, TransactionWithRecurring } from "src/services/Models";
import { axiosInstance } from "src/index";
import { BudgetListItem } from "src/components/partials/BudgetListItem";

interface BudgetListViewProps {
    onReady(api: BudgetListView.Api): void;
    onBudgetAction(
        action: string,
        budget: Budget
    ): void;
}

interface State {
    budgets: Budget[] | undefined;
}

const COMPONENT_NAME = "BudgetListView";

export class BudgetListView extends React.Component<BudgetListViewProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: BudgetListViewProps, context: any) {
        super(props, context);

        this.state = {
            budgets: undefined
        };
    }

    public componentDidMount(): void {
        this.refreshBudgets();

        const api: BudgetListView.Api = {
            refreshData: () => {
                this.refreshBudgets();
            }
        };

        this.props.onReady(api);
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                {this.state.budgets &&
                this.state.budgets.map(
                    (budget: Budget, idx: number) => {
                        return (
                            <BudgetListItem
                                key={idx}
                                budget={budget}
                                onAction={(actionType, budgetData) => {
                                    if (actionType === "remove") {
                                        this.budgetRemove(budgetData);
                                    } else {
                                        this.props.onBudgetAction(
                                            actionType,
                                            budgetData
                                        );
                                    }
                                }}
                            />
                        );
                    }
                )}

                {!this.state.budgets || this.state.budgets.length < 1 ? (
                    <p>No budgets, go add some!</p>
                ) : (
                    undefined
                )}
            </div>
        );
    }

    private refreshBudgets(): void {
        this.setState({
            budgets: undefined
        });

        axiosInstance
            .get(`/budgets`)
            .then(budgets => {
                this.setState({
                    budgets: budgets.data.length !== 0 ? budgets.data : []
                });
            });
    }

    private budgetRemove(budget: Budget): void {
        axiosInstance
            .get(`/budgets/remove/${budget.id}`)
            .then(response => {
                console.log("response", response);
                this.refreshBudgets();
            })
            .catch(error => console.log("Error", error));
    }
}

export namespace BudgetListView {
    export interface Api {
        refreshData(): void;
    }
}