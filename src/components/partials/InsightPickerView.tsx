import * as React from "react";
import "./InsightPickerView.scss";

interface InsightPickerViewProps {}

interface State {}

const COMPONENT_NAME = "InsightPickerView";

export class InsightPickerView extends React.Component<
  InsightPickerViewProps,
  State
> {
  constructor(props: InsightPickerViewProps, context) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={COMPONENT_NAME}>
        <FontAwesomeIcon icon={"home"} />
      </div>
    );
  }
}
