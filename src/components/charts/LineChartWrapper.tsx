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
    {month: "September", inc: 2400, exp: 1347},
    {month: "August", inc: 2210, exp: 1000},
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
                    <Line type="monotone" dataKey="inc" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="exp" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
