import * as React from "react";
import "./TransactionView.scss";
import moment from "moment";

import { TransactionListView } from "../partials/transactions/TransactionListView";
import { TransactionForm } from "../partials/transactions/TransactionForm";

import {
    DateRange,
    PanelActionTypes,
    TransactionWithRecurring
} from "../../services/Models";
import { HeaderPartial } from "../partials/HeaderPartial";
import { axiosInstance } from "../../index";
import { SidebarPartial } from "../partials/SidebarPartial";
import { TransactionPanelPartial } from "../partials/transactions/TransactionPanelPartial";

interface TransactionViewProps {}

interface State {
    isSidebarOpen: boolean;
    isAddTransactionOpen: boolean;
    range: DateRange;
    isPickerOpen: boolean;
    transactionToEdit: TransactionWithRecurring | undefined;
    transactionActionType: PanelActionTypes | undefined;
}

const COMPONENT_NAME = "View";

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
            isSidebarOpen: false,
            isAddTransactionOpen: false,
            range: {
                start: moment().subtract(1, "month"),
                end: moment()
            },
            transactionToEdit: undefined,
            transactionActionType: undefined
        };
    }

    public render(): JSX.Element {
        const DATE_FORMAT = "YYYY-MM-DD";

        return (
            <div className={COMPONENT_NAME}>
                <HeaderPartial
                    onToggleSidebar={() => {
                        this.toggleSidebarPanel(true);
                    }}
                    onToggleContextPanel={(isOpen, actionType) => {
                        this.toggleTransactionPanel(isOpen, actionType);
                    }}
                    onDateRangeChange={(range) => {
                        this.setState({
                            range: range
                        });
                        this.listApi!.refreshData();
                    }}
                />

                <div className={"BodyPartial"}>
                    <div className={"route--viewport"}>
                        <TransactionListView
                            start={this.state.range.start.format(DATE_FORMAT)}
                            end={this.state.range.end.format(DATE_FORMAT)}
                            onTransactionAction={(
                                action: PanelActionTypes,
                                transaction
                            ) => {
                                this.toggleTransactionPanel(
                                    true,
                                    action,
                                    transaction
                                );
                            }}
                            onReady={(api) => {
                                this.listApi = api;
                            }}
                        />
                    </div>

                    <SidebarPartial
                        sidebarClass={this.state.isSidebarOpen}
                        onClose={() => {
                            this.closeSlidePanels();
                        }}
                    />

                    <TransactionPanelPartial
                        isAddTransactionOpen={this.state.isAddTransactionOpen}
                        onClose={() => {
                            this.closeSlidePanels();
                        }}
                        transactionActionType={this.state.transactionActionType}
                        transactionToEdit={this.state.transactionToEdit}
                        onReady={(api) => {
                            this.formTransactionAddApi = api;
                        }}
                        onTransactionAdd={(formData) => {
                            this.transactionAdd(formData);
                        }}
                        onToggleTransactionPanel={() => {
                            this.toggleTransactionPanel(
                                false,
                                undefined,
                                undefined
                            );
                        }}
                        onTransactionTagToggle={() => {
                            this.listApi!.refreshData();
                        }}
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
            });
    }

    /**
     * Closes the slide panels
     */
    private closeSlidePanels(): void {
        this.setState({
            isSidebarOpen: false,
            isAddTransactionOpen: false,
            transactionToEdit: undefined
        });
    }

    /**
     * Toggles the sidebar panel
     * @param {boolean} isOpen - Indicates whether the panel should be open
     */
    private toggleSidebarPanel(isOpen: boolean): void {
        this.setState({
            isSidebarOpen: isOpen,
            isAddTransactionOpen: false
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
            isSidebarOpen: false,
            isAddTransactionOpen: isOpen,
            transactionActionType: actionType,
            transactionToEdit: transaction
        });
    }
}
