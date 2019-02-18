import * as React from "react";
import "./App.scss";
import {Route, Switch} from "react-router";

import { LoginView } from "./views/LoginView";

interface AppProps {
  config?: object;
}

interface State {}

export class App extends React.Component<AppProps, State> {
  public static readonly displayName = "App component";

  constructor(props: AppProps, context: any) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
        <Switch>
          <Route path={"/login"} component={LoginView} />
        </Switch>
    );
  }
}
