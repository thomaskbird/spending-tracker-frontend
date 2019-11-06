import * as React from "react";
import "./TransactionListView.scss";

import _ from "lodash";
import {
    LoadingProps,
    TransactionSummaryDetails,
    TransactionType,
    TransactionWithRecurring
} from "../../../services/Models";
import { TransactionListItem } from "./TransactionListItem";
import { axiosInstance } from "../../../index";
import { NoData } from "../../helpers/NoData";

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
            transactionSummary: undefined
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
                <div className={`${COMPONENT_NAME}__summary`}>
                    <span className={`${COMPONENT_NAME}__summary--label`}>Monthly Summary</span>
                    <div className={`${COMPONENT_NAME}__summary--details`}>
                        <span className={`${COMPONENT_NAME}__summary--income`}>${this.state.transactionSummary && this.state.transactionSummary.incomeTotal}</span>
                        <span> - </span>
                        <span className={`${COMPONENT_NAME}__summary--expense`}>{this.state.transactionSummary && this.state.transactionSummary.expenseTotal}</span>
                        <span> = </span>
                        <span className={`${COMPONENT_NAME}__summary--remaining`}>{this.state.transactionSummary && this.state.transactionSummary.remainingTotal.toFixed(2)}</span>
                    </div>
                </div>

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

    private refreshTransactions(): void {
        this.props.onToggleLoading(true);
        this.setState({
            transactions: undefined
        });

        axiosInstance
            .get(`/transactions/${this.props.start}/${this.props.end}`)
            .then((transactions) => {
                // todo: provide income, expenses, and how much left after expenses
                const expenseTotal = _(transactions.data)
                    .filter(transaction => transaction.type === TransactionType.expense)
                    .map(transaction => transaction.amount)
                    .value()
                    .reduce((accumulator: any, currentValue: any) => parseFloat(accumulator) + parseFloat(currentValue));
                const incomeTotal = _(transactions.data)
                    .filter(transaction => transaction.type === TransactionType.income)
                    .map(transaction => transaction.amount)
                    .value()
                    .reduce((accumulator: any, currentValue: any) => parseFloat(accumulator) + parseFloat(currentValue));

                console.log("expenseTotal", expenseTotal, incomeTotal, (incomeTotal - expenseTotal));
                this.setState({
                    transactionSummary: {
                        expenseTotal: expenseTotal,
                        incomeTotal: incomeTotal,
                        remainingTotal: (incomeTotal - expenseTotal)
                    },
                    transactions:
                        transactions.data.length !== 0 ? transactions.data : []
                });
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
