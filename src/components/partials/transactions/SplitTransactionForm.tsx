import * as React from "react";
import "./SplitTransactionForm.scss";
import {
    TransactionWithRecurring
} from "../../../services/Models";
import { ButtonGroup } from "../library/ButtonGroup";
import { TransactionForm } from "./TransactionForm";
import { Button } from "antd";
import { axiosInstance } from "../../../index";

interface SplitTransactionFormProps {
    // Transaction form props
    transaction?: TransactionWithRecurring;
    onSplit(): void;
    onReady(api: TransactionForm.Api): void;
    onCancel(): void;
}

interface State {
    isNewOpen: boolean;
    splitOpenItem: string;
}

const COMPONENT_NAME = "SplitTransactionForm";

export class SplitTransactionForm extends React.Component<
    SplitTransactionFormProps,
    State
    > {
    constructor(props: SplitTransactionFormProps, context: any) {
        super(props, context);

        this.state = {
            isNewOpen: false,
            splitOpenItem: "existing"
        };
    }

    public componentDidMount(): void {
        console.log("transaction", this.props.transaction);
    }

    private apiExisting?: TransactionForm.Api;
    private apiNew?: TransactionForm.Api;

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME}`}>
                <ButtonGroup
                    selected={this.state.splitOpenItem}
                    items={[
                        {
                            text: "Existing",
                            type: "existing"
                        },
                        {
                            text: "New",
                            type: "new"
                        }
                    ]}
                    onSelection={(item) => this.setState({ splitOpenItem: item.type === "new" ? "new" : "existing"})}
                />

                <div className={`${this.state.splitOpenItem !== "existing" ? `${COMPONENT_NAME}__hidden` : ""}`}>
                    <TransactionForm
                        isSplit={true}
                        transaction={this.props.transaction}
                        onReady={(api) => {
                            this.apiExisting = api;
                        }}
                        onCancel={() => this.props.onCancel()}
                    />
                </div>

                <div className={`${this.state.splitOpenItem !== "new" ? `${COMPONENT_NAME}__hidden` : ""}`}>
                    <TransactionForm
                        isSplit={true}
                        transaction={{
                            title: this.props.transaction && this.props.transaction.title,
                            description: this.props.transaction && this.props.transaction.description,
                            occurred_at: this.props.transaction && this.props.transaction.occurred_at,
                            type: this.props.transaction && this.props.transaction.type,
                        }}
                        onReady={(api) => {
                            this.apiNew = api;
                        }}
                        onCancel={() => this.props.onCancel()}
                    />
                </div>

                <div className={`${COMPONENT_NAME}__cta`}>
                    <Button
                        type="primary"
                        htmlType={"submit"}
                        className={"btn btn-primary"}
                        onClick={() => {
                            const existingTransaction: any = {
                                ...this.apiExisting!.getVals() as any,
                                id: this.props.transaction && this.props.transaction.id,
                                occurred_at: this.props.transaction && this.props.transaction.occurred_at
                            };

                            const newTransaction = {
                                ...this.apiExisting!.getVals() as any,
                                ...this.apiNew!.getVals() as any,
                                status: "queued",
                                occurred_at: this.props.transaction && this.props.transaction.occurred_at
                            };

                            this.splitTransaction(existingTransaction, newTransaction);
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        );
    }

    private splitTransaction(transactionExisting: TransactionWithRecurring, transactionNew: TransactionWithRecurring): void {
        const transactionExistingUpdate = axiosInstance.post(`/transactions/edit/${transactionExisting.id}`, transactionExisting);
        const transactionNewUpdate =  axiosInstance.post("/transactions/create", transactionNew);

        Promise.all([transactionExistingUpdate, transactionNewUpdate])
            .then((response: any) => {
                let success = true;

                response.forEach((item: any) => {
                    if(!item.data.status) {
                        success = false;
                    }
                });

                if (success) {
                    console.log("Success", response);
                    this.props.onSplit();
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    }
}
