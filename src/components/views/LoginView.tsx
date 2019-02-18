import * as React from "react";
import "./LoginView.scss";

interface LoginViewProps {

}

interface State {}

export class LoginView extends React.Component<LoginViewProps, State> {
  public static readonly displayName = "Login View";

  constructor(props: LoginViewProps, context: any) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={"LoginView"}>
        <div className={"LoginView__header"}>
          <h2>Login</h2>
        </div>
        <div className={"LoginView__body"}>
          <div className={"FormGroup"}>
            <label htmlFor="email">Email:</label>
            <input type={"email"} id={"email"} />
          </div>

          <div className={"FormGroup"}>
            <label htmlFor="password">Password:</label>
            <input type={"password"} id={"password"} />
          </div>

          <button type="submit">Login</button>
        </div>
      </div>
    );
  }
}
