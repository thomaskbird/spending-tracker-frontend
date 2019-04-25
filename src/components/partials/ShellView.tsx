import * as React from "react";
import "./ShellView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DatePicker } from "antd";
import * as moment from "moment";
import axios from "axios";

const { RangePicker } = DatePicker;

import { TransactionListView } from "./TransactionListView";
import { FormTransaction } from "./FormTransaction";
import {DateRange, TransactionWithRecurring} from "../../services/Models";

interface ShellViewProps {}

interface State {
  isSidebarOpen: boolean;
  isAddTransactionOpen: boolean;
  range: DateRange;
  isPickerOpen: boolean;
  transactionToEdit: TransactionWithRecurring | undefined;
}

const COMPONENT_NAME = "ShellView";

export class ShellView extends React.Component<ShellViewProps, State> {
  public static readonly displayName = "Shell View";

  private listApi?: TransactionListView.Api;
  private formTransactionAddApi?: FormTransaction.Api;

  constructor(props: ShellViewProps, context: any) {
    super(props, context);

    this.state = {
      isPickerOpen: false,
      isSidebarOpen: false,
      isAddTransactionOpen: false,
      range: {
        start: moment().subtract(1, "month"),
        end: moment()
      },
      transactionToEdit: undefined
    };
  }

  public render(): JSX.Element {

    const DATE_FORMAT = "YYYY-MM-DD";

    return (
      <div className={COMPONENT_NAME}>
        <div className={"HeaderPartial"}>
          <div className={"HeaderPartial--top"}>
            <span className={"HeaderPartial--top--icons"} onClick={() => { this.toggleSidePanel(true); }}>
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
              onClick={() => { this.toggleTransactionPanel(true); }}
            >
              <FontAwesomeIcon icon={"plus"} />
            </span>
          </div>
          <div className={"HeaderPartial--bottom"}>
            <RangePicker
              defaultValue={[this.state.range.start, this.state.range.end]}
              format={DATE_FORMAT}
              onChange={(dates, dateStrings) => {
                this.setState({
                  range: {
                    start: dates[0],
                    end: dates[1]
                  }
                });
                this.listApi!.refreshData();
              }}
            />
            <div className={"DatePicker--wrap"}>
            </div>
          </div>
        </div>

        <div className={"BodyPartial"}>
          <div className={"route--viewport"}>
            <TransactionListView
              start={this.state.range.start.format(DATE_FORMAT)}
              end={this.state.range.end.format(DATE_FORMAT)}
              onTransactionAction={(action, transaction) => {
                if(action === "edit") {
                  this.setState({
                    transactionToEdit: transaction
                  });
                  this.toggleTransactionPanel(true);
                }
                console.log("ShellView.tsx -> onTransactionAction", action, transaction);
              }}
              onReady={(api) => {
                this.listApi = api;
              }}
            />
          </div>

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

            <FormTransaction
              transaction={this.state.transactionToEdit}
              onReady={(api) => {
                this.formTransactionAddApi = api;
              }}
              onSubmit={(formData) => {
                this.transactionAdd(formData);
              }}
              onCancel={() => { this.toggleTransactionPanel(false); }}
            />
          </div>
        </div>
      </div>
    );
  }

  private transactionAdd(formData: any): void {
    let apiUrl = "/transactions/create";
    let formattedData: any = {
      title: formData.title,
      description: formData.description,
      amount: formData.amount,
      type: formData.type
    };

    if(formData.isRecurring) {
      formattedData = {
        ...formattedData,
        recurring_type: formData.recurring_type,
        start_at: formData.start_at,
        end_at: formData.end_at
      };
    }

    if(this.state.transactionToEdit) {
      apiUrl = `/transactions/edit/${this.state.transactionToEdit.id}`;
      formattedData = {
        ...this.state.transactionToEdit,
        ...formattedData
      }
    }

    axios.post(apiUrl, {
      ...formattedData
    }).then((response) => {
      console.log("success", response);
      if(response.status) {
        this.listApi!.refreshData();
        this.closeSlidePanels();
        this.formTransactionAddApi!.clearData();
      }
    }).catch((error) => {
      console.log("error", error);
    });
  }

  private closeSlidePanels(): void {
    this.setState({
      isSidebarOpen: false,
      isAddTransactionOpen: false
    });
  }

  private toggleSidePanel(isOpen: boolean): void {
    this.setState({
      isSidebarOpen: isOpen,
      isAddTransactionOpen: false
    });
  }

  private toggleTransactionPanel(isOpen: boolean): void {
    if(this.state.isAddTransactionOpen) {
      this.setState({
        transactionToEdit: undefined
      })
    }

    this.setState({
      isSidebarOpen: false,
      isAddTransactionOpen: isOpen
    })
  }
}
