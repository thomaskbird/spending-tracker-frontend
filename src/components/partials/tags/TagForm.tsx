import * as React from "react";
import { Tag } from "../../../services/Models";

interface TagFormProps {
    tag?: Tag;
    onSubmit(formData: any): void;
    onReady(api: TagForm.Api): void;
    onCancel(): void;
}

interface State {
    title: string | undefined;
    description: string | undefined;
}

const COMPONENT_NAME = "TagForm";

export class TagForm extends React.Component<TagFormProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: TagFormProps, context: any) {
        super(props, context);

        this.state = {
            title: (this.props.tag && this.props.tag.title) || "",
            description:
                (this.props.tag && this.props.tag.description) || ""
        };

        const api: TagForm.Api = {
            clearData: () => {
                this.setState({
                    title: (this.props.tag && this.props.tag.title) || "",
                    description:
                        (this.props.tag && this.props.tag.description) ||
                        ""
                });
            }
        };

        this.props.onReady(api);
    }

    public render(): JSX.Element {
        const panelTitle = this.props.tag
            ? `Edit ${this.props.tag.title} tag`
            : "Add tag";
        return (
            <form
                onSubmit={(event) => {
                    this.handleFormSubmit(event);
                }}
            >
                <h2>{panelTitle}</h2>

                <div className={"FormGroup"}>
                    <label htmlFor={"title"}>Title:</label>
                    <input
                        type="text"
                        name="title"
                        id={"title"}
                        placeholder={"Enter title..."}
                        value={this.state.title}
                        onChange={(e) => {
                            this.setState({ title: e.target.value });
                        }}
                    />
                </div>

                <div className={"FormGroup"}>
                    <label htmlFor={"description"}>Description:</label>
                    <textarea
                        name="description"
                        id={"description"}
                        placeholder={"Enter description..."}
                        onChange={(e) => {
                            this.setState({ description: e.target.value });
                        }}
                        value={this.state.description}
                    />
                </div>

                <div className={"FormGroup FormGroup__inline"}>
                    <button type="submit" className={"btn btn-primary"}>
                        Submit
                    </button>
                    <button
                        type="button"
                        className={"btn btn-default"}
                        onClick={() => {
                            this.props.onCancel();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }

    private handleFormSubmit(event: any): void {
        this.props.onSubmit(this.state);
        event.preventDefault();
    }
}

export namespace TagForm {
    export interface Api {
        clearData(): void;
    }
}
