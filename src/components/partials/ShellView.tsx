import * as React from "react";
import "./ShellView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as moment from "moment";

import { AddTransactionView } from "./AddTransactionView";
import { TransactionListView } from "./TransactionListView";
import { InsightPickerView } from "./InsightPickerView";

import DayPickerInput from "react-day-picker/DayPickerInput";

interface ShellViewProps {}

interface State {
  isSidebarOpen: boolean;
  isAddTransactionOpen: boolean;
  startDate: string;
  endDate: string;
}

const COMPONENT_NAME = "ShellView";

export class ShellView extends React.Component<ShellViewProps, State> {
  public static readonly displayName = "Shell View";

  constructor(props: ShellViewProps, context: any) {
    super(props, context);

    this.state = {
      isSidebarOpen: false,
      isAddTransactionOpen: false,
      startDate: moment().subtract(1, "month").format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD")
    };
  }

  public render(): JSX.Element {

    const DATE_FORMAT = "YYYY-MM-DD";

    return (
      <div className={COMPONENT_NAME}>
        <div className={"HeaderPartial"}>
          <div className={"HeaderPartial--top"}>
            <span className={"HeaderPartial--top--icons"} onClick={() => { this.toggleSidePanel(); }}>
              <FontAwesomeIcon icon={"bars"}/>
            </span>

            <Link to={"/admin"}>
              <div className={"branding"}>
                <div className={"branding--main"}>Spending</div>
                <div className={"branding--secondary"}>Tracker</div>
              </div>
            </Link>

            <span
              className={"HeaderPartial--top--icons"}
              onClick={() => { this.addTransaction(); }}
            >
              <FontAwesomeIcon icon={"plus"} />
            </span>
          </div>
          <div className={"HeaderPartial--bottom"}>
            <DayPickerInput
              value={this.state.startDate}
              format={DATE_FORMAT}
              onDayChange={(day) => { this.setDate("start", day) }}
              formatDate={(date) => {
                return this.formatDate(date);
              }}
            />
            <DayPickerInput
              value={this.state.endDate}
              format={DATE_FORMAT}
              onDayChange={(day) => { this.setDate("end", day) }}
              formatDate={(date) => {
                return this.formatDate(date);
              }}
            />
          </div>
        </div>

        <div className={"BodyPartial"} onClick={() => { this.closeSlidePanels(); }}>
          <div className={this.state.isSidebarOpen ? "SlidePanel open" : "SlidePanel"}>
            <span className={"SlidePanel--close-btn SlidePanel--close-btn__sidebar"} onClick={() => { this.closeSlidePanels(); }}>
              <FontAwesomeIcon icon={"times"} />
            </span>
            <h1>Sidebar</h1>
          </div>

          <div className={this.state.isAddTransactionOpen ? "AddTransactionPanel open" : "AddTransactionPanel"}>
            <span className={"SlidePanel--close-btn SlidePanel--close-btn__add"} onClick={() => { this.closeSlidePanels(); }}>
              <FontAwesomeIcon icon={"times"} />
            </span>
            <h1>Add</h1>
          </div>

          <Router>
            <div className={"route--viewport"}>
              <Route path={"/admin/add"} component={AddTransactionView} />
              <Route path={"/admin/insights"} component={InsightPickerView} />
              <Route component={TransactionListView} />
            </div>
          </Router>
        </div>
      </div>
    );
  }

  private closeSlidePanels(): void {
    this.setState({
      isSidebarOpen: false,
      isAddTransactionOpen: false
    });
  }

  private toggleSidePanel(): void {
    console.log("toggleSidePanel");
    this.setState({
      isSidebarOpen: this.state.isSidebarOpen ? false : true,
      isAddTransactionOpen: false
    });
  }

  private addTransaction(): void {
    console.log("addTransaction");
    this.setState({
      isSidebarOpen: false,
      isAddTransactionOpen: this.state.isAddTransactionOpen ? false : true
    })
  }

  private setDate(type: string, day: Date): void {
    const formattedDate = this.formatDate(day);

    if(type === "start") {
      this.setState({
        startDate: formattedDate
      });
    } else {
      this.setState({
        endDate: formattedDate
      });
    }
  }

  private formatDate(date: Date): string {
    return moment(date).format("YYYY-MM-DD");
  }
}
