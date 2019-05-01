import * as React from "react";

import { PieChart, Pie } from "recharts/es6/index.js";
import { ObjectMap } from "src/types";

// <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
// <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />

interface ChartDimensions {
  width: number;
  height: number;
}

interface DataNameValuePairs {
  name: string;
  value: number;
}

interface MainDataStructure {
  props: ObjectMap<any>;
  data: DataNameValuePairs[];
}

interface Props {
  dimensions?: ChartDimensions;
  data: MainDataStructure[];
}

interface State {

}

export class ChartWrapper extends React.Component<Props, State> {
  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <PieChart
        width={this.props.dimensions && this.props.dimensions.width || 730}
        height={this.props.dimensions && this.props.dimensions.height || 250}
      >
        {this.props.data && this.props.data.map((row, i) => {
          console.log(i, row);
          return (
            <Pie key={i} data={row.data} {...row.props} />
          );
        })}
      </PieChart>
    );
  }
}