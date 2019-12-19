import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TagForm } from "./TagForm";
import { Tag, PanelActionTypes } from "../../../services/Models";
import { TagDetailView } from "./TagDetail";

interface TagPanelPartialProps {
    isAddTagOpen: boolean;
    onClose(): void;
    tagActionType: PanelActionTypes | undefined;
    tagToEdit: Tag | undefined;
    onReady(api: TagForm.Api): void;
    onTagAdd(formData: any): void;
    onToggleTagPanel(): void;
}

interface State {}

const COMPONENT_NAME = "PanelPartial";

export class TagPanelPartial extends React.Component<
    TagPanelPartialProps,
    State
    > {
    public static readonly displayName = "Tag Panel Partial";

    constructor(props: TagPanelPartialProps, context: any) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div
                className={
                    this.props.isAddTagOpen
                        ? `${COMPONENT_NAME} open`
                        : COMPONENT_NAME
                }
            >
                <span
                    className={`${COMPONENT_NAME}--close-btn ${COMPONENT_NAME}--close-btn__add`}
                    onClick={() => {
                        this.props.onClose();
                    }}
                >
                    <FontAwesomeIcon icon={"times"} />
                </span>

                {this.props.tagActionType !== "view" ? (
                    <TagForm
                        tag={this.props.tagToEdit}
                        onReady={(api) => {
                            this.props.onReady(api);
                        }}
                        onSubmit={(formData) => {
                            this.props.onTagAdd(formData);
                        }}
                        onCancel={() => {
                            this.props.onToggleTagPanel();
                        }}
                    />
                ) : (
                    <TagDetailView
                        tag={this.props.tagToEdit!}
                    />
                )}
            </div>
        );
    }
}
