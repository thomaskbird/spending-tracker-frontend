import * as React from "react";
import _ from "lodash";
import "./BudgetPanelPartial.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BudgetForm } from "./BudgetForm";
import {
    Budget,
    DateRange,
    PanelActionTypes,
    Transaction
} from "../../../services/Models";
import { BudgetDetailView } from "src/components/partials/budgets/BudgetDetailView";
import { axiosInstance } from "../../../index";
import { APP_DATE_FORMAT } from "../../helpers/Utils";
import moment from "moment";

interface BudgetPanelPartialProps {
    isAddBudgetOpen: boolean;
    onClose(): void;
    budgetActionType: PanelActionTypes | undefined;
    budgetId: number | undefined;
    onReady(api: BudgetForm.Api): void;
    onBudgetAdd(formData: any): void;
    onToggleBudgetPanel(): void;
    onBudgetTagToggle(): void;
}

interface State {
    budget: Budget | undefined;
    budgetTransactions: Transaction[];
    monthDisplay: any;
    range: DateRange;
}

const COMPONENT_NAME = "PanelPartial";

export class BudgetPanelPartial extends React.Component<
    BudgetPanelPartialProps,
    State
> {
    public static readonly displayName = "Budget Panel Partial";

    constructor(props: BudgetPanelPartialProps, context: any) {
        super(props, context);

        this.state = {
            budget: undefined,
            budgetTransactions: [],
            monthDisplay: moment().startOf("month"),
            range: {
                start: moment().startOf("month"),
                end: moment()
            }
        };
    }

    public componentDidMount(): void {
        this.refreshBudgetData();
    }

    public componentDidUpdate(prevProps: Readonly<BudgetPanelPartialProps>): void {
        if(!_.isEqual(prevProps.budgetId, this.props.budgetId)) {
            this.refreshBudgetData();
        }
    }

    private refreshBudgetData(): void {
        if(this.props.budgetId !== undefined) {
            axiosInstance.get(`/budgets/${this.props.budgetId}/${this.state.range.start.format(APP_DATE_FORMAT)}/${this.state.range.end.format(APP_DATE_FORMAT)}`).then((response) => {
                if(response.data.status) {
                    this.setState({
                        budget: response.data.data.budget,
                        budgetTransactions: response.data.data.budget_transactions
                    });
                }
            });
        }
    }

    public render(): JSX.Element {
        return (
            <div
                className={
                    this.props.isAddBudgetOpen
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

                {this.renderView()}
            </div>
        );
    }

    private renderView(): any {
        let returnMarkup;
        if(this.props.budgetActionType === "view") {
            if(this.state.budget) {
                returnMarkup = (
                    <BudgetDetailView
                        budget={this.state.budget}
                        transactions={this.state.budgetTransactions}
                        monthDisplay={this.state.monthDisplay}
                        onBudgetTagToggle={() => this.props.onBudgetTagToggle()}
                        onPaginationClick={(direction) => this.handlePaginationClick(direction)}
                    />
                );
            }
        } else {
            returnMarkup = (
                <BudgetForm
                    budget={this.props.budgetId ? this.state.budget : undefined}
                    onReady={(api) => {
                        this.props.onReady(api);
                    }}
                    onSubmit={(formData) => {
                        this.props.onBudgetAdd(formData);
                    }}
                    onCancel={() => {
                        this.props.onToggleBudgetPanel();
                    }}
                />
            );
        }

        return returnMarkup;
    }

    private handlePaginationClick(direction: string): void {
        if(direction === "previous") {
            this.setState({
                monthDisplay: moment(this.state.range.start).subtract(1, "month").startOf("month"),
                range: {
                    start: moment(this.state.range.start).subtract(1, "month").startOf("month"),
                    end: moment(this.state.range.start).subtract(1, "month").endOf("month")
                }
            }, () => {
                this.refreshBudgetData();
            });
        } else {
            this.setState({
                monthDisplay: moment(this.state.range.start).add(1, "month").startOf("month"),
                range: {
                    start: moment(this.state.range.start).add(1, "month").startOf("month"),
                    end: moment(this.state.range.start).add(1, "month").endOf("month")
                }
            }, () => {
                this.refreshBudgetData();
            });
        }
    }
}
