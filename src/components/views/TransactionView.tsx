import * as React from "react";
import "./TransactionView.scss";
import { DatePicker } from "antd";
import * as moment from "moment";

const { RangePicker } = DatePicker;

import { TransactionListView } from "../partials/TransactionListView";
import { FormTransaction } from "../partials/FormTransaction";

import {
  DateRange,
  TransactionPanelActionTypes,
  TransactionWithRecurring
} from "../../services/Models";
import {HeaderPartial} from "../partials/HeaderPartial";
import {axiosInstance} from "../../index";
import {SidebarPartial} from "../partials/SidebarPartial";
import {TransactionPanelPartial} from "../partials/TransactionPanelPartial";

interface TransactionViewProps {}

interface State {
  isSidebarOpen: boolean;
  isAddTransactionOpen: boolean;
  range: DateRange;
  isPickerOpen: boolean;
  transactionToEdit: TransactionWithRecurring | undefined;
  transactionActionType: TransactionPanelActionTypes | undefined;
}

const COMPONENT_NAME = "TransactionView";

export class TransactionView extends React.Component<TransactionViewProps, State> {
  public static readonly displayName = "Transaction View";

  private listApi?: TransactionListView.Api;
  private formTransactionAddApi?: FormTransaction.Api;

  constructor(props: TransactionViewProps, context: any) {
    super(props, context);

    this.state = {
      isPickerOpen: false,
      isSidebarOpen: false,
      isAddTransactionOpen: false,
      range: {
        start: moment().subtract(1, "month"),
        end: moment()
      },
      transactionToEdit: undefined,
      transactionActionType: undefined
    };
  }

  public render(): JSX.Element {
    const DATE_FORMAT = "YYYY-MM-DD";

    return (
      <div className={COMPONENT_NAME}>
        <HeaderPartial
          onToggleSidebar={() => {
            this.toggleSidebarPanel(true);
          }}
          onToggleTransactionPanel={(isOpen, actionType, transaction) => {
            this.toggleTransactionPanel(isOpen, actionType, transaction);
          }}
          onDateRangeChange={(range) => {
            this.setState({
              range: range
            });
            this.listApi!.refreshData();
          }}
        />

        <div className={"BodyPartial"}>
          <div className={"route--viewport"}>
            <TransactionListView
              start={this.state.range.start.format(DATE_FORMAT)}
              end={this.state.range.end.format(DATE_FORMAT)}
              onTransactionAction={(action: TransactionPanelActionTypes, transaction) => {
                this.toggleTransactionPanel(true, action, transaction);
              }}
              onReady={api => {
                this.listApi = api;
              }}
            />
          </div>

          <SidebarPartial
            sidebarClass={this.state.isSidebarOpen}
            onClose={() => {
              this.closeSlidePanels();
            }}
          />

          <TransactionPanelPartial
            isAddTransactionOpen={this.state.isAddTransactionOpen}
            onClose={() => { this.closeSlidePanels(); }}
            transactionActionType={this.state.transactionActionType}
            transactionToEdit={this.state.transactionToEdit}
            onReady={(api) => {
              this.formTransactionAddApi = api;
            }}
            onTransactionAdd={(formData) => {
              this.transactionAdd(formData);
            }}
            onToggleTransactionPanel={() => {
              this.toggleTransactionPanel(false, undefined, undefined);
            }}
          />
        </div>
      </div>
    );
  }

  /**
   * Formats data and sends a request to the api
   * @param formData - The form transaction data
   */
  private transactionAdd(formData: any): void {
    let apiUrl = "/transactions/create";
    let formattedData: any = {
      title: formData.title,
      description: formData.description,
      amount: formData.amount,
      type: formData.type
    };

    if (formData.isRecurring) {
      formattedData = {
        ...formattedData,
        recurring_type: formData.recurring_type,
        start_at: formData.start_at,
        end_at: formData.end_at
      };
    }

    if (this.state.transactionToEdit) {
      apiUrl = `/transactions/edit/${this.state.transactionToEdit.id}`;
      formattedData = {
        ...this.state.transactionToEdit,
        ...formattedData
      };
    }

    axiosInstance
    .post(apiUrl, {
      ...formattedData
    })
    .then(response => {
      console.log("success", response);
      if (response.status) {
        this.listApi!.refreshData();
        this.closeSlidePanels();
        this.formTransactionAddApi!.clearData();
      }
    })
    .catch(error => {
      console.log("error", error);
    });
  }

  /**
   * Closes the slide panels
   */
  private closeSlidePanels(): void {
    this.setState({
      isSidebarOpen: false,
      isAddTransactionOpen: false
    });
  }

  /**
   * Toggles the sidebar panel
   * @param {boolean} isOpen - Indicates whether the panel should be open
   */
  private toggleSidebarPanel(isOpen: boolean): void {
    this.setState({
      isSidebarOpen: isOpen,
      isAddTransactionOpen: false
    });
  }

  /**
   * Toggles the transaction panels and sets the appropriate details
   *
   * @param {boolean} isOpen - Indicates whether the panel should be open
   * @param {string | undefined} actionType - What actions is taking place
   * @param {TransactionWithRecurring | undefined} transaction - The transaction the action is happening to
   */
  private toggleTransactionPanel(
    isOpen: boolean,
    actionType: TransactionPanelActionTypes | undefined,
    transaction: TransactionWithRecurring | undefined
  ): void {
    this.setState({
      isSidebarOpen: false,
      isAddTransactionOpen: isOpen,
      transactionActionType: actionType,
      transactionToEdit: transaction
    });
  }
}
