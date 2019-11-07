import * as React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Button } from "antd";

interface ImportIntroProps {

}

interface State {
    sourceType: string | undefined;
    file: any;
}

const COMPONENT_NAME = "SettingsView";
const baseUrl = "/admin/settings";

export class ImportIntro extends React.Component<ImportIntroProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    private sourceTypeOptions = [
        { value: "discover", label: "Discover" },
        { value: "chase", label: "Chase" }
    ];

    constructor(props: ImportIntroProps, context: any) {
        super(props, context);

        this.state = {
            sourceType: undefined,
            file: undefined
        };
    }

    public render(): JSX.Element {
        return (
            <form
                onSubmit={(event) => this.handleFormSubmit(event)}
            >
                <h1>Import</h1>
                <Link to={baseUrl}>Back</Link>

                <p>To import transactions simply select the source type and select the file then click import!</p>

                <div className={"FormGroup"}>
                    <label htmlFor={"sourceType"}>Type:</label>
                    <Select
                        value={this.state.sourceType}
                        options={this.sourceTypeOptions}
                        onChange={(selectedOption: any) => {
                            this.setState({
                                sourceType: selectedOption.value
                            });
                        }}
                    />
                </div>

                <div className={"FormGroup"}>
                    <label htmlFor={"file"}>File:</label>
                    <input
                        type="file"
                        name="file"
                        id={"file"}
                        placeholder={"Select file..."}
                        value={this.state.file}
                        onChange={(e) => {
                            const newVal = (e.target
                                .value as any) as number;
                            this.setState({ file: newVal });
                        }}
                    />
                </div>

                <div className={"FormGroup FormGroup__inline"}>
                    <Button
                        type="primary"
                        htmlType={"submit"}
                        className={"btn btn-primary"}
                    >
                        Import
                    </Button>
                    <Button
                        type="default"
                        className={"btn btn-default"}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        );
    }

    private handleFormSubmit(event: any): void {
        console.log("submit", event, this.state);
        event.preventDefault();
    }
}
