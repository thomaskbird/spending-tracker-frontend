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
  faHome,
  faBriefcase,
  faListAlt,
  faBook,
  faFile,
  faPrint,
  faFilePdf,
  faChevronLeft,
  faChevronRight,
  faBars,
  faTimes,
  faCalendarAlt,
  faDollarSign,
  faEllipsisV,
  faCog,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPlus,
  faChevronDown,
  faChevronUp,
  faCircle,
  faHome,
  faBriefcase,
  faListAlt,
  faBook,
  faFile,
  faEnvelope,
  faPrint,
  faFilePdf,
  faChevronLeft,
  faChevronRight,
  faBars,
  faTimes,
  faCalendarAlt,
  faDollarSign,
  faEllipsisV,
  faCog,
  faEnvelope,
  faLock,
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
