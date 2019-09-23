import * as React from "react";
import "./charts.scss";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const data = [
    {month: "April", income: 1710, expense: 904},
    {month: "May", income: 2210, expense: 2341},
    {month: "June", income: 1710, expense: 1941},
    {month: "July", income: 789, expense: 1000},
    {month: "August", income: 2210, expense: 1000},
    {month: "September", income: 2400, expense: 1347},
];

interface Props {

}

interface State {

}

export class LineChartWrapper extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);
        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <ResponsiveContainer>
                <LineChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
