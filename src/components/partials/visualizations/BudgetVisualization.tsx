import * as React from "react";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import moment from "moment";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../index";
import { Budget, BudgetVisualizationSummary, IndividualBudgetSummaryData } from "../../../services/Models";
import { APP_DATE_FORMAT } from "../../helpers/Utils";
import { LineChartWrapper } from "../../charts/LineChartWrapper";
import Select from "react-select";

interface BudgetVisualizationProps {

}

interface State {
    selectedBudgetId: number | string;
    budget: IndividualBudgetSummaryData[] | undefined;
    budgetList: Budget[] | undefined;
}

const COMPONENT_NAME = "BudgetVisualization";

const mock = [
    {month: "Apr", income: 1710, expense: 904},
    {month: "May", income: 2210, expense: 2341},
    {month: "Jun", income: 1710, expense: 1941},
    {month: "Jul", income: 789, expense: 1000},
    {month: "Aug", income: 2210, expense: 1000},
    {month: "Sep", income: 2400, expense: 1347},
];

export class BudgetVisualization extends React.Component<BudgetVisualizationProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: BudgetVisualizationProps, context: any) {
        super(props, context);

        this.state = {
            selectedBudgetId: "",
            budget: undefined,
            budgetList: undefined
        };
    }

    public componentDidMount(): void {
        this.refreshData();
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME}`}>
                <Link to={"/admin/visualizations"}>Back</Link>

                <div className={"FormGroup"}>
                    <label htmlFor={"type"}>Select budget:</label>
                    <Select
                        value={this.state.selectedBudgetId}
                        options={this.state.budgetList}
                        onChange={(selectedOption: any) => this.handleSelectChange(selectedOption.value)}
                    />
                </div>

                {this.state.budget ? (
                    <ResponsiveContainer>
                        <LineChartWrapper />
                    </ResponsiveContainer>
                ): (undefined)}
            </div>
        );
    }

    private refreshData(): void {
        axiosInstance
            .get(`/budgets`)
            .then((data) => {console.log("data", data.data.data.budgets);
                this.setState({
                    budgetList: data.data.data.budgets.map((item: any) => {
                        return {
                            value: item.id,
                            label: item.title
                        }
                    })
                });
            });
    }

    private handleSelectChange(id: number): void {
        axiosInstance
            .get(`/visualizations/budget/${id}/6`)
            .then((budgets) => this.setState({
                budget: budgets.data.data.budgets
            }));

        this.setState({
            selectedBudgetId: id,
        });
    }
}
