import * as React from "react";
import "./TransactionView.scss";
import moment from "moment";

import { ConnectedTransactionListView, TransactionListView } from "../partials/transactions/TransactionListView";
import { TransactionForm } from "../partials/transactions/TransactionForm";

import { DateRange, PanelActionTypes, TransactionCategory, TransactionWithRecurring } from "../../services/Models";
import { ConnectedHeaderPartial } from "../partials/HeaderPartial";
import { axiosInstance } from "../../index";
import { ConnectedSidebarPartial } from "../partials/SidebarPartial";
import { ConnectedTransactionPanelPartial } from "../partials/transactions/TransactionPanelPartial";
import { ConnectedRouteViewport } from "../partials/RouteViewport";
import { connect } from "react-redux";
import { toggleLoading } from "../../redux/ui-actions";
import { ImportIntro } from "../partials/settings/ImportIntro";

interface TransactionViewProps {
    // redux
    isReduxSidebarOpen: boolean;
    isReduxDetailOpen: boolean;
    transactionActionType: PanelActionTypes;
    toggleLoading(): void;
}

interface State {
    isAddTransactionOpen: boolean;
    range: DateRange;
    isPickerOpen: boolean;
    transactionToEdit: TransactionWithRecurring | undefined;
    transactionActionType: PanelActionTypes | undefined;
    transactionCategory: TransactionCategory;
}

const COMPONENT_NAME = "TransactionView";

export class TransactionView extends React.Component<
    TransactionViewProps,
    State
> {
    public static readonly displayName = "Transaction View";

    private listApi?: TransactionListView.Api;
    private formTransactionAddApi?: TransactionForm.Api;

    constructor(props: TransactionViewProps, context: any) {
        super(props, context);

        this.state = {
            isPickerOpen: false,
            isAddTransactionOpen: false,
            range: {
                start: moment().startOf("month"),
                end: moment().endOf("month")
            },
            transactionToEdit: undefined,
            transactionActionType: undefined,
            transactionCategory: TransactionCategory.transactions
        };
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME} PageView`}>
                <ConnectedHeaderPartial
                    selectedTransactionType={this.state.transactionCategory}
                    onToggleTransactionType={() => this.setState({ transactionCategory: this.state.transactionCategory === TransactionCategory.transactions ? TransactionCategory.queue : TransactionCategory.transactions})}
                />

                <div className={"BodyPartial"}>
                    <ConnectedRouteViewport>
                        <ConnectedTransactionListView
                            transactionCategory={this.state.transactionCategory}
                            onTransactionAction={(
                                action: PanelActionTypes,
                                transaction: any
                            ) => {
                                this.toggleTransactionPanel(
                                    true,
                                    action,
                                    transaction
                                );
                            }}
                            onReady={(api: any) => {
                                this.listApi = api;
                            }}
                        />
                    </ConnectedRouteViewport>

                    <ConnectedSidebarPartial />

                    <ConnectedTransactionPanelPartial
                        onRefreshTransactions={() => this.listApi!.refreshData()}
                        transactionToEdit={this.state.transactionToEdit}
                        onReady={(api) => {
                            this.formTransactionAddApi = api;
                        }}
                        onTransactionTagToggle={() => {
                            this.listApi!.refreshData();
                        }}
                        onSplitBill={(transaction: TransactionWithRecurring) => this.toggleTransactionPanel(
                            true,
                            PanelActionTypes.split,
                            transaction
                        )}
                    />
                </div>
            </div>
        );
    }

    /**
     * Formats data and sends a request to the api
     * @param formData - The form transaction data
     */
    private transactionAdd(formData: any): void {
        this.props.toggleLoading();
        let apiUrl = "/transactions/create";
        let formattedData: any = {
            title: formData.title,
            description: formData.description,
            occurred_at: formData.occurred_at,
            amount: formData.amount,
            type: formData.type
        };

        // Determine if the form isRecurring and add the corresponding data
        if (formData.isRecurring) {
            formattedData = {
                ...formattedData,
                recurring_type: formData.recurring_type,
                start_at: formData.start_at,
                end_at: formData.end_at
            };
        }

        // Determine if this is an edit action
        if (this.state.transactionToEdit) {
            apiUrl = `/transactions/edit/${this.state.transactionToEdit.id}`;
            formattedData = {
                ...this.state.transactionToEdit,
                ...formattedData
            };
        }

        axiosInstance
            .post(apiUrl, {
                ...formattedData
            })
            .then((response) => {
                console.log("success", response);
                if (response.status) {
                    this.listApi!.refreshData();
                    this.closeSlidePanels();
                    this.formTransactionAddApi!.clearData();
                }
            })
            .catch((error) => {
                console.log("error", error);
            })
            .then(() => this.props.toggleLoading());
    }

    /**
     * Closes the slide panels
     */
    private closeSlidePanels(): void {
        this.listApi!.refreshData();
        this.setState({
            isAddTransactionOpen: false,
            transactionToEdit: undefined
        });
    }

    /**
     * Toggles the transaction panels and sets the appropriate details
     *
     * @param {boolean} isOpen - Indicates whether the panel should be open
     * @param {string | undefined} actionType - What actions is taking place
     * @param {TransactionWithRecurring | undefined} transaction - The transaction the action is happening to
     */
    private toggleTransactionPanel(
        isOpen: boolean,
        actionType: PanelActionTypes | undefined,
        transaction?: TransactionWithRecurring | undefined
    ): void {
        this.setState({
            isAddTransactionOpen: isOpen,
            transactionActionType: actionType,
            transactionToEdit: transaction
        });
    }
}

const mapStateToProps = (state: any) => {
    return {
        isReduxSidebarOpen: state.ui.sidebarOpen,
        isReduxDetailOpen: state.ui.detailOpen,
        transactionActionType: state.ui.transactionActionType,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        toggleLoading: () => dispatch(toggleLoading())
    }
};

export const ConnectedTransactionView = connect(mapStateToProps, mapDispatchToProps)(TransactionView);
