import * as React from "react";
import "./TransactionForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { Switch, DatePicker, Button } from "antd";
import { TransactionWithRecurring } from "../../../services/Models";
import moment from "moment";

interface TransactionFormProps {
    transaction?: TransactionWithRecurring;
    onSubmit(formData: any): void;
    onReady(api: TransactionForm.Api): void;
    onCancel(): void;
}

interface State {
    title: string | undefined;
    amount: number | undefined;
    description: string | undefined;
    occurred_at: string | undefined;
    type: string | undefined;
    isRecurring: boolean;
    recurring_type: string | undefined;
    end_at: string | undefined;
    start_at: string | undefined;
}

const COMPONENT_NAME = "TransactionForm";

export class TransactionForm extends React.Component<
    TransactionFormProps,
    State
> {
    public static readonly displayName = COMPONENT_NAME;

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

    constructor(props: TransactionFormProps, context: any) {
        super(props, context);

        let isRecurring = false;
        if (this.props.transaction && this.props.transaction.recurring) {
            isRecurring = true;
        }

        this.state = this.handleResetData();

        const api: TransactionForm.Api = {
            clearData: () => {
                this.setState(this.handleResetData());
            }
        };

        this.props.onReady(api);
    }

    public componentDidUpdate(prevProps: TransactionFormProps): void {
        if (prevProps.transaction !== this.props.transaction) {
            this.setState(this.handleResetData());
        }
    }

    public render(): JSX.Element {
        const startAt =
            (this.state.start_at &&
                moment(this.state.start_at, this.dateFormat)) ||
            (this.props.transaction &&
                this.props.transaction.recurring &&
                (moment(this.props.transaction.recurring.start_at) as any));
        const endAt =
            (this.state.end_at && moment(this.state.end_at, this.dateFormat)) ||
            (this.props.transaction &&
                this.props.transaction.recurring &&
                (moment(
                    this.props.transaction.recurring.end_at,
                    "YYYY-MM-DD"
                ) as any));
        const occurredAt =
            (this.state.occurred_at && moment(this.state.occurred_at, this.dateFormat)) ||
            (this.props.transaction &&
                this.props.transaction.occurred_at &&
                (moment(
                    this.props.transaction.occurred_at,
                    "YYYY-MM-DD"
                ) as any));
        const panelTitle = this.props.transaction
            ? `Edit ${this.props.transaction.title} Transaction`
            : "Add Transaction";

        return (
            <form
                onSubmit={(event) => {
                    this.handleFormSubmit(event);
                }}
            >
                <h2>{panelTitle}</h2>

                <div className={"FormGroup"}>
                    <label htmlFor={"title"}>Title:</label>
                    <input
                        type="text"
                        name="title"
                        id={"title"}
                        placeholder={"Enter title..."}
                        value={this.state.title}
                        onChange={(e) => {
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
                            onChange={(e) => {
                                const newVal = (e.target
                                    .value as any) as number;
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
                        onChange={(e) => {
                            this.setState({ description: e.target.value });
                        }}
                        value={this.state.description}
                    />
                </div>

                <div className={"FormGroup"}>
                    <label htmlFor={"occurred_at"}>Occured on:</label>
                    <DatePicker
                        value={occurredAt}
                        onChange={(date, dateString) => {
                            this.setState({
                                occurred_at: dateString
                            });
                        }}
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
                        checked={this.state.isRecurring}
                        onChange={(checked) => {
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
                        <label htmlFor={"recurring_type"}>
                            Recurring type:
                        </label>
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
                    <Button
                        type="primary"
                        htmlType={"submit"}
                        className={"btn btn-primary"}>
                        Submit
                    </Button>
                    <Button
                        type="default"
                        className={"btn btn-default"}
                        onClick={() => {
                            this.props.onCancel();
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        );
    }

    private handleFormSubmit(event: any): void {
        this.props.onSubmit(this.state);

        event.preventDefault();
    }

    private handleResetData(): State {
        let isRecurring = false;
        if (this.props.transaction && this.props.transaction.recurring && this.props.transaction !== undefined) {
            isRecurring = true;
        }

        return {
            title:
                (this.props.transaction &&
                    this.props.transaction.title) ||
                "",
            amount:
                (this.props.transaction &&
                    this.props.transaction.amount) ||
                0,
            description:
                (this.props.transaction &&
                    this.props.transaction.description) ||
                "",
            occurred_at: "",
            type:
                (this.props.transaction &&
                    this.props.transaction.type) ||
                "expense",
            isRecurring: isRecurring,
            recurring_type: "",
            start_at: "",
            end_at: ""
        };
    }
}

export namespace TransactionForm {
    export interface Api {
        clearData(): void;
    }
}
