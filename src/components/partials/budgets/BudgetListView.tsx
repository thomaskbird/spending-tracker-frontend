import * as React from "react";
import { NoData } from "../../helpers/NoData";
import { Budget, DateRange } from "src/services/Models";
import { axiosInstance } from "src/index";
import { BudgetListItem } from "src/components/partials/budgets/BudgetListItem";
import moment from "moment";
import { APP_DATE_FORMAT } from "../../helpers/Utils";

interface BudgetListViewProps {
    onReady(api: BudgetListView.Api): void;
    onBudgetAction(action: string, budget: Budget): void;
    range: DateRange;
}

interface State {
    budgets: Budget[] | undefined;
    range: DateRange;
}

const COMPONENT_NAME = "BudgetListView";

export class BudgetListView extends React.Component<
    BudgetListViewProps,
    State
> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: BudgetListViewProps, context: any) {
        super(props, context);

        this.state = {
            budgets: undefined,
            range: {
                start: moment().startOf("month"),
                end: moment()
            }
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

    public componentDidUpdate(prevProps: Readonly<BudgetListViewProps>): void {
        if(prevProps.range !== this.props.range) {
            this.refreshBudgets();
        }
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                {this.state.budgets &&
                    this.state.budgets.map((budget: Budget, idx: number) => {
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
                    })}

                {!this.state.budgets || this.state.budgets.length < 1 ? (
                    <NoData type={"budgets"} />
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

        axiosInstance.get(`/budgets/${this.state.range.start.format(APP_DATE_FORMAT)}/${this.state.range.end.format(APP_DATE_FORMAT)}`).then((response) => {
            if(response.data.status) {
                this.setState({
                    budgets: response.data.data.budgets.length !== 0 ? response.data.data.budgets : []
                });
            }
        });
    }

    private budgetRemove(budget: Budget): void {
        axiosInstance
            .get(`/budgets/remove/${budget.id}`)
            .then((response) => {
                this.refreshBudgets();
            })
            .catch((error) => console.log("Error", error));
    }
}

export namespace BudgetListView {
    export interface Api {
        refreshData(): void;
    }
}
