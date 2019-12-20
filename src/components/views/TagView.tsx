import * as React from "react";
import "./TagView.scss";
import { HeaderPartial } from "../partials/HeaderPartial";
import { DateRange, PanelActionTypes, Tag } from "../../services/Models";
import { SidebarPartial } from "../partials/SidebarPartial";
import { TagListView } from "../partials/tags/TagListView";
import { TagForm } from "../partials/tags/TagForm";
import { TagPanelPartial } from "../partials/tags/TagPanelPartial";
import { axiosInstance } from "../../index";
import { RouteViewport } from "../partials/RouteViewport";
import moment from "moment";

interface Props {

}

interface State {
    isSidebarOpen: boolean;
    isAddTagOpen: boolean;
    tagActionType: PanelActionTypes | undefined;
    tagToEdit: Tag | undefined;
    isLoading: boolean;
    range: DateRange;
}

const COMPONENT_NAME = "View";

export class TagView extends React.Component<Props, State> {

    private listApi?: TagListView.Api;
    private formTagAddApi?: TagForm.Api;

    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
            isSidebarOpen: false,
            isAddTagOpen: false,
            tagActionType: undefined,
            tagToEdit: undefined,
            isLoading: false,
            range: {
                start: moment().startOf("month"),
                end: moment().endOf("month")
            },
        };
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME} PageView`}>
                <HeaderPartial
                    onToggleSidebar={() => {
                        this.toggleSidebarPanel(true);
                    }}
                    onToggleContextPanel={(isOpen, actionType) => {
                        this.toggleTagPanel(isOpen, actionType);
                    }}
                    range={this.state.range}
                    onDateRangeChange={(dateRange) => this.handleDateRangeChange(dateRange)}
                />

                <div className={"BodyPartial"}>
                    <RouteViewport
                        isLoading={this.state.isLoading}
                    >
                        <TagListView
                            range={this.state.range}
                            onTagAction={(
                                action: PanelActionTypes,
                                tag
                            ) => this.toggleTagPanel(true, action, tag)}
                            onReady={(api: TagListView.Api) => {
                                this.listApi = api;
                            }}
                            onToggleLoading={(action) => this.setState({ isLoading: action })}
                        />
                    </RouteViewport>

                    <SidebarPartial
                        sidebarClass={this.state.isSidebarOpen}
                        onClose={() => {
                            this.closeSlidePanels();
                        }}
                    />

                    <TagPanelPartial
                        isAddTagOpen={this.state.isAddTagOpen}
                        onClose={() => {
                            this.closeSlidePanels();
                        }}
                        tagActionType={this.state.tagActionType}
                        tagToEdit={this.state.tagToEdit}
                        onReady={(api) => {
                            this.formTagAddApi = api;
                        }}
                        onTagAdd={(formData) => {
                            this.tagAdd(formData);
                        }}
                        onToggleTagPanel={() => {
                            this.toggleTagPanel(false, undefined, undefined);
                        }}
                    />
                </div>
            </div>
        );
    }

    /**
     * Formats data and sends a request to the api
     * @param formData - The form transaction data
     */
    private tagAdd(formData: any): void {
        this.setState({ isLoading: true });
        let apiUrl = "/tags";
        let formattedData: any = {
            title: formData.title,
            description: formData.description
        };

        // Determine if this is an edit action
        if (this.state.tagToEdit) {
            apiUrl = `/tags/${this.state.tagToEdit.id}`;
            formattedData = {
                ...this.state.tagToEdit,
                ...formattedData
            };
        }

        axiosInstance
        .post(apiUrl, {
            ...formattedData
        })
        .then((response) => {
            console.log("success", response);
            if (response.status) {
                this.listApi!.refreshData();
                this.closeSlidePanels();
                this.formTagAddApi!.clearData();
            }
        })
        .catch((error) => {
            console.log("error", error);
        }).then(() => {
            this.setState({ isLoading: false });
        });
    }

    /**
     * Toggles the sidebar panel
     * @param {boolean} isOpen - Indicates whether the panel should be open
     */
    private toggleSidebarPanel(isOpen: boolean): void {
        this.setState({
            isSidebarOpen: isOpen,
            isAddTagOpen: false
        });
    }

    /**
     * Toggles the tag panel and sets the appropriate details
     *
     * @param {boolean} isOpen - Indicates whether the panel should be open
     * @param {string | undefined} actionType - What actions is taking place
     * @param {Tag | undefined} tag - The tag the action is happening to
     */
    private toggleTagPanel(
        isOpen: boolean,
        actionType: PanelActionTypes | undefined,
        tag?: Tag | undefined
    ): void {
        this.setState({
            range: {
                start: moment().startOf("month"),
                end: moment().endOf("month")
            },
            isSidebarOpen: false,
            isAddTagOpen: isOpen,
            tagActionType: actionType,
            tagToEdit: tag
        });
    }

    /**
     * Closes the slide panels
     */
    private closeSlidePanels(): void {
        this.setState({
            isSidebarOpen: false,
            isAddTagOpen: false,
        });
    }

    private handleDateRangeChange(next: DateRange | string): void {
        if(typeof next === "object") {console.log("object", next);
            this.setState({
                range: next
            });
        } else {
            if(next === "previous") {
                this.setState({
                    range: {
                        start: moment(this.state.range!.start).subtract(1, "month").startOf(),
                        end: moment(this.state.range!.end).subtract(1, "month").endOf()
                    }
                });
            } else {
                this.setState({
                    range: {
                        start: moment(this.state.range!.start).add(1, "month").startOf(),
                        end: moment(this.state.range!.end).add(1, "month").endOf()
                    }
                });
            }
        }
    }
}
