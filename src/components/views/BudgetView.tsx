import * as React from "react";
import "./BudgetView.scss";
import { HeaderPartial } from "../partials/HeaderPartial";
import { Redirect, RouteComponentProps } from "react-router";
import {axiosInstance} from "../../index";

interface BudgetViewProps extends RouteComponentProps<any> {}

interface State {}

const COMPONENT_NAME = "BudgetView";

export class BudgetView extends React.Component<BudgetViewProps, State> {
  public static readonly displayName = "Budget View";

  constructor(props: BudgetViewProps, context: any) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={COMPONENT_NAME}>
        <HeaderPartial/>

      </div>
    );
  }
}
