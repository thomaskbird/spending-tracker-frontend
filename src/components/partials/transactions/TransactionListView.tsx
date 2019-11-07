import * as React from "react";
import "./TransactionListView.scss";

import _ from "lodash";
import {
    LoadingProps, Transaction,
    TransactionSummaryDetails,
    TransactionType,
    TransactionWithRecurring
} from "../../../services/Models";
import { TransactionListItem } from "./TransactionListItem";
import { axiosInstance } from "../../../index";
import { NoData } from "../../helpers/NoData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TransactionListViewProps extends LoadingProps {
    start: string;
    end: string;
    onTransactionAction(
        action: string,
        transaction: TransactionWithRecurring
    ): void;
    onReady(api: TransactionListView.Api): void;
}

interface State {
    transactions: TransactionWithRecurring[] | undefined;
    transactionSummary: TransactionSummaryDetails | undefined;
    isSummaryVisible: boolean;
}

const COMPONENT_NAME = "ListView";

export class TransactionListView extends React.Component<
    TransactionListViewProps,
    State
> {
    constructor(props: TransactionListViewProps, context: any) {
        super(props, context);

        this.state = {
            transactions: undefined,
            transactionSummary: undefined,
            isSummaryVisible: true
        };
    }

    public componentDidMount(): void {
        if(this.props.start && this.props.end) {
            this.refreshTransactions();
        }

        const api: TransactionListView.Api = {
            refreshData: () => {
                this.refreshTransactions();
            }
        };

        this.props.onReady(api);
    }

    public componentDidUpdate(prevProps: TransactionListViewProps): void {
        if (
            prevProps.start !== this.props.start ||
            prevProps.end !== this.props.end
        ) {
            this.refreshTransactions();
        }
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                {this.state.transactionSummary ? (
                    <div className={`${COMPONENT_NAME}__summary`}>
                        <span
                            className={`${COMPONENT_NAME}__summary--label`}
                            onClick={() => this.setState({ isSummaryVisible: !this.state.isSummaryVisible })}
                        >
                            <span>Monthly Summary</span>
                            <FontAwesomeIcon icon={this.state.isSummaryVisible ? "chevron-up" : "chevron-down"} />
                        </span>
                        <div className={`${COMPONENT_NAME}__summary--details ${this.state.isSummaryVisible ? "" : "hidden"}`}>
                            <span className={`${COMPONENT_NAME}__summary--income`}>${this.state.transactionSummary && this.state.transactionSummary.incomeTotal}</span>
                            <span> - </span>
                            <span className={`${COMPONENT_NAME}__summary--expense`}>{this.state.transactionSummary && this.state.transactionSummary.expenseTotal}</span>
                            <span> = </span>
                            <span className={`${COMPONENT_NAME}__summary--remaining`}>{this.state.transactionSummary && this.state.transactionSummary.remainingTotal.toFixed(2)}</span>
                        </div>
                    </div>
                ): (undefined)}

                {this.state.transactions && this.state.transactions.map(
                    (
                        transaction: TransactionWithRecurring,
                        idx: number
                    ) => {
                        return (
                            <TransactionListItem
                                key={idx}
                                transaction={transaction}
                                onAction={(actionType, transactionData) => {
                                    if (actionType === "remove") {
                                        this.transactionRemove(
                                            transactionData
                                        );
                                    } else {
                                        this.props.onTransactionAction(
                                            actionType,
                                            transactionData
                                        );
                                    }
                                }}
                            />
                        );
                    }
                )}

                {!this.state.transactions ||
                this.state.transactions.length < 1 ? (
                    <NoData type={"transactions"} />
                ) : (
                    undefined
                )}
            </div>
        );
    }

    private filterAndReduce(transactions: Transaction[], type: TransactionType): number {
        const filtered = _(transactions)
            .filter(transaction => transaction.type === type)
            .map(transaction => transaction.amount)
            .value();

        let val = 0;

        if(filtered.length === 0) {
            val = 0;
        } else {
            val = filtered.reduce((accumulator: any, currentValue: any) => parseFloat(accumulator) + parseFloat(currentValue));
        }

        return val.toFixed(2) as any as number;
    }

    private refreshTransactions(): void {
        this.props.onToggleLoading(true);
        this.setState({
            transactions: undefined
        });

        axiosInstance
            .get(`/transactions/${this.props.start}/${this.props.end}`)
            .then((transactions) => {
                if(transactions.data.length) {
                    const expenseTotal = this.filterAndReduce(transactions.data, TransactionType.expense);
                    const incomeTotal = this.filterAndReduce(transactions.data, TransactionType.income);

                    this.setState({
                        transactionSummary: {
                            expenseTotal: expenseTotal,
                            incomeTotal: incomeTotal,
                            remainingTotal: (incomeTotal - expenseTotal)
                        },
                        transactions:
                            transactions.data.length !== 0 ? transactions.data : []
                    });
                } else {
                    this.setState({
                        transactionSummary: {
                            expenseTotal: 0,
                            incomeTotal: 0,
                            remainingTotal: 0
                        },
                        transactions:
                            transactions.data.length !== 0 ? transactions.data : []
                    });
                }

                this.props.onToggleLoading(false);
            });
    }

    private transactionRemove(transaction: TransactionWithRecurring): void {
        this.props.onToggleLoading(true);
        axiosInstance
            .get(`/transactions/remove/${transaction.id}`)
            .then((response) => {
                console.log("response", response);
                this.refreshTransactions();
            })
            .catch((error) => console.log("Error", error))
            .then(() => this.props.onToggleLoading(false));
    }
}

export namespace TransactionListView {
    export interface Api {
        refreshData(): void;
    }
}
