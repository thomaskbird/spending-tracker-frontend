import * as React from "react";
import "./IntroView.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HeaderPartial } from "../partials/HeaderPartial";
import { IntroActionType } from "../../services/Models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IntroViewProps {}

interface State {
  action: IntroActionType;
  email: string | undefined;
  password: string | undefined;
  cpassword: string | undefined;
}

const COMPONENT_NAME = "IntroView";

export class IntroView extends React.Component<IntroViewProps, State> {
  public static readonly displayName = "Intro View";

  constructor(props: IntroViewProps, context: any) {
    super(props, context);

    this.state = {
      email: undefined,
      password: undefined,
      cpassword: undefined,
      action: IntroActionType.login
    };
  }

  public render(): JSX.Element {
    return (
      <div className={COMPONENT_NAME}>
        <HeaderPartial/>

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
                <input type="text" name="email" id={"email"} value={this.state.email} />
              </div>
            </div>

            <div className={"FormGroup"}>
              <label htmlFor={"password"}>Password:</label>
              <div className={"FormGroup--input-indicator"}>
                <span className={"FormGroup--input-indicator-icon"}>
                  <FontAwesomeIcon icon={"lock"} />
                </span>
                <input type="password" name="password" id={"password"} value={this.state.password} />
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
                <input type="text" name="email" id={"email"} value={this.state.email} />
              </div>
            </div>

            <div className={"FormGroup"}>
              <label htmlFor={"password"}>Password:</label>
              <div className={"FormGroup--input-indicator"}>
                <span className={"FormGroup--input-indicator-icon"}>
                  <FontAwesomeIcon icon={"lock"} />
                </span>
                <input type="password" name="password" id={"password"} value={this.state.password} />
              </div>
            </div>

            <div className={"FormGroup"}>
              <label htmlFor={"cpassword"}>Confirm Password:</label>
              <div className={"FormGroup--input-indicator"}>
                <span className={"FormGroup--input-indicator-icon"}>
                  <FontAwesomeIcon icon={"lock"} />
                </span>
                <input type="password" name="cpassword" id={"cpassword"} value={this.state.cpassword} />
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
    console.log("handleLoginSubmit");
    e.preventDefault();
  }

  private handleSignupSubmit(e: any): void {
    console.log("handleSignupSubmit");
    e.preventDefault();
  }
}
