import * as React from "react";
import _ from "lodash";

import { Budget, DateRange, TaggableType, Transaction } from "../../../services/Models";
import { BudgetDial } from "src/components/partials/budgets/BudgetDial";
import { TagTracker } from "../tags/TagTracker";
import { CompactTable } from "../CompactTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CompactList } from "../CompactList";
import { PaginationDisplay } from "../PaginationDisplay";

interface BudgetDetailViewProps {
    budget: Budget;
    monthDisplay: any;
    transactions: Transaction[];
    onBudgetTagToggle(): void;
    onPaginationClick?(direction: string): void;
    range: DateRange;
}

interface State {
    usedBudget: number;
}

const COMPONENT_NAME = "BudgetDetailView";
const COMPONENT_CLASS_NAME = "DetailView";

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
        this.calculateUsedBudget();
    }

    public componentDidUpdate(prevProps: Readonly<BudgetDetailViewProps>): void {
        if(!_.isEqual(prevProps.transactions, this.props.transactions)) {
            this.calculateUsedBudget();
        }
    }

    private calculateUsedBudget(): void {
        if(this.props.transactions.length) {
            const transactionSum = this.props.transactions && this.props.transactions.map(transaction => transaction.amount).reduce((accumulator: any, currentValue: any) => parseFloat(accumulator) + parseFloat(currentValue));
            this.setState({
                usedBudget: transactionSum,
            });
        } else {
            this.setState({
                usedBudget: 0,
            });
        }
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_CLASS_NAME}>
                <PaginationDisplay
                    range={this.props.range}
                    onPaginationClick={(direction => this.props.onPaginationClick && this.props.onPaginationClick(direction))}
                />

                <BudgetDial
                    title={this.props.budget.title}
                    icon={this.props.budget.icon}
                    budgetFigures={{
                        used: this.state.usedBudget,
                        budgetTotal: this.props.budget.amount
                    }}
                />

                <div className={`${COMPONENT_CLASS_NAME}__detail`}>
                    <span className={`${COMPONENT_CLASS_NAME}__detail--label`}>
                        Description:
                    </span>
                    <span className={`${COMPONENT_CLASS_NAME}__detail--value`}>
                        {this.props.budget && this.props.budget.description}
                    </span>
                </div>

                <div className={`${COMPONENT_CLASS_NAME}__detail`}>
                    <span className={`${COMPONENT_CLASS_NAME}__detail--label`}>
                        Amount:
                    </span>
                    <span className={`${COMPONENT_CLASS_NAME}__detail--value`}>
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

                {this.props.transactions && this.props.transactions.length ? (
                    <>
                        <CompactList
                            items={this.props.transactions}
                            headings={["title", "amount", "type", "occurred_at"]}
                        />
                    </>
                ) : (<p>No current transactions...</p>)}
            </div>
        );
    }
}
