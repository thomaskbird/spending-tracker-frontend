import * as React from "react";
import { LoadingProps, TransactionWithRecurring } from "../../../services/Models";
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
}

const COMPONENT_NAME = "ListView";

export class TransactionListView extends React.Component<
    TransactionListViewProps,
    State
> {
    constructor(props: TransactionListViewProps, context: any) {
        super(props, context);

        this.state = {
            transactions: undefined
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
                this.setState({
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
