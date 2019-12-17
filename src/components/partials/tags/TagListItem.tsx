import * as React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "../../../services/Models";

interface TagListItemProps {
    /**
     * The transactions data
     */
    tag: Tag;

    /**
     * Triggers a prop with the provided params
     *
     * @param {string} actionType - The type of action to execute
     * @param {TransactionWithRecurring} transaction - The transaction data
     */
    onAction(actionType: string, transaction: Tag): void;
}

interface State {
    isDragOpen: boolean;
}

const COMPONENT_NAME = "ListItem";

export class TagListItem extends React.Component<
    TagListItemProps,
    State
    > {
    constructor(props: TagListItemProps, context: any) {
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
                            this.props.onAction("view", this.props.tag);
                        }}
                    >
                        <h5>{this.props.tag.title}</h5>
                        <small>{this.props.tag.description}</small>
                    </div>
                    <div className={`${COMPONENT_NAME}__info`}>
                        <div className={`${COMPONENT_NAME}__info--date`}>
                            {moment(this.props.tag.updated_at).format(
                                "YYYY-MM-DD"
                            )}
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
                            this.props.onAction("view", this.props.tag);
                        }}
                    >
                        View
                    </button>
                    <button
                        className={"edit"}
                        onClick={() => {
                            this.props.onAction("edit", this.props.tag);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className={"remove"}
                        onClick={() => {
                            this.props.onAction("remove", this.props.tag);
                        }}
                    >
                        Remove
                    </button>
                </div>
            </div>
        );
    }
}
