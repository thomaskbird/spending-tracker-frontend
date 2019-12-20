import * as React from "react";
import * as _ from "lodash";
import { Tag, Transaction, TransactionType, TransactionWithRecurring } from "../../../services/Models";
import moment from "moment";

interface TagDetailViewProps {
    tag: Tag;
}

interface State {
}

const COMPONENT_NAME = "DetailView";

export class TagDetailView extends React.Component<
    TagDetailViewProps,
    State
> {
    private transactions: Transaction[] = [];

    constructor(props: TagDetailViewProps, context: any) {
        super(props, context);

        this.state = {};
    }

    public componentDidMount(): void {
        this.transactions = this.props.tag.transactions || [];
    }

    public componentDidUpdate(prevProps: Readonly<TagDetailViewProps>, prevState: Readonly<State>, snapshot?: any): void {
        console.log("transactions", prevProps.tag.transactions, this.props.tag.transactions);
        if(_.isEqual(prevProps.tag.transactions, this.props.tag.transactions)) {
            this.transactions = this.props.tag.transactions!;
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
                        <h2>{this.props.tag && this.props.tag.title}</h2>
                    </span>
                </div>

                <div className={`${COMPONENT_NAME}__detail`}>
                    <span className={`${COMPONENT_NAME}__detail--label`}>
                        Description:
                    </span>
                    <span className={`${COMPONENT_NAME}__detail--value`}>
                        {this.props.tag && this.props.tag.description}
                    </span>
                </div>

                {this.transactions ? (
                    <div className={`${COMPONENT_NAME}__detail--list`}>
                        <div className={`${COMPONENT_NAME}__detail--list__header`}>
                            Transactions
                        </div>
                        <div className={`${COMPONENT_NAME}__detail--list__header--border-bottom`}/>
                        <div className={`${COMPONENT_NAME}__detail--list__body`}>
                            {this.transactions.map((transaction, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`${COMPONENT_NAME}__detail--list__body-item`}
                                    >
                                        <span>
                                            <b>{transaction.title}</b><br/>
                                            {transaction.description}
                                        </span>
                                        <span>
                                            {transaction.type ===
                                            TransactionType.income
                                                ? "+"
                                                : "-"}{" "}
                                            {transaction.amount}<br/>
                                            <span className={`${COMPONENT_NAME}__detail--list__body-item--date`}>
                                                {moment(transaction.occurred_at).format(
                                                "YYYY-MM-DD"
                                                )}
                                            </span>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={`${COMPONENT_NAME}__detail--list__body-item`}>
                                <span>
                                    <b>Total</b>
                                </span>
                                <span>
                                    ${this.props.tag && this.props.tag.transactions && this.props.tag.transactions.reduce((total: number, item: any) => {
                                        if(item.type === TransactionType.income) {
                                            return total + item.amount;
                                        } else {
                                            return total - item.amount;
                                        }
                                    }, 0).toFixed(2)}
                                </span>
                        </div>
                    </div>
                ) : (undefined)}
            </div>
        );
    }
}
