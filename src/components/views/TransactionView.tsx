import * as React from "react";
import "./TransactionView.scss";
import moment from "moment";

import { TransactionListView } from "../partials/transactions/TransactionListView";
import { TransactionForm } from "../partials/transactions/TransactionForm";

import { DateRange, PanelActionTypes, TransactionCategory, TransactionWithRecurring } from "../../services/Models";
import { HeaderPartial } from "../partials/HeaderPartial";
import { axiosInstance } from "../../index";
import { SidebarPartial } from "../partials/SidebarPartial";
import { TransactionPanelPartial } from "../partials/transactions/TransactionPanelPartial";
import { APP_DATE_FORMAT } from "../helpers/Utils";
import { RouteViewport } from "../partials/RouteViewport";

interface TransactionViewProps {}

interface State {
    isSidebarOpen: boolean;
    isAddTransactionOpen: boolean;
    range: DateRange;
    isLoading: boolean;
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
            isSidebarOpen: false,
            isAddTransactionOpen: false,
            range: {
                start: moment().startOf("month"),
                end: moment().endOf("month")
            },
            transactionToEdit: undefined,
            transactionActionType: undefined,
            isLoading: false,
            transactionCategory: TransactionCategory.transactions
        };
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME} PageView`}>
                <HeaderPartial
                    range={this.state.range}
                    onToggleSidebar={() => {
                        this.toggleSidebarPanel(true);
                    }}
                    onToggleContextPanel={(isOpen, actionType) => {
                        this.toggleTransactionPanel(isOpen, actionType);
                    }}
                    onDateRangeChange={(range) => this.handleDateRangeChange(range)}
                    selectedTransactionType={this.state.transactionCategory}
                    onToggleTransactionType={() => this.setState({ transactionCategory: this.state.transactionCategory === TransactionCategory.transactions ? TransactionCategory.queue : TransactionCategory.transactions})}
                />

                <div className={"BodyPartial"}>
                    <RouteViewport
                        isLoading={this.state.isLoading}
                    >
                        <TransactionListView
                            start={moment(this.state.range.start).format(APP_DATE_FORMAT)}
                            end={moment(this.state.range.end).format(APP_DATE_FORMAT)}
                            transactionCategory={this.state.transactionCategory}
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
                            onToggleLoading={(action) => this.setState({ isLoading: action })}
                        />
                    </RouteViewport>

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

    private handleDateRangeChange(next: DateRange | string): void {
        if(typeof next === "object") {console.log("object", next);
            this.setState({
                range: next
            });
        } else {
            if(next === "previous") {
                this.setState({
                    range: {
                        start: moment(this.state.range.start).subtract(1, "month").startOf(),
                        end: moment(this.state.range.end).subtract(1, "month").endOf()
                    }
                });
            } else {
                this.setState({
                    range: {
                        start: moment(this.state.range.start).add(1, "month").startOf(),
                        end: moment(this.state.range.end).add(1, "month").endOf()
                    }
                });
            }
        }
    }

    /**
     * Formats data and sends a request to the api
     * @param formData - The form transaction data
     */
    private transactionAdd(formData: any): void {
        this.setState({ isLoading: true });
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
            }).then(() => {
                this.setState({ isLoading: false });
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
