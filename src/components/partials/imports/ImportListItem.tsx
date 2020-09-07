import * as React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransactionStatus, TransactionType, Import } from "../../../services/Models";

interface ImportListItemProps {
    /**
     * The import data
     */
    import: Import;

    /**
     * Triggers a prop with the provided params
     *
     * @param {string} actionType - The type of action to execute
     * @param {TransactionWithRecurring} transaction - The transaction data
     */
    onAction(actionType: string, importItem: Import): void;
}

interface State {
    isDragOpen: boolean;
}

const COMPONENT_NAME = "ListItem";

export class ImportListItem extends React.Component<
    ImportListItemProps,
    State
> {
    constructor(props: ImportListItemProps, context: any) {
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
                            this.props.onAction("view", this.props.import);
                        }}
                    >
                        <h5>{this.props.import.filename}</h5>
                        <small>{this.props.import.record_ids.substring(0, 80)}</small>
                    </div>
                    <div className={`${COMPONENT_NAME}__info`}>
                        <div className={`${COMPONENT_NAME}__info--date`}>
                            {moment(this.props.import.created_at).format(
                                "YYYY-MM-DD"
                            )}
                        </div>

                        <div
                            className={`${COMPONENT_NAME}__info--amount ${COMPONENT_NAME}__info--amount--${"income"}`}
                        >
                            {this.props.import.records}
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
                            this.props.onAction("view", this.props.import);
                        }}
                    >
                        View
                    </button>
                    <button
                        className={"edit"}
                        onClick={() => {
                            this.props.onAction("edit", this.props.import);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className={"remove"}
                        onClick={() => {
                            this.props.onAction(
                                "remove",
                                this.props.import
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
