import * as React from "react";
import { Import } from "../../services/Models";
import { axiosInstance } from "../../index";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
// import "./pathToFile.scss";

interface ImportSingleViewProps extends RouteComponentProps<any> {}

interface State {
    import: Import | undefined;
}

const COMPONENT_NAME = "ImportSingleView";

export class ImportSingleView extends React.Component<ImportSingleViewProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: ImportSingleViewProps, context: any) {
        super(props, context);

        this.state = {
            import: undefined,
        };
    }

    public componentDidMount(): void {
        this.getImport();
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME} PageView`}>
                {this.state.import ? (
                    <>
                        <h2>{this.state.import.filename}</h2>

                        <h3>Records: {this.state.import.records}</h3>

                        <div className={`${COMPONENT_NAME}__record-ids`}>
                            <p>{this.state.import.record_ids}</p>
                        </div>

                        <p><b>Imported on:</b> {this.state.import.created_at}</p>
                    </>
                ) : (
                    <h2>Loading...</h2>
                )}
            </div>
        );
    }

    private getImport(): void {
        axiosInstance
            .get(`/imports/${this.props.match.params.id}`)
            .then((response) => {
                if(response.status) {
                    this.setState({ import: response.data.data.import});
                }
            })
            .catch(e => console.log("Error: ", e));
    }
}
