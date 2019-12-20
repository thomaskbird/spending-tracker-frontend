import * as React from "react";
import { NoData } from "../../helpers/NoData";
import { DateRange, LoadingProps, Tag } from "src/services/Models";
import { axiosInstance } from "src/index";
import { TagListItem } from "src/components/partials/tags/TagListItem";
import { APP_DATE_FORMAT } from "../../helpers/Utils";
import moment from "moment";

interface TagListViewProps extends LoadingProps {
    onReady(api: TagListView.Api): void;
    onTagAction(action: string, tag: Tag): void;
    range: DateRange;
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
            tags: []
        };
    }

    public componentDidMount(): void {
        this.refreshTags();

        const api: TagListView.Api = {
            refreshData: () => {
                this.refreshTags();
            }
        };

        this.props.onReady(api);
    }

    public componentDidUpdate(prevProps: Readonly<TagListViewProps>): void {
        if(prevProps.range !== this.props.range) {
            this.refreshTags();
        }
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
        this.props.onToggleLoading(true);
        this.setState({
            tags: undefined
        });

        axiosInstance.get(`/tags/${this.props.range.start.format(APP_DATE_FORMAT)}/${this.props.range.end.format(APP_DATE_FORMAT)}`).then((response) => {
            if(response.data.status) {
                this.setState({
                    tags: response.data.data.tags.length !== 0 ? response.data.data.tags : []
                });
            }

            this.props.onToggleLoading(false);
        });
    }

    private tagRemove(tag: Tag): void {
        axiosInstance
        .get(`/tags/remove/${tag.id}`)
        .then((response) => {
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
