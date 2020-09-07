import * as React from "react";
import "./SettingsView.scss";

import { HeaderPartial } from "../partials/HeaderPartial";
import { SidebarPartial } from "../partials/SidebarPartial";
import { RouteViewport } from "../partials/RouteViewport";
import { Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import { ImportIntro } from "../partials/settings/ImportIntro";
import { BudgetAlerts } from "../partials/settings/BudgetAlerts";

interface SettingsViewProps {}

interface State {
    isSidebarOpen: boolean;
    isLoading: boolean;
}

const COMPONENT_NAME = "SettingsView";
const baseUrl = "/admin/settings";

export class SettingsView extends React.Component<SettingsViewProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: SettingsViewProps, context: any) {
        super(props, context);

        this.state = {
            isLoading: false,
            isSidebarOpen: false
        };
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME} PageView`}>
                <HeaderPartial
                    onToggleSidebar={() => {
                        this.toggleSidebarPanel(true);
                    }}
                />

                <div className={"BodyPartial"}>
                    <RouteViewport
                        isLoading={this.state.isLoading}
                    >

                        <BrowserRouter>
                            <div className={`${COMPONENT_NAME}__viewport`}>
                                <Route
                                    exact={true}
                                    path={baseUrl}
                                    render={() => {
                                        return (
                                            <>
                                                <h1>Settings</h1>

                                                <ul>
                                                    <li><Link to={`${baseUrl}/import`}>Imports</Link></li>
                                                    <li><Link to={`${baseUrl}/alerts`}>Budget alerts</Link></li>
                                                </ul>
                                            </>
                                        );
                                    }}
                                />
                                <Route
                                    path={`${baseUrl}/import`}
                                    component={ImportIntro}
                                />
                                <Route
                                    path={`${baseUrl}/alerts`}
                                    component={BudgetAlerts}
                                />
                            </div>
                        </BrowserRouter>

                    </RouteViewport>

                    <SidebarPartial
                        sidebarClass={this.state.isSidebarOpen}
                        onClose={() => {
                            this.closeSlidePanels();
                        }}
                    />
                </div>
            </div>
        );
    }

    /**
     * Toggles the sidebar panel
     * @param {boolean} isOpen - Indicates whether the panel should be open
     */
    private toggleSidebarPanel(isOpen: boolean): void {
        this.setState({
            isSidebarOpen: isOpen
        });
    }

    /**
     * Closes the slide panels
     */
    private closeSlidePanels(): void {
        this.setState({
            isSidebarOpen: false
        });
    }
}
