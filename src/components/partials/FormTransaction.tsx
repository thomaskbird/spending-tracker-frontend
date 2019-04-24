import * as React from "react";
import "./FormTransaction.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { Switch, DatePicker } from "antd";

interface FormTransactionProps {
  onSubmit(formData: any): void;
  onReady(api: FormTransaction.Api): void;
}

interface State {
  title: string | undefined;
  amount: number | undefined,
  description: string | undefined;
  type: string | undefined;
  isRecurring: boolean;
  recurring_type: string | undefined;
  end_at: string | undefined;
  start_at: string | undefined;
}

const COMPONENT_NAME = "ShellView";

export class FormTransaction extends React.Component<FormTransactionProps, State> {
  public static readonly displayName = "Shell View";

  private formDefaults = {
    title: "",
    amount: 0,
    description: "",
    type: "expense",
    isRecurring: false,
    recurring_type: "",
    end_at: "",
    start_at: ""
  };

  private typeOptions = [
    { value: "expense", label: "Expense" },
    { value: "income", label: "Income" }
  ];

  private recurringTypeOptions = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" }
  ];

  constructor(props: FormTransactionProps, context: any) {
    super(props, context);

    this.state = this.formDefaults;

    const api: FormTransaction.Api = {
      clearData: () => {
        this.setState({
          ...this.formDefaults
        })
      }
    };

    this.props.onReady(api);
  }

  public render(): JSX.Element {
    return (
      <form onSubmit={(event) => { this.handleFormSubmit(event); }}>
        <div className={"FormGroup"}>
          <label htmlFor={"title"}>Title:</label>
          <input type="text" name="title" id={"title"} placeholder={"Enter title..."} value={this.state.title} onChange={(e) => { this.handleChange(e); }} />
        </div>

        <div className={"FormGroup"}>
          <label htmlFor={"amount"}>Amount:</label>
          <div className={"FormGroup--input-indicator"}>
            <span className={"FormGroup--input-indicator-icon"}>
              <FontAwesomeIcon icon={"dollar-sign"} />
            </span>
            <input type="text" name="amount" id={"amount"} placeholder={"Enter amount..."} value={this.state.amount} onChange={(e) => { this.handleChange(e); }} />
          </div>
        </div>

        <div className={"FormGroup"}>
          <label htmlFor={"description"}>Description:</label>
          <textarea
            name="description"
            id={"description"}
            placeholder={"Enter description..."}
            onChange={(e) => { this.handleChange(e); }}
            value={this.state.description}
          />
        </div>

        <div className={"FormGroup"}>
          <label htmlFor={"type"}>Type:</label>
          <Select
            value={this.state.type}
            options={this.typeOptions}
            onChange={(selectedOption: any) => {
              this.setState({
                type: selectedOption.value
              });
            }}
          />
        </div>

        <div className={"FormGroup FormGroup__inline"}>
          <label>Is this recurring?</label>
          <Switch
            defaultChecked={this.state.isRecurring}
            onChange={(checked) => {
              this.setState({
                isRecurring: !this.state.isRecurring
              });
            }}
          />
        </div>

        <div className={this.state.isRecurring ? "recurring-detail-panel open" : "recurring-detail-panel"}>
          <div className={"FormGroup"}>
            <label htmlFor={"recurring_type"}>Recurring type:</label>
            <Select
              value={this.state.recurring_type}
              options={this.recurringTypeOptions}
              onChange={(selectedOption: any) => {
                this.setState({
                  recurring_type: selectedOption.value
                });
              }}
            />
          </div>

          <div className={"FormGroup"}>
            <label htmlFor={"start_at"}>Starts on:</label>
            <DatePicker
              onChange={(date, dateString) => {
                this.setState({
                  start_at: dateString
                });
              }}
            />
          </div>

          <div className={"FormGroup"}>
            <label htmlFor={"end_at"}>Ends on:</label>
            <DatePicker
              onChange={(date, dateString) => {
                this.setState({
                  end_at: dateString
                });
              }}
            />
          </div>
        </div>

        <button type="submit" className={"btn btn-primary"}>Add</button>

      </form>
    );
  }

  private handleFormSubmit(event: any): void {
    this.props.onSubmit(
      this.state
    );

    event.preventDefault();
  }

  private handleChange(e: any): void {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
}

export namespace FormTransaction {
  export interface Api {
    clearData(): void;
  }
}