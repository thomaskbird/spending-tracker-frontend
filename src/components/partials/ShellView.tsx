import * as React from "react";
import "./ShellView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { AddTransactionView } from "./AddTransactionView";
import { TransactionListView } from "./TransactionListView";
import { InsightPickerView } from "./InsightPickerView";

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
      <div className={COMPONENT_NAME}>
        <div className={"HeaderPartial"}>
          <Link to={"/slide-panel"}>
            <FontAwesomeIcon icon={"bars"}/>
          </Link>

          <div className={"branding"}>
            <div className={"branding--main"}>Spending</div>
            <div className={"branding--secondary"}>Tracker</div>
          </div>

          <Link to={"/admin/add"}>
            <FontAwesomeIcon icon={"plus"} />
          </Link>
        </div>
        <div className={"BodyPartial"}>
          <div className={"SlidePanel"}>

          </div>
          <Router>
            <>
              <Route path={"/admin/add"} component={AddTransactionView} />
              <Route path={"/admin/insights"} component={InsightPickerView} />
              <Route component={TransactionListView} />
            </>
          </Router>
        </div>
      </div>
    );
  }
}
