import * as React from "react";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import moment from "moment";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../index";
import { Budget, BudgetVisualizationSummary } from "../../../services/Models";
import { APP_DATE_FORMAT } from "../../helpers/Utils";
import { connect } from "react-redux";
import { TransactionListView } from "../transactions/TransactionListView";

interface BudgetsVisualizationsProps {
    start: any;
    end: any;
}

interface State {
    budgets: BudgetVisualizationSummary[] | undefined;
}

const COMPONENT_NAME = "BudgetsVisualizations";

export class BudgetsVisualizations extends React.Component<BudgetsVisualizationsProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: BudgetsVisualizationsProps, context: any) {
        super(props, context);

        this.state = {
            budgets: undefined,
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
            .get(`/visualizations/budgets/${this.props.start}/${this.props.end}`)
            .then((budgets) => this.setState({ budgets: budgets.data.data.budgets }));
    }
}

const mapStateToProps = (state: any) => ({
    start: state.dateRange.range.start,
    end: state.dateRange.range.end,
});

export const ConnectedBudgetsVisualizations = connect(mapStateToProps)(BudgetsVisualizations);
