import * as React from "react";
import { TaggableType, TransactionStatus, TransactionType, TransactionWithRecurring } from "../../../services/Models";
import { TagTracker } from "../tags/TagTracker";
import { Link } from "react-router-dom";

interface TransactionDetailViewProps {
    transaction: TransactionWithRecurring;
    onTransactionTagToggle(): void;
}

interface State {}

const COMPONENT_NAME = "DetailView";

export class TransactionDetailView extends React.Component<
    TransactionDetailViewProps,
    State
> {
    constructor(props: TransactionDetailViewProps, context: any) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                <div className={`${COMPONENT_NAME}__detail ${COMPONENT_NAME}__detail--full-width`}>
                    <span className={`${COMPONENT_NAME}__detail--value`}>
                        <h2>
                            {this.props.transaction &&
                                this.props.transaction.title}
                        </h2>
                    </span>
                </div>

                <div className={`${COMPONENT_NAME}__detail ${COMPONENT_NAME}__detail--full-width`}>
                    <span className={`${COMPONENT_NAME}__detail--value`}>
                        {this.props.transaction &&
                            this.props.transaction.description}
                    </span>
                </div>

                <div className={`${COMPONENT_NAME}__detail`}>
                    <span className={`${COMPONENT_NAME}__detail--label`}>
                        Amount:
                    </span>
                    <span className={`${COMPONENT_NAME}__detail--value`}>
                        {this.props.transaction &&
                        this.props.transaction.type === TransactionType.income
                            ? "+"
                            : "-"}{" "}
                        $
                        {this.props.transaction &&
                            this.props.transaction.amount}
                    </span>
                </div>

                <div className={`${COMPONENT_NAME}__detail`}>
                    <span className={`${COMPONENT_NAME}__detail--label`}>
                        Type:
                    </span>
                    <span className={`${COMPONENT_NAME}__detail--value`}>
                        {this.props.transaction && this.props.transaction.type}
                    </span>
                </div>

                <div className={`${COMPONENT_NAME}__detail`}>
                    <span className={`${COMPONENT_NAME}__detail--label`}>
                        Status:
                    </span>
                    <span className={`${COMPONENT_NAME}__detail--value`}>
                        {this.props.transaction && this.props.transaction.status}
                        {this.props.transaction && this.props.transaction.status === TransactionStatus.queued ? (
                            <button type={`button`}>Remove from queue</button>
                        ) : (undefined)}
                    </span>
                </div>

                <div className={`${COMPONENT_NAME}__detail`}>
                    <span className={`${COMPONENT_NAME}__detail--label`}>
                        Occured:
                    </span>
                    <span className={`${COMPONENT_NAME}__detail--value`}>
                        {this.props.transaction &&
                            this.props.transaction.occurred_at}
                    </span>
                </div>

                {this.props.transaction && this.props.transaction.recurring ? (
                    <>
                        <div className={`${COMPONENT_NAME}__detail`}>
                            <span
                                className={`${COMPONENT_NAME}__detail--label`}
                            >
                                Recurring type:
                            </span>
                            <span
                                className={`${COMPONENT_NAME}__detail--value`}
                            >
                                {this.props.transaction &&
                                    this.props.transaction.recurring &&
                                    this.props.transaction.recurring
                                        .recurring_type}
                            </span>
                        </div>

                        <div className={`${COMPONENT_NAME}__detail`}>
                            <span
                                className={`${COMPONENT_NAME}__detail--label`}
                            >
                                Start on:
                            </span>
                            <span
                                className={`${COMPONENT_NAME}__detail--value`}
                            >
                                {this.props.transaction &&
                                    this.props.transaction.recurring &&
                                    this.props.transaction.recurring.start_at}
                            </span>
                        </div>

                        <div className={`${COMPONENT_NAME}__detail`}>
                            <span
                                className={`${COMPONENT_NAME}__detail--label`}
                            >
                                Ends on:
                            </span>
                            <span
                                className={`${COMPONENT_NAME}__detail--value`}
                            >
                                {this.props.transaction &&
                                    this.props.transaction.recurring &&
                                    this.props.transaction.recurring.end_at}
                            </span>
                        </div>
                    </>
                ) : (
                    <p>Not a recurring transaction</p>
                )}

                <TagTracker
                    type={TaggableType.transaction}
                    targetId={
                        this.props.transaction && this.props.transaction.id
                    }
                    onToggleTag={() => {
                        // this.props.onTransactionTagToggle();
                    }}
                />
            </div>
        );
    }
}
