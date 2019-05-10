import * as React from "react";
import _ from "lodash";
import "./BudgetDetail.scss";
import { Budget, TaggableType, Transaction } from "../../../services/Models";

import { BudgetDial } from "src/components/partials/budgets/BudgetDial";
import { TagTracker } from "../tags/TagTracker";

interface BudgetDetailViewProps {
    budget: Budget;
    onBudgetTagToggle(): void;
}

interface State {
    usedBudget: number;
}

const COMPONENT_NAME = "BudgetDetail";

export class BudgetDetailView extends React.Component<
    BudgetDetailViewProps,
    State
> {
    constructor(props: BudgetDetailViewProps, context: any) {
        super(props, context);

        this.state = {
            usedBudget: 0
        };
    }

    public componentDidMount(): void {
        if(this.props.budget.tags) {
            const transactions: any = [];
            const tags = this.props.budget.tags.map(tag => {
                return tag.transactions!.map(transaction => {
                    transactions.push(parseFloat(transaction.amount as any));
                });
            });

            if(transactions.length) {
                const transactionSum = transactions.reduce((accumulator: any, currentValue: any) => parseFloat(accumulator) + parseFloat(currentValue));
                this.setState({ usedBudget: transactionSum });
            }
        }
    }

    public componentDidUpdate(prevProps: Readonly<BudgetDetailViewProps>): void {
        if(prevProps.budget !== this.props.budget) {
            if(this.props.budget.tags) {
                const transactions: any = [];
                this.props.budget.tags.map(tag => {
                    return tag.transactions!.map(transaction => {
                        transactions.push(parseFloat(transaction.amount as any));
                    });
                });

                if(transactions.length) {
                    const transactionSum = transactions.reduce((accumulator: any, currentValue: any) => parseFloat(accumulator) + parseFloat(currentValue));
                    this.setState({ usedBudget: transactionSum });
                }
            }
        }
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
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
            </div>
        );
    }
}
