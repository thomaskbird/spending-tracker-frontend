import * as React from "react";
import "./FormTransaction.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { Switch, DatePicker } from "antd";
import { TransactionWithRecurring } from "../../services/Models";
import * as moment from "moment";

interface FormTransactionProps {
  transaction?: TransactionWithRecurring;
  onSubmit(formData: any): void;
  onReady(api: FormTransaction.Api): void;
  onCancel(): void;
}

interface State {
  title: string | undefined;
  amount: number | undefined;
  description: string | undefined;
  type: string | undefined;
  isRecurring: boolean;
  recurring_type: string | undefined;
  end_at: string | undefined;
  start_at: string | undefined;
}

const COMPONENT_NAME = "ShellView";

export class FormTransaction extends React.Component<
  FormTransactionProps,
  State
> {
  public static readonly displayName = "Shell View";

  private dateFormat = "YYYY-MM-DD";

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

    let isRecurring = false;
    if (this.props.transaction && this.props.transaction.recurring) {
      isRecurring = true;
    }

    this.state = {
      title: (this.props.transaction && this.props.transaction.title) || "",
      amount: (this.props.transaction && this.props.transaction.amount) || 0,
      description:
        (this.props.transaction && this.props.transaction.description) || "",
      type:
        (this.props.transaction && this.props.transaction.type) || "expense",
      isRecurring: isRecurring,
      recurring_type: "",
      start_at: "",
      end_at: ""
    };

    const api: FormTransaction.Api = {
      clearData: () => {
        this.setState({
          title: (this.props.transaction && this.props.transaction.title) || "",
          amount:
            (this.props.transaction && this.props.transaction.amount) || 0,
          description:
            (this.props.transaction && this.props.transaction.description) ||
            "",
          type:
            (this.props.transaction && this.props.transaction.type) ||
            "expense",
          isRecurring: isRecurring,
          recurring_type: "",
          start_at: "",
          end_at: ""
        });
      }
    };

    this.props.onReady(api);
  }

  public componentDidUpdate(prevProps: FormTransactionProps): void {
    if (prevProps.transaction !== this.props.transaction) {
      let isRecurring = false;
      if (this.props.transaction && this.props.transaction.recurring) {
        isRecurring = true;
      }

      this.setState({
        title: (this.props.transaction && this.props.transaction.title) || "",
        amount: (this.props.transaction && this.props.transaction.amount) || 0,
        description:
          (this.props.transaction && this.props.transaction.description) || "",
        type:
          (this.props.transaction && this.props.transaction.type) || "expense",
        isRecurring: isRecurring,
        recurring_type:
          (this.props.transaction &&
            this.props.transaction.recurring &&
            this.props.transaction.recurring.recurring_type) ||
          "",
        start_at:
          (this.props.transaction &&
            this.props.transaction.recurring &&
            this.props.transaction.recurring.start_at) ||
          "",
        end_at:
          (this.props.transaction &&
            this.props.transaction.recurring &&
            this.props.transaction.recurring.end_at) ||
          ""
      });
    }
  }

  public render(): JSX.Element {
    const startAt =
      this.state.start_at &&
      (moment(this.state.start_at, this.dateFormat)) ||
      this.props.transaction &&
      this.props.transaction.recurring &&
      (moment(this.props.transaction.recurring.start_at) as any);
    const endAt =
      this.state.end_at &&
      (moment(this.state.end_at, this.dateFormat)) ||
      this.props.transaction &&
      this.props.transaction.recurring &&
      (moment(this.props.transaction.recurring.end_at, "YYYY-MM-DD") as any);

    return (
      <form
        onSubmit={event => {
          this.handleFormSubmit(event);
        }}
      >
        <h2>Add transaction</h2>

        <div className={"FormGroup"}>
          <label htmlFor={"title"}>Title:</label>
          <input
            type="text"
            name="title"
            id={"title"}
            placeholder={"Enter title..."}
            value={this.state.title}
            onChange={e => {
              this.setState({ title: e.target.value });
            }}
          />
        </div>

        <div className={"FormGroup"}>
          <label htmlFor={"amount"}>Amount:</label>
          <div className={"FormGroup--input-indicator"}>
            <span className={"FormGroup--input-indicator-icon"}>
              <FontAwesomeIcon icon={"dollar-sign"} />
            </span>
            <input
              type="text"
              name="amount"
              id={"amount"}
              placeholder={"Enter amount..."}
              value={this.state.amount}
              onChange={e => {
                const newVal = (e.target.value as any) as number;
                this.setState({ amount: newVal });
              }}
            />
          </div>
        </div>

        <div className={"FormGroup"}>
          <label htmlFor={"description"}>Description:</label>
          <textarea
            name="description"
            id={"description"}
            placeholder={"Enter description..."}
            onChange={e => {
              this.setState({ description: e.target.value });
            }}
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
            onChange={checked => {
              this.setState({
                isRecurring: !this.state.isRecurring
              });
            }}
          />
        </div>

        <div
          className={
            this.state.isRecurring
              ? "recurring-detail-panel open"
              : "recurring-detail-panel"
          }
        >
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
              value={startAt}
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
              value={endAt}
              onChange={(date, dateString) => {
                this.setState({
                  end_at: dateString
                });
              }}
            />
          </div>
        </div>

        <div className={"FormGroup FormGroup__inline"}>
          <button type="submit" className={"btn btn-primary"}>
            Submit
          </button>
          <button
            type="button"
            className={"btn btn-default"}
            onClick={() => {
              this.props.onCancel();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  private handleFormSubmit(event: any): void {
    this.props.onSubmit(this.state);

    event.preventDefault();
  }
}

export namespace FormTransaction {
  export interface Api {
    clearData(): void;
  }
}
