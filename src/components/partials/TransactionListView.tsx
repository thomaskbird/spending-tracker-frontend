import * as React from "react";
import "./TransactionListView.scss";
import {
  PaginatedListResults,
  Transaction,
} from "../../services/Models";
import { TransactionListItem } from "./TransactionListItem";
import axios from "axios";

interface TransactionListViewProps {
  start: string;
  end: string;
  onReady(api: TransactionListView.Api): void;
}

interface State {
  transactions: PaginatedListResults | undefined;
}

const COMPONENT_NAME = "TransactionListView";

export class TransactionListView extends React.Component<
  TransactionListViewProps,
  State
> {
  private dateFormat = "YYYY-MM-DD";

  constructor(props: TransactionListViewProps, context: any) {
    super(props, context);

    this.state = {
      transactions: undefined
    };
  }

  public componentDidMount(): void {
    this.getTransactions();

    const api: TransactionListView.Api = {
      refreshData: () => {
        this.getTransactions();
      }
    };

    this.props.onReady(api);
  }

  public componentDidUpdate(prevProps: TransactionListViewProps): void {
    if(prevProps.start !== this.props.start || prevProps.end !== this.props.end) {
      this.getTransactions();
    }
  }

  public render(): JSX.Element {
    return (
      <div className={COMPONENT_NAME}>
        {this.state.transactions &&
          this.state.transactions.data &&
          this.state.transactions.data.map(
            (transaction: Transaction, idx: number) => {
              return (
                <TransactionListItem
                  key={idx}
                  transaction={transaction}
                />
              );
            }
          )
        }

        {!this.state.transactions ||
          this.state.transactions.data.length < 1 ? (
          <p>No transactions, try changing the ranges...</p>
        ) : (undefined)}
      </div>
    );
  }

  private getTransactions(): void {
    this.setState({
      transactions: undefined
    });

    axios.get(`/transactions/${this.props.start}/${this.props.end}`).then(transactions => {
      this.setState({
        transactions: transactions.data
      })
    });
  }
}

export namespace TransactionListView {
  export interface Api {
    refreshData(): void;
  }
}