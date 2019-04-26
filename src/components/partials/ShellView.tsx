import * as React from "react";
import "./ShellView.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TransactionView } from "../views/TransactionView";
import { IntroView } from "../views/IntroView";
import { ActivationView } from "../views/ActivationView";

interface ShellViewProps {}

interface State {}

const COMPONENT_NAME = "ShellView";

export class ShellView extends React.Component<ShellViewProps, State> {
  public static readonly displayName = "Shell View";

  constructor(props: ShellViewProps, context: any) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <Router>
        <>
          <Route exact={true} path={"/"} component={IntroView} />
          <Route path={"/admin"} component={TransactionView} />
          <Route path={"/activate/:token"} component={ActivationView} />
        </>
      </Router>
    );
  }
}
