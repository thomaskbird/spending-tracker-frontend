import * as React from "react";
import "./SettingsView.scss";

import { ConnectedHeaderPartial } from "../partials/HeaderPartial";
import { ConnectedSidebarPartial } from "../partials/SidebarPartial";
import { ConnectedRouteViewport } from "../partials/RouteViewport";
import { Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import { ConnectedImportIntro } from "../partials/settings/ImportIntro";
import { BudgetAlerts } from "../partials/settings/BudgetAlerts";
import { ImportSingleView } from "./ImportSingleView";
import { Profile } from "../partials/settings/Profile";

interface SettingsViewProps {
    togglePaginationBar(): void;
}

interface State {}

const COMPONENT_NAME = "SettingsView";
const baseUrl = "/admin/settings";

export class SettingsView extends React.Component<SettingsViewProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: SettingsViewProps, context: any) {
        super(props, context);

        this.state = {};

    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME} PageView`}>
                <ConnectedHeaderPartial />

                <div className={"BodyPartial"}>
                    <ConnectedRouteViewport>
                        <BrowserRouter>
                            <div className={`${COMPONENT_NAME}__viewport`}>
                                <Route
                                    exact={true}
                                    path={baseUrl}
                                    render={() => {
                                        return (
                                            <div className={`${COMPONENT_NAME}__intro`}>
                                                <h1>Settings</h1>

                                                <ul>
                                                    <li><Link to={`${baseUrl}/import`}>Imports</Link></li>
                                                    <li><Link to={`${baseUrl}/alerts`}>Budget alerts</Link></li>
                                                    <li><Link to={`${baseUrl}/profile`}>My profile</Link></li>
                                                </ul>
                                            </div>
                                        );
                                    }}
                                />
                                <Route
                                    path={`${baseUrl}/import`}
                                    component={ConnectedImportIntro}
                                />
                                <Route
                                    path={`${baseUrl}/alerts`}
                                    component={BudgetAlerts}
                                />
                                <Route
                                    path={`${baseUrl}/profile`}
                                    component={Profile}
                                />
                                <Route
                                    path={`${baseUrl}/imports/:id`}
                                    component={ImportSingleView}
                                />
                            </div>
                        </BrowserRouter>
                    </ConnectedRouteViewport>

                    <ConnectedSidebarPartial />
                </div>
            </div>
        );
    }
}

export const ConnectedSettingsView = SettingsView;
