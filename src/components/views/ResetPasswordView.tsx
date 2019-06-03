import * as React from "react";
import "./ResetPasswordView.scss";
import { HeaderPartial } from "../partials/HeaderPartial";
import {
    IntroActionType,
    ErrorDisplay,
    AlertType
} from "../../services/Models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "antd";
import { axiosInstance } from "../../index";
import { Redirect, RouteComponentProps } from "react-router";

interface ResetPasswordViewProps extends RouteComponentProps<any> {}

interface State {
    email: string;
    password: string | undefined;
    cpassword: string | undefined;
    completed: boolean;
    errors: ErrorDisplay;
    token: string | undefined;
}

const COMPONENT_NAME = "ResetPasswordView";

export class ResetPasswordView extends React.Component<ResetPasswordViewProps, State> {
    public static readonly displayName = "Reset Password View";

    constructor(props: ResetPasswordViewProps, context: any) {
        super(props, context);

        const token = props.match.params.token;
        const tokenParts = atob(token).split("||");

        this.state = {
            email: tokenParts[0],
            token: token,
            password: "",
            cpassword: "",
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
                    className={`${COMPONENT_NAME}__reset-password`}
                    onSubmit={(event) => {
                        this.handleSubmit(event);
                    }}
                >
                    <h2>Reset your password</h2>

                    <p>
                        Use the form below to reset your password!
                    </p>

                    <pre>{this.state.email}</pre>

                    <div className={"FormGroup"}>
                        <label htmlFor={"password"}>Password:</label>
                        <div className={"FormGroup--input-indicator"}>
                            <span className={"FormGroup--input-indicator-icon"}>
                                <FontAwesomeIcon icon={"lock"} />
                            </span>
                            <input
                                type="password"
                                name="password"
                                id={"password"}
                                value={this.state.password}
                                onChange={(e: any) => {
                                    this.handleInputChange(e);
                                }}
                            />
                        </div>
                    </div>

                    <div className={"FormGroup"}>
                        <label htmlFor={"cpassword"}>
                            Confirm Password:
                        </label>
                        <div className={"FormGroup--input-indicator"}>
                            <span
                                className={
                                    "FormGroup--input-indicator-icon"
                                }
                            >
                                <FontAwesomeIcon icon={"lock"} />
                            </span>
                            <input
                                type="password"
                                name="cpassword"
                                id={"cpassword"}
                                value={this.state.cpassword}
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
        if (this.state.password && this.state.cpassword) {
            if(this.state.password === this.state.cpassword) {
                axiosInstance
                .post(`reset-password/${this.state.token}`, {
                    password: this.state.password
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
                            "Your passwords didn't match, please try again!"
                        ]
                    }
                });
            }
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
