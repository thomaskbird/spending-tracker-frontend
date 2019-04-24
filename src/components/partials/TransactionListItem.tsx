import * as React from "react";
import * as moment from "moment";
import "./TransactionListItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transaction, TransactionType } from "../../services/Models";
import Draggable from "react-draggable";
import Gesture from "rc-gesture";

interface TransactionListItemProps {
  transaction: Transaction;
  onAction(actionType: string, transaction: Transaction): void;
}

interface State {
  isDragOpen: boolean;
}

const COMPONENT_NAME = "TransactionListItem";

export class TransactionListItem extends React.Component<
  TransactionListItemProps,
  State
> {
  constructor(props: TransactionListItemProps, context: any) {
    super(props, context);

    this.state = {
      isDragOpen: false
    };
  }

  public render(): JSX.Element {
    return (
      <div className={COMPONENT_NAME}>
        <div className={`${COMPONENT_NAME}__main ${this.state.isDragOpen ? "open" : ""}`}>
          <div className={`${COMPONENT_NAME}__selects`}>
            <input type={"checkbox"} id={"transaction-box"} />
          </div>
          <div className={`${COMPONENT_NAME}__text`}>
            <h5>{this.props.transaction.title}</h5>
            <small>{this.props.transaction.description}</small>
          </div>
          <div className={`${COMPONENT_NAME}__info`}>
            <div className={`${COMPONENT_NAME}__info--date`}>
              {moment(this.props.transaction.occurred_at).format("YYYY-MM-DD")}
            </div>

            <div className={`${COMPONENT_NAME}__info--amount ${COMPONENT_NAME}__info--amount--${this.props.transaction.type === TransactionType.income ? "income" : "expense"}`}>
              {this.props.transaction.type === TransactionType.income ? "+" : "-"} $
              {this.props.transaction.amount}
            </div>
          </div>
          <div className={`${COMPONENT_NAME}__drag-handle`} onClick={() => { this.setState({ isDragOpen: !this.state.isDragOpen }); }}>
            <FontAwesomeIcon icon={"cog"} />
          </div>
        </div>

        <div className={`${COMPONENT_NAME}__hidden-actions`}>
          <button className={"edit"} onClick={() => { this.props.onAction("edit", this.props.transaction); }}>Edit</button>
          <button className={"remove"} onClick={() => { this.props.onAction("remove", this.props.transaction); }}>Remove</button>
        </div>

      </div>
    );
  }
}
