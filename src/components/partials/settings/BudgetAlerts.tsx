import * as React from "react";
import "./BudgetAlerts.scss";

import { axiosInstance } from "../../../index";
import { Budget } from "../../../services/Models";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "antd";

interface BudgetAlertsProps {
}

interface State {
    budgets: Budget[] | undefined;
    isSummaryVisible: boolean;
}

const COMPONENT_NAME = "BudgetAlerts";

export class BudgetAlerts extends React.Component<
    BudgetAlertsProps,
    State
> {
    public static readonly displayName = "Budget alerts";

    constructor(props: BudgetAlertsProps, context: any) {
        super(props, context);

        this.state = {
            budgets: undefined,
            isSummaryVisible: false
        };
    }

    public componentDidMount(): void {
        this.refreshData();
    }

    public componentDidUpdate(prevProps: Readonly<BudgetAlertsProps>): void {
        // console.log("componentDidUpdate", prevProps, this.props);
    }

    public render(): JSX.Element {

        return (
            <div
                className={`${COMPONENT_NAME}`}
            >
                <div
                    className={`${COMPONENT_NAME}__info`}
                >
                    <div
                        className={`${COMPONENT_NAME}__info--header`}
                        onClick={() => this.setState({ isSummaryVisible: !this.state.isSummaryVisible })}
                    >
                        <h5>Manage budget alerts</h5>
                        <FontAwesomeIcon icon={"info-circle"} />
                    </div>

                    <p className={`${COMPONENT_NAME}__info--explanation ${this.state.isSummaryVisible ? "show": ""}`}>Alerts tell you when you are within a certain dollar amount of your budgets limit. To create a budget alert enter the number of when you would like to be notified that your within that amount of dollars from the budgets limit. Then tap the toggle to turn that threshold on. Turning off the alert deletes the alert entirely.</p>
                </div>

                {this.state.budgets && this.state.budgets.map((budget, index) => (
                    <div className={`${COMPONENT_NAME}__item`} key={index}>
                        <div className={`${COMPONENT_NAME}__item--icon`}>
                            <FontAwesomeIcon icon={budget.icon as IconProp} />
                        </div>
                        <div className={`${COMPONENT_NAME}__item--text`}>
                            <h3>{budget.title}</h3>
                            <span>{budget.description}</span>
                        </div>
                        <div className={`${COMPONENT_NAME}__item--toggle`}>
                            <input
                                type={"text"}
                                onChange={(e) => this.handleInputChange(e, budget)}
                                value={budget.alert && budget.alert.threshold || ""}
                            />
                            <Switch
                                checked={!!budget.alert && !!budget.alert.id}
                                onChange={(checked) => this.handleToggle(checked, budget)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    private handleToggle(checked: boolean, budget: Budget): void {
        if(checked) {
            if(budget.alert && budget.alert.threshold) {
                axiosInstance.post(`/alert`, {
                    budget_id: budget.id,
                    threshold: budget.alert && budget.alert.threshold
                }).then((response: any) => {
                    if(response.data.status) {
                        this.refreshData();
                    }
                });
            } else {
                alert("You must enter a threshold value first");
            }
        } else {
            axiosInstance.get(`/alert/remove/${budget.alert && budget.alert.id}`).then((response: any) => {
                if(response.data.status) {
                    this.refreshData();
                }
            });
        }
    }

    private handleInputChange(e: any, budget: Budget): void {
        const newData = this.state.budgets!.map(item => {
            if(item.id === budget.id) {
                return {
                    ...budget,
                    alert: {
                        ...budget.alert,
                        threshold: e.target.value
                    }
                }
            } else {
                return item;
            }
        });

        this.setState({
            budgets: newData
        });
    }

    private refreshData(): void {
        axiosInstance.get(`/budgets/alerts`).then((response: any) => {
            if(response.data.status) {
                this.setState({
                    budgets: response.data.data.budgets.length !== 0 ? response.data.data.budgets : []
                });
            }
        });
    }
}
