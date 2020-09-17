import * as React from "react";
import "./VisualizationsView.scss";
import { ConnectedHeaderPartial } from "../partials/HeaderPartial";
import { ConnectedSidebarPartial } from "../partials/SidebarPartial";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { LineChartWrapper } from "../charts/LineChartWrapper";
import { RouteViewport } from "../partials/RouteViewport";
import { BudgetsVisualizations } from "../partials/visualizations/BudgetsVisualizations";
import { BudgetVisualization } from "../partials/visualizations/BudgetVisualization";
import moment from "moment";
import { DateRange } from "../../services/Models";
import { handleDateRangeChange } from "../helpers/Utils";

interface Props {

}

interface State {
    isSidebarOpen: boolean;
    isLoading: boolean;
    range: DateRange;
}

const COMPONENT_NAME = "VisualizationsView";
const baseUrl = "/admin/visualizations";

export class VisualizationsView extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
            isSidebarOpen: false,
            isLoading: false,
            range: {
                start: moment().startOf("month"),
                end: moment().endOf("month")
            }
        };
    }
    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME} PageView`}>
                <ConnectedHeaderPartial />

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
                                                <h1>Visualizations</h1>

                                                <ul>
                                                    <li><Link to={`${baseUrl}/month`}>My Month</Link></li>
                                                    <li><Link to={`${baseUrl}/budgets`}>Budgets</Link></li>
                                                    <li><Link to={`${baseUrl}/budget`}>Budget Deep Dive</Link></li>
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
                                    component={BudgetsVisualizations}
                                />
                                <Route
                                    path={`${baseUrl}/budget`}
                                    component={BudgetVisualization}
                                />
                            </div>
                        </BrowserRouter>

                    </RouteViewport>

                    <ConnectedSidebarPartial />
                </div>
            </div>
        );
    }
}
