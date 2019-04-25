import * as React from "react";
import "./IntroView.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {HeaderPartial} from "../partials/HeaderPartial";

interface IntroViewProps {}

interface State {}

const COMPONENT_NAME = "IntroView";

export class IntroView extends React.Component<IntroViewProps, State> {
  public static readonly displayName = "Intro View";

  constructor(props: IntroViewProps, context: any) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <>
        <HeaderPartial/>
        <h1>Intro</h1>
      </>
    );
  }
}
