import * as React from "react";
import "./IntroView.scss";
import { HeaderPartial } from "../partials/HeaderPartial";
import { AlertType, ErrorDisplay, IntroActionType } from "../../services/Models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "antd";
import { axiosInstance } from "../../index";
import { Redirect } from "react-router";

interface IntroViewProps {}

interface State {
    action: IntroActionType;
    email: string | undefined;
    password: string | undefined;
    cpassword: string | undefined;
    errors: ErrorDisplay;
    loginSuccess: boolean;
    forgotPassword: boolean;
}

const COMPONENT_NAME = "IntroView";

export class IntroView extends React.Component<IntroViewProps, State> {
    public static readonly displayName = "Intro View";

    constructor(props: IntroViewProps, context: any) {
        super(props, context);

        this.state = {
            email: "",
            password: "",
            cpassword: "",
            action: IntroActionType.login,
            loginSuccess: false,
            forgotPassword: false,
            errors: {
                error: false,
                type: undefined,
                msgs: []
            }
        };
    }

    public render(): JSX.Element {
        if (this.state.loginSuccess) {
            return <Redirect to={"/admin"} />;
        }

        if(this.state.forgotPassword) {
            return <Redirect to={"/forgot-password"} />
        }

        const errorMsgs =
            this.state.errors.msgs.length !== 0
                ? this.state.errors.msgs.map((msg) => `${msg}<br/>`)
                : "";

        let submitBtnText: string;
        let secondaryBtnText: string;

        if (this.state.action === IntroActionType.login) {
            submitBtnText = "Login";
            secondaryBtnText = "Signup";
        } else {
            submitBtnText = "Signup";
            secondaryBtnText = "Cancel";
        }

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
                    className={`${COMPONENT_NAME}__signup`}
                    onSubmit={(event) => {
                        this.handleSubmit(event);
                    }}
                >
                    <h2>{submitBtnText}</h2>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Animi consequatur culpa deserunt eaque earum,
                        eligendi enim hic inventore maxime nemo nulla numquam
                        obcaecati porro quae qui recusandae sint sunt veritatis!
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

                    {this.state.action !== IntroActionType.login ? (
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
                    ) : (
                        undefined
                    )}

                    <div className={"FormGroup FormGroup__inline"}>
                        <button type="submit" className={"btn btn-primary"}>
                            {submitBtnText}
                        </button>
                        <button
                            type="button"
                            className={"btn btn-default"}
                            onClick={() => {
                                this.setState({
                                    action:
                                        IntroActionType.signup ===
                                        this.state.action
                                            ? IntroActionType.login
                                            : IntroActionType.signup
                                });
                            }}
                        >
                            {secondaryBtnText}
                        </button>
                        <button
                            type="button"
                            className={"btn btn-default"}
                            onClick={() => this.setState({ forgotPassword: true })}
                        >
                            Forgot password?
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    private handleSubmit(e: any): void {
        if (this.state.action === IntroActionType.signup) {
            this.handleSignupSubmit(e);
        } else {
            this.handleLoginSubmit(e);
        }
    }

    private handleLoginSubmit(e: any): void {
        if (this.state.email && this.state.password) {
            axiosInstance
                .post("login", {
                    email: this.state.email,
                    password: this.state.password
                })
                .then((response) => {
                    console.log("response", response);

                    if (response.status) {
                        localStorage.setItem(
                            "token",
                            response.data.data.user.api_token
                        );

                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.data.data.user)
                        );

                        axiosInstance.defaults.headers.common[
                            "Authorization"
                        ] = `Bearer ${localStorage.getItem("token")}`;

                        this.setState({
                            loginSuccess: true
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
                })
                .catch((error) => {console.log("error", error);
                    this.setState({
                        errors: {
                            error: true,
                            type: AlertType.error,
                            msgs: [error.message]
                        }
                    });
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

    private handleSignupSubmit(e: any): void {
        console.log("handleSignupSubmit");

        if (this.state.email && this.state.password && this.state.cpassword) {
            if (this.state.password === this.state.cpassword) {
                axiosInstance
                    .post("signup", {
                        email: this.state.email,
                        password: this.state.password
                    })
                    .then((response) => {
                        console.log("success", response);
                        if (response.status) {
                            this.setState({
                                errors: {
                                    error: false,
                                    type: AlertType.success,
                                    msgs: [
                                        "Your account has been created, check your email for verification link!"
                                    ]
                                }
                            });
                        }
                    })
                    .catch((error) => {
                        this.setState({
                            errors: {
                                error: true,
                                type: AlertType.error,
                                msgs: [
                                    "Uh oh, something went wrong please try again!"
                                ]
                            }
                        });
                    });
            } else {
                this.setState({
                    errors: {
                        error: true,
                        type: AlertType.error,
                        msgs: ["Your passwords must match please try again!"]
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
