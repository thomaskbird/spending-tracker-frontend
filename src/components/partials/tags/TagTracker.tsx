import * as React from "react";
import "./TagTracker.scss";
import { Tag } from "../../../services/Models";
import { axiosInstance } from "../../../index";

interface Props {
    transactionId?: number;
}

interface State {
    newTagText: string;
    selectedTagIds: number[];
    tags: Tag[];
}

const COMPONENT_NAME = "TagTracker";

export class TagTracker extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
            newTagText: "",
            selectedTagIds: [],
            tags: []
        };
    }

    public componentDidMount(): void {
        this.refreshTags();
        this.getSelectedTags();
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
            </div>
        );
    }

    private handleToggleSelected(tag: Tag): void {
        axiosInstance.post(
            `/transaction/tag/add`,
            {
                tag_id: tag.id,
                transaction_id: this.props.transactionId
            }
        ).then(response => {
            if(response.data.status) {
                this.refreshTags();
            }
        }).catch(error => console.log("Error: ", error));
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

                this.refreshTags();
            });
    }

    private addItemFlag(tags: Tag[]): Tag[] {
        const newTagState = tags.map(tag => {
            return {
                ...tag,
                selected: this.state.selectedTagIds && this.state.selectedTagIds.indexOf(tag.id) !== -1 ? true : false
            };
        });

        return newTagState;
    }

    private getSelectedTags(): void {
        axiosInstance
            .get(`/transaction/tags/${this.props.transactionId}`)
            .then(response => {
                if(response.data.status) {
                    this.setState({
                        selectedTagIds: response.data.transaction_tag_ids
                    })
                }
            }).catch(error => console.log("Errors: ", error));
    }

    private refreshTags(): void {
        axiosInstance
            .get(`/tags`)
            .then(tags => {
                this.setState({
                    tags: tags.data.length !== 0 ? this.addItemFlag(tags.data) : []
                });
            });
    }
}