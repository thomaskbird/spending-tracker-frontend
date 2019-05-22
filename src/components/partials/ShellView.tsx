import * as React from "react";
import "./ShellView.scss";
import { BrowserRouter as Router, Switch, Route, Link, match, RouteProps } from "react-router-dom";
import { TransactionView } from "../views/TransactionView";
import { IntroView } from "../views/IntroView";
import { ActivationView } from "../views/ActivationView";
import { BudgetView } from "../views/BudgetView";
import { TagView } from "../views/TagView";
import { VisualizationsView } from "../views/VisualizationsView";

interface ShellViewProps extends RouteProps {}

interface State {
    currentPath: string | undefined;
}

const COMPONENT_NAME = "ShellView";

export class ShellView extends React.Component<ShellViewProps, State> {
    public static readonly displayName = "Shell View";

    constructor(props: ShellViewProps, context: any) {
        super(props, context);

        this.state = {
            currentPath: undefined
        };
    }

    public componentDidUpdate(prevProps: Readonly<ShellViewProps>, prevState: Readonly<State>, snapshot?: any): void {
        if(this.props.location && prevProps.location && this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({
                currentPath: this.props.location && this.props.location.pathname
            });
        }
    }

    public render(): JSX.Element {
        return (
            <Switch>
                <>
                    <Route
                        exact={true}
                        path={"/"}
                        component={IntroView}
                    />
                    <Route
                        exact={true}
                        path={"/admin/budgets"}
                        component={BudgetView}
                    />
                    <Route
                        exact={true}
                        path={"/admin/tags"}
                        component={TagView}
                    />
                    <Route
                        exact={true}
                        path={"/admin/visualizations"}
                        component={VisualizationsView}
                    />
                    <Route
                        exact={true}
                        path={"/admin"}
                        component={TransactionView}
                    />
                    <Route
                        path={"/activate/:token"}
                        component={ActivationView}
                    />
                </>
            </Switch>
        );
    }
}
