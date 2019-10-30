import * as React from "react";
import _ from "lodash";

import { Budget, TaggableType, Transaction } from "../../../services/Models";
import { BudgetDial } from "src/components/partials/budgets/BudgetDial";
import { TagTracker } from "../tags/TagTracker";
import { CompactTable } from "../CompactTable";

interface BudgetDetailViewProps {
    budget: Budget;
    onBudgetTagToggle(): void;
    onPaginationClick?(direction: string): void;
}

interface State {
    usedBudget: number;
    transactions: Transaction[];
}

const COMPONENT_NAME = "DetailView";

export class BudgetDetailView extends React.Component<
    BudgetDetailViewProps,
    State
> {
    constructor(props: BudgetDetailViewProps, context: any) {
        super(props, context);

        this.state = {
            usedBudget: 0,
            transactions: []
        };
    }

    public componentDidMount(): void {
        if(this.props.budget.tags) {
            this.calculateUsedBudget();
        }
    }

    public componentDidUpdate(prevProps: Readonly<BudgetDetailViewProps>): void {
        if(!_.isEqual(prevProps.budget, this.props.budget)) {
            if(this.props.budget.tags) {
                this.calculateUsedBudget();
            }
        }
    }

    private calculateUsedBudget(): void {
        const transactions: any = [];
        const transactionsCalculation: any = [];
        this.props.budget.tags!.map(tag => {
            return tag.transactions!.map(transaction => {
                transactionsCalculation.push(parseFloat(transaction.amount as any));
                transactions.push(transaction);
            });
        });

        if(transactionsCalculation.length) {
            const transactionSum = transactionsCalculation.reduce((accumulator: any, currentValue: any) => parseFloat(accumulator) + parseFloat(currentValue));
            this.setState({
                usedBudget: transactionSum,
                transactions: transactions
            });
        }
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                <div className={`${COMPONENT_NAME}__pagination pagination`}>
                    <button
                        type={"button"}
                        className={"pagination__button"}
                        onClick={() => this.props.onPaginationClick && this.props.onPaginationClick("previous")}
                    >
                        Previous
                    </button>
                    <button
                        type={"button"}
                        className={"pagination__button"}
                        onClick={() => this.props.onPaginationClick && this.props.onPaginationClick("next")}
                    >
                        Next
                    </button>
                </div>
                <div className={`${COMPONENT_NAME}__detail`}>
                    <span className={`${COMPONENT_NAME}__detail--label`}>
                        Title:
                    </span>
                    <span className={`${COMPONENT_NAME}__detail--value`}>
                        <h2>{this.props.budget && this.props.budget.title}</h2>
                    </span>
                </div>

                <BudgetDial
                    title={this.props.budget.title}
                    icon={this.props.budget.icon}
                    budgetFigures={{
                        used: this.state.usedBudget,
                        budgetTotal: this.props.budget.amount
                    }}
                />

                <div className={`${COMPONENT_NAME}__detail`}>
                    <span className={`${COMPONENT_NAME}__detail--label`}>
                        Description:
                    </span>
                    <span className={`${COMPONENT_NAME}__detail--value`}>
                        {this.props.budget && this.props.budget.description}
                    </span>
                </div>

                <div className={`${COMPONENT_NAME}__detail`}>
                    <span className={`${COMPONENT_NAME}__detail--label`}>
                        Amount:
                    </span>
                    <span className={`${COMPONENT_NAME}__detail--value`}>
                        ${this.props.budget && this.props.budget.amount}
                    </span>
                </div>

                <TagTracker
                    type={TaggableType.budget}
                    targetId={
                        this.props.budget && this.props.budget.id
                    }
                    onToggleTag={() => {
                        this.props.onBudgetTagToggle();
                    }}
                />

                {this.state.transactions.length ? (
                    <CompactTable
                        items={this.state.transactions}
                        headings={["title", "amount"]}
                    />
                ) : (undefined)}
            </div>
        );
    }
}
