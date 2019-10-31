import * as React from "react";
import "./VisualizationsView.scss";
import { HeaderPartial } from "../partials/HeaderPartial";
import { SidebarPartial } from "../partials/SidebarPartial";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { LineChartWrapper } from "../charts/LineChartWrapper";

interface Props {

}

interface State {
    isSidebarOpen: boolean;
}

const COMPONENT_NAME = "VisualizationsView";
const baseUrl = "/admin/visualizations";

export class VisualizationsView extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
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
                    <div className={"route--viewport"}>

                        <BrowserRouter>
                            <div className={`${COMPONENT_NAME}__viewport`}>
                                <Route
                                    exact={true}
                                    path={baseUrl}
                                    render={() => {
                                        return (
                                            <>
                                                <h1>Visualizations</h1>

                                                <ul>
                                                    <li><Link to={`${baseUrl}/month`}>My Month</Link></li>
                                                    <li><Link to={`${baseUrl}/budgets`}>Budgets</Link></li>
                                                    <li>under budget</li>
                                                    <li>Alerts for budgets</li>
                                                    <li>Current balancegit </li>

                                                </ul>
                                            </>
                                        );
                                    }}
                                />
                                <Route
                                    path={`${baseUrl}/month`}
                                    render={() => {
                                        return (
                                            <>
                                                <h1>My Month</h1>
                                                <Link to={baseUrl}>Back</Link>

                                                <p>This will be for information in regards to the current month, income vs expenses, indicators for budgets and percentage used</p>

                                                <LineChartWrapper />
                                            </>
                                        );
                                    }}
                                />
                                <Route
                                    path={`${baseUrl}/budgets`}
                                    render={() => {
                                        return (
                                            <>
                                                <h1>Budgets</h1>
                                                <Link to={baseUrl}>Back</Link>

                                                <p>This will be a pie graph that will each budget item with costs associated in the chart and information regarding the current state of that budget</p>
                                            </>
                                        );
                                    }}
                                />
                            </div>
                        </BrowserRouter>

                    </div>

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
