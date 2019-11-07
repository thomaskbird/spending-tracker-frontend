import * as React from "react";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../index";
import { BudgetVisualizationSummary } from "../../../services/Models";

interface BudgetsVisualizationsProps {

}

interface State {
    budgets: BudgetVisualizationSummary | undefined;
}

const COMPONENT_NAME = "BudgetsVisualizations";

const data = [
    {name: "Auto", limit: 4000, current: 2400},
    {name: "Grocery", limit: 3000, current: 1398},
    {name: "Housing", limit: 2000, current: 9800},
    {name: "Eating out", limit: 2780, current: 3908},
    {name: "Subscriptions", limit: 1890, current: 4800},
    {name: "Phones", limit: 2390, current: 3800},
    {name: "Savings", limit: 3490, current: 4300},
];

export class BudgetsVisualizations extends React.Component<BudgetsVisualizationsProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: BudgetsVisualizationsProps, context: any) {
        super(props, context);

        this.state = {
            budgets: undefined
        };

        this.refreshData();
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME}`}>
                <Link to={"/admin/visualizations"}>Back</Link>
                {this.state.budgets ? (
                    <ResponsiveContainer>
                        <BarChart
                            width={600}
                            height={300}
                            data={this.state.budgets}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="limit" fill="#3c9e3c" />
                            <Bar dataKey="current" fill="#ba5c5d" />
                        </BarChart>
                    </ResponsiveContainer>
                ): (undefined)}
            </div>
        );
    }

    private refreshData(): void {
        axiosInstance
            .get(`/visualizations/budgets/2019-10-01/2019-11-30`)
            .then((budgets) => this.setState({ budgets: budgets.data.data.budgets }));
    }
}
