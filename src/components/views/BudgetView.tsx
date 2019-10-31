import * as React from "react";
import "./BudgetView.scss";
import { HeaderPartial } from "../partials/HeaderPartial";
import { RouteComponentProps } from "react-router";
import { SidebarPartial } from "../partials/SidebarPartial";
import { BudgetListView } from "src/components/partials/budgets/BudgetListView";
import { Budget, DateRange, PanelActionTypes } from "src/services/Models";
import { BudgetPanelPartial } from "src/components/partials/budgets/BudgetPanelPartial";
import { BudgetForm } from "src/components/partials/budgets/BudgetForm";
import { axiosInstance } from "src/index";
import moment from "moment";

interface BudgetViewProps extends RouteComponentProps<any> {}

interface State {
    isSidebarOpen: boolean;
    isAddBudgetOpen: boolean;
    budgetActionType: PanelActionTypes | undefined;
    budget: Budget | undefined;
    range: DateRange;
}

const COMPONENT_NAME = "BudgetView";

export class BudgetView extends React.Component<BudgetViewProps, State> {
    public static readonly displayName = "Budget View";

    private listApi?: BudgetListView.Api;
    private formBudgetAddApi?: BudgetForm.Api;

    constructor(props: BudgetViewProps, context: any) {
        super(props, context);

        this.state = {
            isSidebarOpen: false,
            isAddBudgetOpen: false,
            budget: undefined,
            budgetActionType: undefined,
            range: {
                start: moment().startOf("month"),
                end: moment()
            }
        };
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME} PageView`}>
                <HeaderPartial
                    onToggleSidebar={() => {
                        this.toggleSidebarPanel(true);
                    }}
                    onToggleContextPanel={(isOpen, actionType) => this.toggleBudgetPanel(isOpen, actionType, undefined)}
                />

                <div className={"BodyPartial"}>
                    <div className={"route--viewport"}>
                        <BudgetListView
                            onBudgetAction={(
                                action: PanelActionTypes,
                                budget
                            ) => this.toggleBudgetPanel(true, action, budget)}
                            onReady={(api: BudgetListView.Api) => {
                                this.listApi = api;
                            }}
                            range={this.state.range}
                        />
                    </div>

                    <SidebarPartial
                        sidebarClass={this.state.isSidebarOpen}
                        onClose={() => {
                            this.closeSlidePanels();
                        }}
                    />

                    <BudgetPanelPartial
                        isAddBudgetOpen={this.state.isAddBudgetOpen}
                        onClose={() => {
                            this.closeSlidePanels();
                        }}
                        budgetActionType={this.state.budgetActionType}
                        budgetId={this.state.budget && this.state.budget.id}
                        onReady={(api) => {
                            this.formBudgetAddApi = api;
                        }}
                        onBudgetAdd={(formData) => {
                            this.budgetAdd(formData);
                        }}
                        onToggleBudgetPanel={() => this.toggleBudgetPanel(false, undefined, undefined)}
                        onBudgetTagToggle={() => {
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
    private budgetAdd(formData: any): void {
        let apiUrl = "/budgets";
        let formattedData: any = {
            title: formData.title,
            description: formData.description,
            amount: formData.amount,
            icon: formData.icon
        };

        // Determine if this is an edit action
        if (this.state.budget) {
            apiUrl = `/budgets/${this.state.budget.id}`;
            formattedData = {
                ...this.state.budget,
                ...formattedData
            };
        }

        axiosInstance
            .post(apiUrl, {
                ...formattedData
            })
            .then((response) => {
                if (response.status) {
                    this.listApi!.refreshData();
                    this.closeSlidePanels();
                    this.formBudgetAddApi!.clearData();
                }
            })
            .catch((error) => console.log("error", error));
    }

    /**
     * Toggles the sidebar panel
     * @param {boolean} isOpen - Indicates whether the panel should be open
     */
    private toggleSidebarPanel(isOpen: boolean): void {
        this.setState({
            isSidebarOpen: isOpen,
            isAddBudgetOpen: false
        });
    }

    /**
     * Toggles the budget panel and sets the appropriate details
     *
     * @param {boolean} isOpen - Indicates whether the panel should be open
     * @param {string | undefined} actionType - What actions is taking place
     * @param {Budget | undefined} budget - The budget the action is happening to
     */
    private toggleBudgetPanel(
        isOpen: boolean,
        actionType: PanelActionTypes | undefined,
        budget?: Budget | undefined
    ): void {
        this.setState({
            isSidebarOpen: false,
            isAddBudgetOpen: isOpen,
            budgetActionType: actionType,
            budget: budget
        });
    }

    /**
     * Closes the slide panels
     */
    private closeSlidePanels(): void {
        this.setState({
            isSidebarOpen: false,
            isAddBudgetOpen: false
        });
    }
}
