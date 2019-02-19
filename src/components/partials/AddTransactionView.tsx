import * as React from "react";
import "./AddTransactionView.scss";

interface AddTransactionViewProps {

}

interface State {

}

const COMPONENT_NAME = "AddTransactionView";

export class AddTransactionView extends React.Component<AddTransactionViewProps, State> {
  constructor(props: AddTransactionViewProps, context: any) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={COMPONENT_NAME}>
        <h2>Add transaction</h2>

        <div className={"FormGroup"}>
          <label htmlFor={"amount"}>Amount:</label>
          <input type={"text"} id={"amount"} />
        </div>

        <div className={"FormGroup"}>
          <label htmlFor={"type"}>Type:</label>
          <select id={"type"}>
            <option value={"expense"}>Expense</option>
            <option value={"income"}>Income</option>
          </select>
        </div>

        <div className={"Tagging"}>
          <div className={"FormGroupBundle"}>
            <input type={"text"} id={"amount"} />
            <button type="button">Add</button>
          </div>
        </div>

        <button type="submit">Add</button>
      </div>
    );
  }
}