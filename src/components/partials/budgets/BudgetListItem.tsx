import * as React from "react";
import moment from "moment";
import "./BudgetListItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Budget } from "../../../services/Models";
// import Draggable from "react-draggable";
// import Gesture from "rc-gesture";

interface BudgetListItemProps {
    /**
     * The transactions data
     */
    budget: Budget;

    /**
     * Triggers a prop with the provided params
     *
     * @param {string} actionType - The type of action to execute
     * @param {TransactionWithRecurring} transaction - The transaction data
     */
    onAction(actionType: string, transaction: Budget): void;
}

interface State {
    isDragOpen: boolean;
}

const COMPONENT_NAME = "BudgetListItem";

export class BudgetListItem extends React.Component<
    BudgetListItemProps,
    State
> {
    constructor(props: BudgetListItemProps, context: any) {
        super(props, context);

        this.state = {
            isDragOpen: false
        };
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                <div
                    className={`${COMPONENT_NAME}__main ${
                        this.state.isDragOpen ? "open" : ""
                    }`}
                >
                    <div className={`${COMPONENT_NAME}__selects`}>
                        <input type={"checkbox"} id={"transaction-box"} />
                    </div>
                    <div
                        className={`${COMPONENT_NAME}__text`}
                        onClick={() => {
                            this.props.onAction("view", this.props.budget);
                        }}
                    >
                        <h5>{this.props.budget.title}</h5>
                        <small>{this.props.budget.description}</small>
                    </div>
                    <div className={`${COMPONENT_NAME}__info`}>
                        <div className={`${COMPONENT_NAME}__info--date`}>
                            {moment(this.props.budget.updated_at).format(
                                "YYYY-MM-DD"
                            )}
                        </div>

                        <div className={`${COMPONENT_NAME}__info--amount`}>
                            ${this.props.budget.amount}
                        </div>
                    </div>
                    <div
                        className={`${COMPONENT_NAME}__drag-handle`}
                        onClick={() => {
                            this.setState({
                                isDragOpen: !this.state.isDragOpen
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={"cog"} />
                    </div>
                </div>

                <div
                    className={`${COMPONENT_NAME}__hidden-actions`}
                    onClick={() => {
                        this.setState({ isDragOpen: false });
                    }}
                >
                    <button
                        className={"view"}
                        onClick={() => {
                            this.props.onAction("view", this.props.budget);
                        }}
                    >
                        View
                    </button>
                    <button
                        className={"edit"}
                        onClick={() => {
                            this.props.onAction("edit", this.props.budget);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className={"remove"}
                        onClick={() => {
                            this.props.onAction("remove", this.props.budget);
                        }}
                    >
                        Remove
                    </button>
                </div>
            </div>
        );
    }
}
