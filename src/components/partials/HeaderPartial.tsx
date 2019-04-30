import * as React from "react";
import "./HeaderPartial.scss";
import { Link } from "react-router-dom";
import { DatePicker } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const { RangePicker } = DatePicker;

import {
  DateRange,
  PanelActionTypes,
} from "../../services/Models";

interface HeaderPartialProps {
  /**
   * Toggles the sidebar
   *
   * @param {boolean} isOpen - Indicates whether the panel should be open/closed
   */
  onToggleSidebar?(isOpen: boolean): void;
  /**
   * Toggles the transaction panel
   *
   * @param {boolean} isOpen - Indicates whether the panel should be open
   * @param {TransactionPanelActionTypes} actionType - Indicates what action the panel should render
   * @param {undefined} transaction - The transaction data
   */
  onToggleContextPanel?(isOpen: boolean, actionType: PanelActionTypes): void;
  /**
   * Triggers when the data range has been changed
   *
   * @param {DateRange} range - An object containing the start/end values
   */
  onDateRangeChange?(range: DateRange): void;
}

interface State {
  /**
   * The range to initially set the rangpicker to
   */
  range: DateRange;
}

const COMPONENT_NAME = "HeaderPartial";

export class HeaderPartial extends React.Component<HeaderPartialProps, State> {
  public static readonly displayName = "Header Partial";

  constructor(props: HeaderPartialProps, context: any) {
    super(props, context);

    this.state = {
      range: {
        start: moment().subtract(1, "month"),
        end: moment()
      }
    };
  }

  private DATE_FORMAT = "YYYY-MM-DD";

  public render(): JSX.Element {
    return (
      <div className={"HeaderPartial"}>
        <div className={"HeaderPartial--top"}>
          {this.props.onToggleSidebar ? (
            <span
              className={"HeaderPartial--top--icons"}
              onClick={() => {
                this.props.onToggleSidebar!(true);
              }}
            >
              <FontAwesomeIcon icon={"bars"} />
            </span>
          ): (undefined)}

          <Link to={"/admin"}>
            <div className={"branding"}>
              <div className={"branding--main"}>Spending</div>
              <div className={"branding--secondary"}>Tracker</div>
            </div>
          </Link>

          {this.props.onToggleContextPanel ? (
            <span
              className={"HeaderPartial--top--icons"}
              onClick={() => {
                this.props.onToggleContextPanel!(true, PanelActionTypes.add);
              }}
            >
              <FontAwesomeIcon icon={"plus"} />
            </span>
          ): (undefined)}
        </div>
        {this.props.onDateRangeChange ? (
          <div className={"HeaderPartial--bottom"}>
            <RangePicker
              defaultValue={[this.state.range.start, this.state.range.end]}
              format={this.DATE_FORMAT}
              onChange={(dates, dateStrings) => {
                this.props.onDateRangeChange!({
                  start: dates[0],
                  end: dates[1]
                });
              }}
            />
          </div>
        ): (undefined)}
      </div>
    );
  }
}
