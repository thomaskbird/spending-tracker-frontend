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
            budgets: undefined
        };
    }

    public componentDidMount(): void {
        axiosInstance.get(`/budgets`).then((response: any) => {
            if(response.data.status) {
                this.setState({
                    budgets: response.data.data.budgets.length !== 0 ? response.data.data.budgets : []
                });
            }
        });
    }

    public componentDidUpdate(prevProps: Readonly<BudgetAlertsProps>): void {
        // console.log("componentDidUpdate", prevProps, this.props);
    }

    public render(): JSX.Element {

        return (
            <div
                className={`${COMPONENT_NAME}`}
            >
                {this.state.budgets && this.state.budgets.map((budget, index) => (
                    <div className={`${COMPONENT_NAME}__item`} key={index}>
                        <div className={`${COMPONENT_NAME}__item--icon`}>
                            <FontAwesomeIcon icon={budget.icon as IconProp} />
                        </div>
                        <div className={`${COMPONENT_NAME}__item--text`}>
                            <h3>{budget.title}</h3>
                            <span>{budget.description}</span>
                        </div>
                        <div className={`${COMPONENT_NAME}__item--input`}>
                            <input type={"text"} />
                        </div>
                        <div className={`${COMPONENT_NAME}__item--toggle`}>
                            <Switch />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
