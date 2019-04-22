import * as React from "react";
import "./ShellView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as moment from "moment";

import { AddTransactionView } from "./AddTransactionView";
import { TransactionListView } from "./TransactionListView";
import { InsightPickerView } from "./InsightPickerView";

import DayPicker from "react-day-picker/DayPicker";

interface ShellViewProps {}

interface DateRange {
  start: string;
  end: string;
}

interface State {
  isSidebarOpen: boolean;
  isAddTransactionOpen: boolean;
  range: DateRange;
  isPickerOpen: boolean;
}

const COMPONENT_NAME = "ShellView";

export class ShellView extends React.Component<ShellViewProps, State> {
  public static readonly displayName = "Shell View";

  constructor(props: ShellViewProps, context: any) {
    super(props, context);

    this.state = {
      isPickerOpen: false,
      isSidebarOpen: false,
      isAddTransactionOpen: false,
      range: {
        start: moment().subtract(1, "month").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD")
      }
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
            <div className={"DatePicker--wrap"}>
              <span onClick={() => { this.toggleDatePicker() }}>
                <FontAwesomeIcon icon={"calendar-alt"} />
              </span>
              <div className={this.state.isPickerOpen ? "Datepicker--wrapper open" : "Datepicker--wrapper"}>
                <DayPicker
                  numberOfMonths={2}
                  className={"Selectable"}
                  modifiers={this.state.range}
                  selectedDays={{ start: this.state.range.start, end: this.state.range.end}}
                  onDayClick={(day) => {
                    this.setDate(day);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={"BodyPartial"}>
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
            <h1>Add transaction</h1>

            <form>
              <div className={"FormGroup"}>
                <label htmlFor={"title"}>Title:</label>
                <input type="text" name="title" id={"title"} placeholder={"Enter title..."} />
              </div>

              <div className={"FormGroup"}>
                <label htmlFor={"amount"}>Amount:</label>
                <div className={"FormGroup--input-indicator"}>
                  <span className={"FormGroup--input-indicator-icon"}>
                    <FontAwesomeIcon icon={"dollar-sign"} />
                  </span>
                  <input type="text" name="title" id={"title"} placeholder={"Enter amount..."}/>
                </div>
              </div>

              <div className={"FormGroup"}>
                <label htmlFor={"description"}>Description:</label>
                <textarea name="description" id={"description"} placeholder={"Enter description..."}>
                </textarea>
              </div>

              <div className={"FormGroup"}>
                <label htmlFor={"type"}>Type:</label>
                <select name={"type"} id={"type"}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <button type="submit" className={"btn btn-primary"}>Add</button>

            </form>
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

  private setDate(day: Date): void {
    const formattedDate = this.formatDate(day);
    console.log(day, formattedDate);

    if(this.state.range.end) {
      const newRange = {
        start: day,
        end: undefined
      };
    } else {
      const newRange = {
        start: this.state.range.start,
        end: day
      };
    }

/*
    if(type === "start") {
      this.setState({
        startDate: formattedDate
      });
    } else {
      this.setState({
        endDate: formattedDate
      });
    }
*/
  }

  private toggleDatePicker(): void {
    this.setState({
      isPickerOpen: this.state.isPickerOpen ? false : true
    });
  }

  private formatDate(date: Date): string {
    return moment(date).format("YYYY-MM-DD");
  }
}
