import * as React from "react";
import "./IntroView.scss";
import { HeaderPartial } from "../partials/HeaderPartial";
import {
  IntroActionType,
  ErrorDisplay,
} from "../../services/Models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "antd";
import {axiosInstance} from "../../index";
import { Redirect } from "react-router";

interface IntroViewProps {}

interface State {
  action: IntroActionType;
  email: string | undefined;
  password: string | undefined;
  cpassword: string | undefined;
  errors: ErrorDisplay;
  loginSuccess: boolean;
}

const COMPONENT_NAME = "IntroView";

export class IntroView extends React.Component<IntroViewProps, State> {
  public static readonly displayName = "Intro View";

  private store: any;

  constructor(props: IntroViewProps, context: any) {
    super(props, context);

    this.store = new Storage();

    this.state = {
      email: "",
      password: "",
      cpassword: "",
      action: IntroActionType.login,
      errors: {
        error: false,
        type: undefined,
        msgs: []
      },
      loginSuccess: false
    };
  }

  public render(): JSX.Element {

    if(this.state.loginSuccess) {
      return (<Redirect to={"/admin"}/>);
    }

    const errorMsgs = this.state.errors.msgs.length !== 0 ? this.state.errors.msgs.map(msg => `${msg}<br/>`) : "";

    return (
      <div className={COMPONENT_NAME}>
        <HeaderPartial/>

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
        ) : (undefined)}

        {this.state.action === IntroActionType.login ? (
          <form
            className={`${COMPONENT_NAME}__login`}
            onSubmit={event => {
              this.handleLoginSubmit(event);
            }}
          >
            <h2>Login</h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur culpa deserunt eaque earum, eligendi enim hic inventore maxime nemo nulla numquam obcaecati porro quae qui recusandae sint sunt veritatis!</p>

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

            <div className={"FormGroup__inline"}>
              <button
                type="submit"
                className={"btn btn-primary"}
              >Login</button>
              <button
                type="button"
                className={"btn btn-default"}
                onClick={() => {
                  this.setState({
                    action: IntroActionType.signup
                  });
                }}
              >Signup</button>
            </div>
          </form>
        ) : (
          <form
            className={`${COMPONENT_NAME}__signup`}
            onSubmit={event => {
              this.handleSignupSubmit(event);
            }}
          >
            <h2>Signup</h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur culpa deserunt eaque earum, eligendi enim hic inventore maxime nemo nulla numquam obcaecati porro quae qui recusandae sint sunt veritatis!</p>

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

            <div className={"FormGroup"}>
              <label htmlFor={"cpassword"}>Confirm Password:</label>
              <div className={"FormGroup--input-indicator"}>
                <span className={"FormGroup--input-indicator-icon"}>
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
              <button
                type="submit"
                className={"btn btn-primary"}
              >Signup</button>
              <button
                type="button"
                className={"btn btn-default"}
                onClick={() => {
                  this.setState({
                    action: IntroActionType.login
                  });
                }}
              >Cancel</button>
            </div>
          </form>
        )}
      </div>
    );
  }

  private handleLoginSubmit(e: any): void {
    if(this.state.email && this.state.password) {
      axiosInstance
      .post("login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log("response", response);

        if(response.status) {
          localStorage.setItem("token", response.data.data.user.api_token);

          this.setState({
            loginSuccess: true
          });
        } else {
          this.setState({
            errors: {
              error: true,
              type: "error",
              msgs: response.errors
            }
          });
        }
      });
    } else {
      this.setState({
        errors: {
          error: true,
          type: "error",
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

    if(this.state.email && this.state.password && this.state.cpassword) {
      if(this.state.password === this.state.cpassword) {

        axiosInstance
        .post("signup", {
          email: this.state.email,
          password: this.state.password
        })
        .then(response => {
          console.log("success", response);
          if (response.status) {
            this.setState({
              errors: {
                error: false,
                type: "success",
                msgs: [
                  "Your account has been created, check your email for verification link!"
                ]
              }
            });
          }
        })
        .catch(error => {
          this.setState({
            errors: {
              error: true,
              type: "error",
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
            type: "error",
            msgs: [
              "Your passwords must match please try again!"
            ]
          }
        });
      }
    } else {
      this.setState({
        errors: {
          error: true,
          type: "error",
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
    })
  }
}
