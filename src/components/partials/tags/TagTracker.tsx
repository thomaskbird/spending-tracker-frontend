import * as React from "react";
import "./TagTracker.scss";
import { Tag } from "../../../services/Models";
import { axiosInstance } from "../../../index";

interface Props {
    transactionId?: number;
}

interface State {
    isLoading: boolean;
    newTagText: string;
    tags: Tag[];
}

const COMPONENT_NAME = "TagTracker";

export class TagTracker extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
            isLoading: false,
            newTagText: "",
            tags: []
        };
    }

    /**
     * Loads the initial data
     */
    public componentDidMount(): void {
        this.refreshData();
    }

    /**
     * Necessary for update of panel data
     * @param prevProps - Interface for the props
     */
    public componentDidUpdate(prevProps: Readonly<Props>): void {
        if(this.props.transactionId !== prevProps.transactionId) {
            this.refreshData();
        }
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                <div
                    className={`${COMPONENT_NAME}__add-wrapper`}
                >
                    <div className={"FormGroup"}>
                        <div className={"FormGroup--input-indicator"}>
                            <input
                                type="text"
                                name="tag"
                                id={"tag"}
                                value={this.state.newTagText}
                                placeholder={"Enter tag..."}
                                onChange={(e: any) => { this.setState({ newTagText: e.target.value }); }}
                            />
                            <span className={"FormGroup--input-indicator"}>
                                <button
                                    type={"button"}
                                    className={"btn btn-primary"}
                                    onClick={() => {
                                        this.handleAddTag();
                                    }}
                                >
                                    Add
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`${COMPONENT_NAME}__tag-wrapper`}>
                    {this.state.tags && this.state.tags.map((tag, index) => {
                        return (
                            <span
                                key={index}
                                className={`tag ${tag.selected ? "tag--is-set" : ""}`}
                                onClick={() => {
                                    this.handleToggleSelected(tag);
                                }}
                            >
                                {tag.title}
                            </span>
                        );
                    })}
                </div>
                {this.state.isLoading ? (
                    <div className={`${COMPONENT_NAME}__loading`}>
                        <span className={`${COMPONENT_NAME}__loading--text`}>Loading...</span>
                    </div>
                ): (undefined)}
            </div>
        );
    }

    /**
     * Handles toggle of the transaction tag
     * @param tag - The tags data
     */
    private handleToggleSelected(tag: Tag): void {
        console.log("handleToggleSelected()", {
            tag_id: tag.id,
            target_id: this.props.transactionId
        });
        const togglePromise = axiosInstance.post(
            tag.selected ? `/tag/relation/remove` : `/tag/relation/add`,
            {
                tag_id: tag.id,
                target_id: this.props.transactionId,
                type: "transaction"
            }
        ).then((response: any) => {
            this.refreshData();
        }).catch((error: any) => {
            console.log("Error: ", error);
        });
    }

    /**
     * Handles adding a tag and creating a transaction tag
     */
    private handleAddTag(): void {
        const requestData: any = {
            title: this.state.newTagText
        };

        // If there is a transaction id, add the parameters to create the TagRelations
        if(this.props.transactionId) {
            requestData.target_id = this.props.transactionId;
            requestData.type = "transaction";
        }

        axiosInstance.post(`/tags`, requestData).then(response => {
            console.log("response", response);
        }).catch(error => {
            console.log("Error: ", error);
        }).then(() => {
            this.setState({
                newTagText: ""
            });

            this.refreshData();
        });
    }

    /**
     * Refreshes the views data based on the transaction id
     */
    private async refreshData(): Promise<any> {
        this.setState({
            isLoading: true,
            tags: []
        });

        axiosInstance.get(`/transaction/tag/list/${this.props.transactionId}`)
        .then(response => {
            console.log("refreshData()", response);

            this.setState({
                isLoading: false,
                tags: response.data.data.tags
            });
        });

    }
}