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
    selectedTagIds: number[];
    tags: Tag[];
}

const COMPONENT_NAME = "TagTracker";

export class TagTracker extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
            isLoading: false,
            newTagText: "",
            selectedTagIds: [],
            tags: []
        };
    }

    public componentDidMount(): void {
        this.refreshData();
    }

    public componentDidUpdate(prevProps: Readonly<Props>): void {
        if(this.props.transactionId !== prevProps.transactionId) {
            this.refreshData();
        }
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                <div className={`${COMPONENT_NAME}__add-wrapper`}>
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
                                        this.handleAddTag(this.state.newTagText);
                                    }}
                                >
                                    Add
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`${COMPONENT_NAME}__tag-wrapper`}>
                    {this.state.tags.length && this.state.tags.map((tag, index) => {
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

    private handleToggleSelected(tag: Tag): void {
        const togglePromise = axiosInstance.post(
            tag.selected ? `/transaction/tag/remove` : `/transaction/tag/add`,
            {
                tag_id: tag.id,
                transaction_id: this.props.transactionId
            }
        ).then((response: any) => {
            this.refreshData();
        }).catch((error: any) => {
            console.log("Error: ", error);
        });
    }

    private handleAddTag(text: string): void {
        axiosInstance.post(`/tags`, {
            title: text
        }).then(response => {
            console.log("response", response);
        }).catch(error => console.log("Error: ", error))
            .then(() => {
                this.setState({
                    newTagText: ""
                });

                this.refreshData();
            });
    }

    private addItemFlag(tags: Tag[], selectedTagIds: number[]): Tag[] {
        if(this.state.selectedTagIds) {
            const newTagState = tags.map(tag => {
                return {
                    ...tag,
                    selected: selectedTagIds && selectedTagIds.indexOf(tag.id) !== -1 ? true : false
                };
            });
            return newTagState;
        } else {
            return tags;
        }
    }

    private async refreshData(): Promise<any> {
        this.setState({
            isLoading: true,
            selectedTagIds: [],
            tags: []
        });
        const selectedTagsPromise = axiosInstance.get(`/transaction/tags/${this.props.transactionId}`);
        const tagsPromise = axiosInstance.get(`/tags`);

        return Promise.all([selectedTagsPromise, tagsPromise]).then(response => {
            console.log("response", response);
            const selectedTagIds = response[0].data.data.transaction_tag_ids;
            const tags = response[1].data;

            this.setState({
                isLoading: false,
                selectedTagIds: selectedTagIds
            }, () => {
                this.setState({
                    tags: this.addItemFlag(tags, selectedTagIds)
                });
            });
        });

    }
}