import * as React from "react";
import "./ActivationView.scss";
import { HeaderPartial } from "../partials/HeaderPartial";
import { Redirect, RouteComponentProps } from "react-router";
import { axiosInstance } from "../../index";

interface ActivationViewProps extends RouteComponentProps<any> {}

interface State {
    activationCode: string;
    email: string;
    first_name: string;
    last_name: string;
    activationSuccess: boolean;
}

const COMPONENT_NAME = "ActivationView";

export class ActivationView extends React.Component<
    ActivationViewProps,
    State
> {
    public static readonly displayName = "Activation View";

    constructor(props: ActivationViewProps, context: any) {
        super(props, context);

        const token = props.match.params.token;
        const tokenParts = atob(token).split("||");

        this.state = {
            activationCode: token,
            email: tokenParts[0],
            first_name: "",
            last_name: "",
            activationSuccess: false
        };
    }

    public render(): JSX.Element {
        if (this.state.activationSuccess) {
            return <Redirect to={"/"} />;
        }

        return (
            <div className={COMPONENT_NAME}>
                <HeaderPartial />

                <div className={`${COMPONENT_NAME}__activation`}>
                    <h2>Account Activation</h2>

                    <p>
                        Is this your email? Please confirm and your account will
                        be active
                    </p>
                    <pre>{this.state.email}</pre>

                    <div className={"FormGroup"}>
                        <label htmlFor="first_name">First name:</label>
                        <input
                            type="text"
                            name="first_name"
                            id={"first_name"}
                            value={this.state.first_name}
                            onChange={(e: any) => {
                                this.handleInputChange(e);
                            }}
                        />
                    </div>

                    <div className={"FormGroup"}>
                        <label htmlFor="last_name">Last name:</label>
                        <input
                            type="text"
                            name="last_name"
                            id={"last_name"}
                            value={this.state.last_name}
                            onChange={(e: any) => {
                                this.handleInputChange(e);
                            }}
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            this.handleConfirmed();
                        }}
                    >
                        Confirm &amp; Activate
                    </button>
                </div>
            </div>
        );
    }

    private handleConfirmed(): void {
        axiosInstance
            .post(`activate/${this.state.activationCode}`, {
                first_name: this.state.first_name,
                last_name: this.state.last_name
            })
            .then((response) => {
                console.log("success", response);
                if (response.status) {
                    this.setState({
                        activationSuccess: true
                    });
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }

    private handleInputChange(e: any): void {
        const newState = {
            ...this.state,
            [e.target.name]: e.target.value
        };

        this.setState(newState);
    }
}
