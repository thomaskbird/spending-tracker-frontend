import * as React from "react";
import "./TransactionPanelPartial.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransactionForm } from "./TransactionForm";
import { TransactionDetailView } from "./TransactionDetailView";
import {
    PanelActionTypes,
    TransactionWithRecurring
} from "../../../services/Models";
import { $enum } from "ts-enum-util";
import { SplitTransactionForm } from "./SplitTransactionForm";

interface TransactionPanelPartialProps {
    isAddTransactionOpen: boolean;
    onClose(): void;
    transactionActionType: PanelActionTypes | undefined;
    transactionToEdit: TransactionWithRecurring | undefined;
    onReady(api: TransactionForm.Api): void;
    onTransactionAdd(formData: any): void;
    onToggleTransactionPanel(): void;
    onTransactionTagToggle(): void;
    onRefreshTransactions(): void;
    onSplitBill(transaction: TransactionWithRecurring): void;
}

interface State {}

const COMPONENT_NAME = "PanelPartial";

export class TransactionPanelPartial extends React.Component<
    TransactionPanelPartialProps,
    State
> {
    public static readonly displayName = "Transaction Panel Partial";

    constructor(props: TransactionPanelPartialProps, context: any) {
        super(props, context);

        this.state = {};
    }

    public componentDidUpdate(prevProps: TransactionPanelPartialProps): void {
        // test
    }

    public render(): JSX.Element {
        return (
            <div
                className={
                    this.props.isAddTransactionOpen
                        ? `${COMPONENT_NAME} open`
                        : COMPONENT_NAME
                }
            >
                <span
                    className={`${COMPONENT_NAME}--close-btn ${COMPONENT_NAME}--close-btn__add`}
                    onClick={() => {
                        this.props.onClose();
                    }}
                >
                    <FontAwesomeIcon icon={"times"} />
                </span>

                {$enum.visitValue(this.props.transactionActionType).with({
                    [PanelActionTypes.view]: () => this.renderTransactionDetailView(),
                    [PanelActionTypes.edit]: () => this.renderTransactionAddForm(),
                    [PanelActionTypes.add]: () => this.renderTransactionAddForm(),
                    [PanelActionTypes.split]: () => this.renderSplitTransactionForm(),
                    [$enum.handleUndefined]: () => this.renderTransactionDetailView(),
                })}
            </div>
        );
    }

    private renderSplitTransactionForm(): JSX.Element {
        return (
            <SplitTransactionForm
                transaction={this.props.transactionToEdit}
                onReady={(api) => {
                    this.props.onReady(api);
                }}
                onSplit={() => {
                    this.props.onRefreshTransactions();
                    this.props.onClose();
                }}
                onCancel={() => {
                    this.props.onToggleTransactionPanel();
                }}
            />
        );
    }

    private renderTransactionAddForm(): JSX.Element {
        return (
            <TransactionForm
                transaction={this.props.transactionToEdit}
                onReady={(api) => this.props.onReady(api)}
                onSubmit={(formData) => this.props.onTransactionAdd(formData)}
                onCancel={() => this.props.onToggleTransactionPanel()}
            />
        );
    }

    private renderTransactionDetailView(): JSX.Element {
        return (
            <TransactionDetailView
                onRefreshTransactions={() => {
                    this.props.onRefreshTransactions();
                    this.props.onClose();
                }}
                onSplitBill={(transaction) => this.props.onSplitBill(transaction)}
                transaction={this.props.transactionToEdit!}
                onTransactionTagToggle={() => this.props.onToggleTransactionPanel()}
            />
        );
    }
}
