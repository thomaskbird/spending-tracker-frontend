import * as React from "react";
import "./ForgotPasswordView.scss";
import { HeaderPartial } from "../partials/HeaderPartial";
import {
    IntroActionType,
    ErrorDisplay,
    AlertType
} from "../../services/Models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "antd";
import { axiosInstance } from "../../index";
import { Redirect } from "react-router";

interface ForgotPasswordViewProps {}

interface State {
    email: string | undefined;
    completed: boolean;
    errors: ErrorDisplay;
}

const COMPONENT_NAME = "ForgotPasswordView";

export class ForgotPasswordView extends React.Component<ForgotPasswordViewProps, State> {
    public static readonly displayName = "Forgot Password View";

    constructor(props: ForgotPasswordViewProps, context: any) {
        super(props, context);

        this.state = {
            email: "",
            completed: false,
            errors: {
                error: false,
                type: undefined,
                msgs: []
            }
        };
    }

    public render(): JSX.Element {
        if (this.state.completed) {
            return <Redirect to={"/"} />;
        }

        const errorMsgs =
            this.state.errors.msgs.length !== 0
                ? this.state.errors.msgs.map((msg) => `${msg}<br/>`)
                : "";

        return (
            <div className={COMPONENT_NAME}>
                <HeaderPartial />

                {this.state.errors.error ? (
                    <Alert
                        message={this.state.errors.type}
                        description={errorMsgs}
                        type={this.state.errors.type}
                        closable={true}
                        onClose={(e) => {
                            this.handleAlertClose(e);
                        }}
                    />
                ) : (
                    undefined
                )}

                <form
                    className={`${COMPONENT_NAME}__forgot-password`}
                    onSubmit={(event) => {
                        this.handleSubmit(event);
                    }}
                >
                    <h2>Forgot your password</h2>

                    <p>
                        Use the form below entering your email you use to login and an email will be sent with a link to reset your password!
                    </p>

                    <div className={"FormGroup"}>
                        <label htmlFor={"email"}>Email:</label>

                        <div className={"FormGroup--input-indicator"}>
                            <span className={"FormGroup--input-indicator-icon"}>
                                <FontAwesomeIcon icon={"envelope"} />
                            </span>
                            <input
                                type="text"
                                name="email"
                                id={"email"}
                                value={this.state.email}
                                onChange={(e: any) => {
                                    this.handleInputChange(e);
                                }}
                            />
                        </div>
                    </div>

                    <div className={"FormGroup FormGroup__inline"}>
                        <button type="submit" className={"btn btn-primary"}>
                            Submit
                        </button>
                        <button
                            type="button"
                            className={"btn btn-default"}
                            onClick={() => {
                                this.setState({
                                    completed: true
                                });
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    private handleSubmit(e: any): void {
        if (this.state.email) {
            axiosInstance
            .post("forgot-password", {
                email: this.state.email
            })
            .then((response) => {
                console.log("response", response);

                if (response.status) {
                    this.setState({
                        completed: true
                    });
                } else {
                    this.setState({
                        errors: {
                            error: true,
                            type: AlertType.error,
                            msgs: response.data.errors
                        }
                    });
                }
            });
        } else {
            this.setState({
                errors: {
                    error: true,
                    type: AlertType.error,
                    msgs: [
                        "You missed one of the required values please try again!"
                    ]
                }
            });
        }

        e.preventDefault();
    }

    private handleInputChange(e: any): void {
        const newState = {
            ...this.state,
            [e.target.name]: e.target.value
        };

        this.setState(newState);
    }

    private handleAlertClose(e: any): void {
        console.log("handleAlertClose", e);
        this.setState({
            errors: {
                error: false,
                type: undefined,
                msgs: []
            }
        });
    }
}
