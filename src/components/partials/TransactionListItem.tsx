import * as React from "react";
import * as moment from "moment";
import "./TransactionListItem.scss";
import { Transaction, TransactionType } from "../../services/Models";
import {Draggable} from "./Draggable";

interface TransactionListItemProps {
  transaction: Transaction;
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
        <Draggable
          dragLimits={{
            x: {
              min: -150,
              max: 0
            }
          }}
          dragY={false}
          onDrag={(translate) => {
            console.log("translate", translate);
          }}
          onDragStart={() => {
            console.log("onDragStart");
          }}
          onDragEnd={() => {
            console.log("onDragEnd");
          }}
        >
          <div className={`${COMPONENT_NAME}__main`}>
            <div className={`${COMPONENT_NAME}__selects`}>
              <input type={"checkbox"} id={"transaction-box"} />
            </div>
            <div className={`${COMPONENT_NAME}__text`}>
              <h5>{this.props.transaction.title}</h5>
              <small>{this.props.transaction.description}</small>
            </div>
            <div className={`${COMPONENT_NAME}__info`}>
              <div className={`${COMPONENT_NAME}__info--date`}>
                {moment(this.props.transaction.created_at).format("YYYY-MM-DD")}
              </div>

              <div className={`${COMPONENT_NAME}__info--amount ${COMPONENT_NAME}__info--amount--${this.props.transaction.type === TransactionType.income ? "income" : "expense"}`}>
                {this.props.transaction.type === TransactionType.income ? "+" : "-"} $
                {this.props.transaction.amount}
              </div>
            </div>
          </div>
        </Draggable>
        <div className={`${COMPONENT_NAME}__hidden-actions`}>
          <button className={"edit"}>Edit</button>
          <button className={"remove"}>Delete</button>
        </div>
      </div>
    );
  }
}
