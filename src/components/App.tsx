import * as React from "react";
import "./App.scss";

export interface AppProps {
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
        <div>
            <h1>Welcome To Your Blank Starter App</h1>
            <p>This repo utilizes webpack for build and development server. It combines sass for css, typescript and react for a seamless easy to use starting point for any single page app.</p>
        </div>
    );
  }
}
