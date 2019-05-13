import * as React from "react";
import { NoData } from "../../helpers/NoData";
import { Tag } from "src/services/Models";
import { axiosInstance } from "src/index";
import { TagListItem } from "src/components/partials/tags/TagListItem";

interface TagListViewProps {
    onReady(api: TagListView.Api): void;
    onTagAction(action: string, tag: Tag): void;
}

interface State {
    tags: Tag[] | undefined;
}

const COMPONENT_NAME = "TagListView";

export class TagListView extends React.Component<
    TagListViewProps,
    State
    > {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: TagListViewProps, context: any) {
        super(props, context);

        this.state = {
            tags: [
                {
                    id: 1,
                    title: "Tag 1",
                    slug: "tag-1",
                    description: "Tag 1",
                    created_at: "2019-05-12",
                    updated_at: "2019-05-12",
                    deleted_at: null
                },
                {
                    id: 2,
                    title: "Tag 2",
                    slug: "tag-2",
                    description: "Tag 2",
                    created_at: "2019-05-12",
                    updated_at: "2019-05-12",
                    deleted_at: null
                },
                {
                    id: 3,
                    title: "Tag 3",
                    slug: "tag-3",
                    description: "Tag 3",
                    created_at: "2019-05-12",
                    updated_at: "2019-05-12",
                    deleted_at: null
                }
            ]
        };
    }

    public componentDidMount(): void {
        // todo: remove this comment below when api is working again
        // this.refreshTags();

        const api: TagListView.Api = {
            refreshData: () => {
                this.refreshTags();
            }
        };

        this.props.onReady(api);
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                {this.state.tags &&
                this.state.tags.map((tag: Tag, idx: number) => {
                    return (
                        <TagListItem
                            key={idx}
                            tag={tag}
                            onAction={(actionType, tagData) => {
                                if (actionType === "remove") {
                                    this.tagRemove(tagData);
                                } else {
                                    this.props.onTagAction(
                                        actionType,
                                        tagData
                                    );
                                }
                            }}
                        />
                    );
                })}

                {!this.state.tags || this.state.tags.length < 1 ? (
                    <NoData type={"tags"} />
                ) : (
                    undefined
                )}
            </div>
        );
    }

    private refreshTags(): void {
        this.setState({
            tags: undefined
        });

        axiosInstance.get(`/tags`).then((response) => {
            if(response.data.status) {
                this.setState({
                    tags: response.data.data.tags.length !== 0 ? response.data.data.tags : []
                });
            }
        });
    }

    private tagRemove(tag: Tag): void {
        axiosInstance
        .get(`/tags/remove/${tag.id}`)
        .then((response) => {
            console.log("response", response);
            this.refreshTags();
        })
        .catch((error) => console.log("Error", error));
    }
}

export namespace TagListView {
    export interface Api {
        refreshData(): void;
    }
}
