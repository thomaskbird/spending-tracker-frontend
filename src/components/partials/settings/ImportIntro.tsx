import * as React from "react";
import { $enum } from "ts-enum-util";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import { Button, Switch } from "antd";
import { axiosInstance } from "../../../index";
import { Import, SelectedImportView } from "../../../services/Models";
import { ButtonGroup } from "../library/ButtonGroup";
import { ImportListItem } from "../imports/ImportListItem";

interface ImportIntroProps {

}

interface State {
    file: any;
    redirect: boolean;
    imports: Import[];
    headerIsFirstRow: boolean;
    selectedView: SelectedImportView;
    sourceType: string | undefined;
}

const COMPONENT_NAME = "SettingsView";
const baseUrl = "/admin/settings";

export class ImportIntro extends React.Component<ImportIntroProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    private sourceTypeOptions = [
        { value: "discover", label: "Discover" },
        { value: "chase", label: "Chase" },
        { value: "fifth-third-checking", label: "Fifth Third Checking" },
        { value: "fifth-third-credit", label: "Fifth Third Credit" },
        { value: "capital-one", label: "Capital One" }
    ];

    constructor(props: ImportIntroProps, context: any) {
        super(props, context);

        this.state = {
            file: undefined,
            redirect: false,
            imports: [],
            selectedView: SelectedImportView.list,
            sourceType: undefined,
            headerIsFirstRow: false,
        };
    }

    public componentDidMount(): void {
        this.retrieveImports();
    }

    public render(): JSX.Element {
        if(this.state.redirect) {
            return (
                <Redirect to={"/admin/settings"} />
            );
        } else {
            const subView = $enum.visitValue(this.state.selectedView).with({
                [SelectedImportView.list]: () => (
                    <>
                        {this.state.imports && this.state.imports.map(importItem => (
                            <ImportListItem
                                key={importItem.id}
                                import={importItem}
                                onAction={(actionType, actionImportItem) => {
                                    console.log("actionType, importItem", actionType, actionImportItem);
                                }}
                            />
                        ))}
                    </>
                ),
                [SelectedImportView.add]: () => (
                    <>
                        <p>To import transactions simply select the source type and select the file then click import!</p>

                        <form
                            method={"post"}
                            onSubmit={(event) => this.handleFormSubmit(event)}
                        >
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
                                    onChange={(e) => {
                                        const newVal = e.target.files![0];
                                        this.setState({ file: newVal });
                                    }}
                                />
                            </div>

                            <div className={"FormGroup"}>
                                <label htmlFor={"headerIsFirstRow"}>Is the first row the header?</label>
                                <Switch
                                    checked={this.state.headerIsFirstRow}
                                    onChange={(checked) => this.setState({ headerIsFirstRow: !this.state.headerIsFirstRow })}
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
                                    onClick={() => this.setState({ redirect: true})}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </>
                )
            });

            return (
                <div className={"ImportIntro"}>
                    <div className={"row"}>
                        <div className={"column"}>
                            <h1>Imports</h1>
                        </div>
                        <div className={"column"}>
                            <ButtonGroup
                                position={"right"}
                                selected={this.state.selectedView}
                                items={[
                                    {
                                        text: "View",
                                        type: SelectedImportView.list
                                    },
                                    {
                                        text: "Add",
                                        type: SelectedImportView.add
                                    }
                                ]}
                                onSelection={(item) => this.setState({ selectedView: item.type })}
                            />
                        </div>
                    </div>

                    {subView}
                </div>
            );
        }
    }

    private handleFormSubmit(event: any): void {
        const data = new FormData();
        event.preventDefault();

        data.append("file", this.state.file);
        data.append("sourceType", this.state.sourceType!);

        axiosInstance
            .post(`/import`, data)
            .then((response) => {
                if(response.status) {
                    this.setState({ redirect: true });
                }
            })
            .catch(error => console.log("error", error));
    }

    private retrieveImports(): void {
        axiosInstance
            .get("/imports")
            .then((response) => {
                if(response.status) {
                    this.setState({ imports: response.data.data.imports});
                }
            })
    }
}
