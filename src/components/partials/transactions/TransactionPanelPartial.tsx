import * as React from "react";
import "./TransactionPanelPartial.scss";
import { HeaderPartial } from "../../partials/HeaderPartial";
import { Redirect, RouteComponentProps } from "react-router";
import {axiosInstance} from "../../../index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TransactionForm} from "./TransactionForm";
import {TransactionDetailView} from "./TransactionDetailView";
import {PanelActionTypes, TransactionWithRecurring} from "../../../services/Models";

interface TransactionPanelPartialProps {
  isAddTransactionOpen: boolean;
  onClose(): void;
  transactionActionType: PanelActionTypes | undefined;
  transactionToEdit: TransactionWithRecurring | undefined;
  onReady(api: TransactionForm.Api): void;
  onTransactionAdd(formData: any): void;
  onToggleTransactionPanel(): void;
}

interface State {}

const COMPONENT_NAME = "TransactionPanelPartial";

export class TransactionPanelPartial extends React.Component<TransactionPanelPartialProps, State> {
  public static readonly displayName = "Transaction Panel Partial";

  constructor(props: TransactionPanelPartialProps, context: any) {
    super(props, context);

    this.state = {};
  }

  public componentDidUpdate(prevProps: TransactionPanelPartialProps): void {
    // test
  }

  public render(): JSX.Element {
    return (
      <div
        className={
          this.props.isAddTransactionOpen
            ? `${COMPONENT_NAME} open`
            : COMPONENT_NAME
        }
      >
          <span
            className={`${COMPONENT_NAME}--close-btn ${COMPONENT_NAME}--close-btn__add`}
            onClick={() => {
              this.props.onClose();
            }}
          >
            <FontAwesomeIcon icon={"times"} />
          </span>

        {this.props.transactionActionType !== "view" ? (
          <TransactionForm
            transaction={this.props.transactionToEdit}
            onReady={api => {
              this.props.onReady(api);
            }}
            onSubmit={formData => {
              this.props.onTransactionAdd(formData);
            }}
            onCancel={() => {
              this.props.onToggleTransactionPanel();
            }}
          />
        ) : (
          <TransactionDetailView
            transaction={this.props.transactionToEdit!}
          />
        )}
      </div>
    );
  }
}
