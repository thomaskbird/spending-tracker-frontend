import * as React from "react";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../index";
import { BudgetVisualizationSummary, DateRange } from "../../../services/Models";
import { APP_DATE_FORMAT } from "../../helpers/Utils";

interface BudgetsVisualizationsProps {
    range: DateRange;
}

interface State {
    budgets: BudgetVisualizationSummary[] | undefined;
}

const COMPONENT_NAME = "BudgetsVisualizations";

const CustomTooltip = ({ active, payload }: any) => {
    console.log("tooltip", active, payload);
    if(active && payload != null) {
        return (
            <div className={"custom-tooltip"}>
                <p className={"label"}>
                    <b>{payload[0].payload.name}</b>
                    <br />
                    Current: ${payload[0].payload.current.toFixed(2)}
                    <br />
                    Limit: ${payload[0].payload.limit.toFixed(2)}
                </p>
            </div>
        );
    }

    return null;
};

export class BudgetsVisualizations extends React.Component<BudgetsVisualizationsProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: BudgetsVisualizationsProps, context: any) {
        super(props, context);

        this.state = {
            budgets: undefined
        };
    }

    public componentDidMount(): void {
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
                            margin={{top: 5, right: 0, left: 0, bottom: 5}}
                            onClick={(e) => console.log("e", e)}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip content={<CustomTooltip />} />
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
            .get(`/visualizations/budgets/${this.props.range.start.format(APP_DATE_FORMAT)}/${this.props.range.end.format(APP_DATE_FORMAT)}`)
            .then((budgets) => this.setState({ budgets: budgets.data.data.budgets }));
    }
}
