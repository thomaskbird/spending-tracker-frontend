import * as React from "react";
import "./ShellView.scss";
import { BrowserRouter, Switch, Route, RouteProps, Redirect } from "react-router-dom";
import { TransactionView } from "../views/TransactionView";
import { IntroView } from "../views/IntroView";
import { ActivationView } from "../views/ActivationView";
import { BudgetView } from "../views/BudgetView";
import { TagView } from "../views/TagView";
import { VisualizationsView } from "../views/VisualizationsView";
import { ForgotPasswordView } from "../views/ForgotPasswordView";
import { ResetPasswordView } from "../views/ResetPasswordView";
import { NotFoundView } from "../views/NotFoundView";
import { SettingsView } from "./SettingsView";

interface ShellViewProps extends RouteProps {}

interface State {
    currentPath: string | undefined;
    isLoggedIn: boolean;
    isLoginChecked: boolean;
}

const COMPONENT_NAME = "ShellView";

export class ShellView extends React.Component<ShellViewProps, State> {
    public static readonly displayName = "Shell View";

    constructor(props: ShellViewProps, context: any) {
        super(props, context);

        this.state = {
            currentPath: undefined,
            isLoggedIn: false,
            isLoginChecked: false
        };
    }

    public componentDidUpdate(prevProps: Readonly<ShellViewProps>, prevState: Readonly<State>, snapshot?: any): void {
        if(this.props.location && prevProps.location && this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({
                currentPath: this.props.location && this.props.location.pathname
            });

            this.checkAuth();
        }
    }

    public componentDidMount(): void {
        this.checkAuth();
    }

    public render(): JSX.Element {
        return (
            <Switch>

                    <Route
                        exact={true}
                        path={"/"}
                        component={IntroView}
                    />
                    <Route
                        path={"/forgot-password"}
                        component={ForgotPasswordView}
                    />
                    <Route
                        path={"/reset-password/:token"}
                        component={ResetPasswordView}
                    />
                    <Route
                        path={"/admin/budgets"}
                        component={BudgetView}
                    />
                    <Route
                        path={"/admin/tags"}
                        component={TagView}
                    />
                    <Route
                        path={"/admin/visualizations"}
                        component={VisualizationsView}
                    />
                    <Route
                        path={"/admin/settings"}
                        component={SettingsView}
                    />
                    <Route
                        path={"/admin"}
                        component={TransactionView}
                    />
                    <Route
                        path={"/activate/:token"}
                        component={ActivationView}
                    />
                    <Route
                        component={NotFoundView}
                    />

            </Switch>
        );
    }

    private async checkAuth(): Promise<boolean> {
        if(await localStorage.getItem("token")) {
            this.setState({ isLoginChecked: true, isLoggedIn: true });
            return Promise.resolve(true);
        }

        this.setState({ isLoginChecked: true, isLoggedIn: false });
        return Promise.resolve(false);
    }
}
