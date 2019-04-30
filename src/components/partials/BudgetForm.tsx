import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Budget } from "../../services/Models";

interface BudgetFormProps {
    budget?: Budget;
    onSubmit(formData: any): void;
    onReady(api: BudgetForm.Api): void;
    onCancel(): void;
}

interface State {
    title: string | undefined;
    description: string | undefined;
    amount: number | undefined;
}

const COMPONENT_NAME = "TransactionForm";

export class BudgetForm extends React.Component<
    BudgetFormProps,
    State
> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: BudgetFormProps, context: any) {
        super(props, context);

        this.state = {
            title: (this.props.budget && this.props.budget.title) || "",
            amount: (this.props.budget && this.props.budget.amount) || 0,
            description: (this.props.budget && this.props.budget.description) || ""
        };

        const api: BudgetForm.Api = {
            clearData: () => {
                this.setState({
                    title: (this.props.budget && this.props.budget.title) || "",
                    amount: (this.props.budget && this.props.budget.amount) || 0,
                    description: (this.props.budget && this.props.budget.description) || ""
                });
            }
        };

        this.props.onReady(api);
    }

    public componentDidUpdate(prevProps: BudgetFormProps): void {
        if (prevProps.budget !== this.props.budget) {

            this.setState({
                title: (this.props.budget && this.props.budget.title) || "",
                amount: (this.props.budget && this.props.budget.amount) || 0,
                description: (this.props.budget && this.props.budget.description) || ""
            });
        }
    }

    public render(): JSX.Element {
        const panelTitle = this.props.budget ? `Edit ${this.props.budget.title} Budget` : "Add Budget";
        return (
            <form
                onSubmit={event => {
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

export namespace BudgetForm {
    export interface Api {
        clearData(): void;
    }
}
