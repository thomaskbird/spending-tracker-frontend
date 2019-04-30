import * as React from "react";
import "./BudgetDetailView.scss";
import {
    Budget
} from "../../services/Models";

interface BudgetDetailViewProps {
    budget: Budget;
}

interface State {}

const COMPONENT_NAME = "BudgetDetailView";

export class BudgetDetailView extends React.Component<
    BudgetDetailViewProps,
    State
    > {
    constructor(props: BudgetDetailViewProps, context: any) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                <div className={`${COMPONENT_NAME}__detail`}>
                    <span className={`${COMPONENT_NAME}__detail--label`}>Title:</span>
                    <span className={`${COMPONENT_NAME}__detail--value`}>
                        <h2>{this.props.budget && this.props.budget.title}</h2>
                    </span>
                </div>

                <div className={`${COMPONENT_NAME}__detail`}>
                  <span className={`${COMPONENT_NAME}__detail--label`}>
                    Description:
                  </span>
                  <span className={`${COMPONENT_NAME}__detail--value`}>
                    {this.props.budget && this.props.budget.description}
                  </span>
                </div>

                <div className={`${COMPONENT_NAME}__detail`}>
                    <span className={`${COMPONENT_NAME}__detail--label`}>Amount:</span>
                    <span className={`${COMPONENT_NAME}__detail--value`}>
                        ${this.props.budget && this.props.budget.amount}
                    </span>
                </div>
            </div>
        );
    }
}
