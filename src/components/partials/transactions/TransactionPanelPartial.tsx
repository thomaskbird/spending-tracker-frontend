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
import { connect } from "react-redux";
import { toggleDetailPanel } from "../../../redux/ui-actions";

interface TransactionPanelPartialProps {
    transactionToEdit: TransactionWithRecurring | undefined;
    onReady(api: TransactionForm.Api): void;
    onTransactionAdd?(formData: any): void;
    onTransactionTagToggle(): void;
    onRefreshTransactions(): void;
    onSplitBill(transaction: TransactionWithRecurring): void;

    // redux
    isReduxDetailOpen: boolean;
    transactionActionType: PanelActionTypes;
    toggleDetails(): void;
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

    public render(): JSX.Element {
        return (
            <div
                className={
                    this.props.isReduxDetailOpen
                        ? `${COMPONENT_NAME} open`
                        : COMPONENT_NAME
                }
            >
                <span
                    className={`${COMPONENT_NAME}--close-btn ${COMPONENT_NAME}--close-btn__add`}
                    onClick={() => {
                        this.props.toggleDetails();
                    }}
                >
                    <FontAwesomeIcon icon={"times"} />
                </span>

                {$enum.visitValue(this.props.transactionActionType).with({
                    [PanelActionTypes.view]: () => this.renderTransactionDetailView(),
                    [PanelActionTypes.edit]: () => this.renderTransactionAddForm(),
                    [PanelActionTypes.add]: () => this.renderTransactionAddForm(),
                    [PanelActionTypes.split]: () => this.renderSplitTransactionForm(),
                    [$enum.handleUnexpected]: () => this.renderTransactionDetailView(),
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
                    this.props.toggleDetails();
                }}
                onCancel={() => {
                    this.props.toggleDetails();
                }}
            />
        );
    }

    private renderTransactionAddForm(): JSX.Element {
        return (
            <TransactionForm
                transaction={this.props.transactionToEdit}
                onReady={(api) => this.props.onReady(api)}
                onSubmit={(formData) => this.props.onTransactionAdd && this.props.onTransactionAdd(formData)}
                onCancel={() => this.props.toggleDetails()}
            />
        );
    }

    private renderTransactionDetailView(): JSX.Element {
        return (
            <TransactionDetailView
                onRefreshTransactions={() => {
                    this.props.onRefreshTransactions();
                    this.props.toggleDetails();
                }}
                onSplitBill={(transaction) => this.props.onSplitBill(transaction)}
                transaction={this.props.transactionToEdit!}
                onTransactionTagToggle={() => this.props.toggleDetails()}
            />
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        isReduxDetailOpen: state.ui.detailOpen,
        transactionActionType: state.ui.transactionActionType,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        toggleDetails: () => dispatch(toggleDetailPanel())
    }
};

export const ConnectedTransactionPanelPartial = connect(mapStateToProps, mapDispatchToProps)(TransactionPanelPartial);
