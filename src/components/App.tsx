import * as React from "react";
import "./App.scss";
import { Route, Switch } from "react-router";

import { ShellView } from "./partials/ShellView";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faChevronUp,
  faChevronDown,
  faCircle,
  faPrint,
  faFilePdf,
  faChevronLeft,
  faChevronRight,
  faBars,
  faTimes,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faPlus,
    faChevronUp,
    faChevronDown,
    faCircle,
    faPrint,
    faFilePdf,
    faChevronLeft,
    faChevronRight,
    faBars,
    faTimes,
    faEllipsisV,
);

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
        <Route path={"*"} component={ShellView} />
      </Switch>
    );
  }
}
