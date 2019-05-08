import * as React from "react";
import "./ShellView.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { TransactionView } from "../views/TransactionView";
import { IntroView } from "../views/IntroView";
import { ActivationView } from "../views/ActivationView";
import { BudgetView } from "../views/BudgetView";

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
            <Switch>
                <>
                    <Route exact={true} path={"/"} component={IntroView} />
                    <Route
                        exact={true}
                        path={"/admin/budgets"}
                        component={BudgetView}
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
