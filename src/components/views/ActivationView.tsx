import * as React from "react";
import "./ActivationView.scss";
import { HeaderPartial } from "../partials/HeaderPartial";
import { RouteComponentProps } from "react-router";
import axios from "axios";

interface ActivationViewProps extends RouteComponentProps<any> {}

interface State {
  activationCode: string;
  email: string;
}

const COMPONENT_NAME = "ActivationView";

export class ActivationView extends React.Component<ActivationViewProps, State> {
  public static readonly displayName = "Activation View";

  constructor(props: ActivationViewProps, context: any) {
    super(props, context);

    const token = props.match.params.token;
    const tokenParts = atob(token).split("||");

    this.state = {
      activationCode: token,
      email: tokenParts[0]
    };
  }

  public render(): JSX.Element {
    return (
      <div className={COMPONENT_NAME}>
        <HeaderPartial/>

        <div className={`${COMPONENT_NAME}__activation`}>
          <h2>Account Activation</h2>

          <p>Is this your email? Please confirm and your account will be active</p>
          <pre>{this.state.email}</pre>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              this.handleConfirmed();
            }}
          >Confirm & Activate</button>
        </div>
      </div>
    );
  }

  private handleConfirmed(): void {
    axios
    .get(`activate/${this.state.activationCode}`)
    .then(response => {
      console.log("success", response);
      if (response.status) {

      }
    })
    .catch(error => {

    });
  }
}
