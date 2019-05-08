import React from "react";
import { storiesOf } from "@storybook/react";
import { text, number } from "@storybook/addon-knobs";
import {
    ChartWrapper,
    DataNameValuePairs
} from "src/components/partials/ChartWrapper";
import { PieProps } from "recharts";

interface PieChart {
    props: PieProps;
    data: DataNameValuePairs[];
}

const data: PieChart[] = [
    {
        props: {
            dataKey: "value",
            nameKey: "name",
            cx: "50%",
            cy: "50%",
            outerRadius: 50,
            fill: "#8884d8"
        },
        data: [
            {
                name: "Group A",
                value: 400
            },
            {
                name: "Group B",
                value: 300
            },
            {
                name: "Group C",
                value: 300
            },
            {
                name: "Group D",
                value: 200
            },
            {
                name: "Group E",
                value: 278
            },
            {
                name: "Group F",
                value: 189
            }
        ]
    },
    {
        props: {
            dataKey: "value",
            nameKey: "name",
            cx: "50%",
            cy: "50%",
            innerRadius: 60,
            outerRadius: 80,
            fill: "#82ca9d",
            label: true
        },
        data: [
            {
                name: "Group A",
                value: 2400
            },
            {
                name: "Group B",
                value: 4567
            },
            {
                name: "Group C",
                value: 1398
            },
            {
                name: "Group D",
                value: 9800
            },
            {
                name: "Group E",
                value: 3908
            },
            {
                name: "Group F",
                value: 4800
            }
        ]
    }
];

storiesOf("ChartWrapper", module).add("default", () => (
    <ChartWrapper
        dimensions={{
            width: number("Chart width", 300),
            height: number("Chart height", 300)
        }}
        data={data}
    />
));
