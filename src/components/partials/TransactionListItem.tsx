import * as React from "react";
import "./TransactionListItem.scss";
import { Transaction, TransactionType } from "../../services/Models";

interface TransactionListItemProps {
  transaction: Transaction;
}

interface State {}

const COMPONENT_NAME = "TransactionListItem";

export class TransactionListItem extends React.Component<
  TransactionListItemProps,
  State
> {
  constructor(props: TransactionListItemProps, context: any) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={COMPONENT_NAME}>
        <div className={`${COMPONENT_NAME}__selects`}>
          <input type={"checkbox"} id={"transaction-box"} />
        </div>
        <div className={`${COMPONENT_NAME}__text`}>
          <h3>{this.props.transaction.name}</h3>
          <small>{this.props.transaction.description}</small>
        </div>
        <div className={`${COMPONENT_NAME}__amount ${COMPONENT_NAME}__amount--${this.props.transaction.type === TransactionType.income ? "income" : "expense"}`}>
          {this.props.transaction.type === TransactionType.income ? "+" : "-"} $
          {this.props.transaction.amount}
        </div>
      </div>
    );
  }
}
