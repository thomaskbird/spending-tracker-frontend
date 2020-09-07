import * as React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransactionStatus, TransactionType, TransactionWithRecurring } from "../../../services/Models";

interface TransactionListItemProps {
    /**
     * The transactions data
     */
    transaction: TransactionWithRecurring;

    /**
     * Triggers a prop with the provided params
     *
     * @param {string} actionType - The type of action to execute
     * @param {TransactionWithRecurring} transaction - The transaction data
     */
    onAction(actionType: string, transaction: TransactionWithRecurring): void;
}

interface State {
    isDragOpen: boolean;
}

const COMPONENT_NAME = "ListItem";

export class TransactionListItem extends React.Component<
    TransactionListItemProps,
    State
> {
    constructor(props: TransactionListItemProps, context: any) {
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
                        className={`${COMPONENT_NAME}__content`}
                        onClick={() => {
                            this.props.onAction("view", this.props.transaction);
                        }}
                    >
                        <h5>{this.props.transaction.title}</h5>
                        <small>{this.props.transaction.description}</small>

                        {this.props.transaction.tags ? (
                            <div className={`${COMPONENT_NAME}__content--tags`}>
                                {this.props.transaction.is_bill ? (
                                    <div
                                        className={`${COMPONENT_NAME}__content--tags-tag ${COMPONENT_NAME}__content--tags-tag__bill`}
                                    >
                                        Bill
                                    </div>
                                ): (undefined)}

                                {this.props.transaction.tags.map((tag, i) => (
                                    <div
                                        key={i}
                                        className={`${COMPONENT_NAME}__content--tags-tag ${COMPONENT_NAME}__content--tags-tag__default`}
                                    >
                                        {tag.title}
                                    </div>
                                ))}
                            </div>
                        ): (undefined)}
                    </div>
                    <div className={`${COMPONENT_NAME}__info`}>
                        <div className={`${COMPONENT_NAME}__info--date`}>
                            {moment(this.props.transaction.occurred_at).format(
                                "YYYY-MM-DD"
                            )}
                        </div>

                        <div
                            className={`${COMPONENT_NAME}__info--amount ${COMPONENT_NAME}__info--amount--${
                                this.props.transaction.type ===
                                TransactionType.income
                                    ? "income"
                                    : "expense"
                            }`}
                        >
                            {this.props.transaction.type ===
                            TransactionType.income
                                ? "+"
                                : "-"}{" "}
                            ${this.props.transaction.amount.toFixed(2)}
                        </div>
                        <div
                            className={`${COMPONENT_NAME}__info--queued`}
                        >
                            {this.props.transaction.status === TransactionStatus.queued ? (
                                <span>Queued</span>
                            ) : (undefined)}
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
                            this.props.onAction("view", this.props.transaction);
                        }}
                    >
                        View
                    </button>
                    <button
                        className={"edit"}
                        onClick={() => {
                            this.props.onAction("edit", this.props.transaction);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className={"remove"}
                        onClick={() => {
                            this.props.onAction(
                                "remove",
                                this.props.transaction
                            );
                        }}
                    >
                        Remove
                    </button>
                </div>
            </div>
        );
    }
}
