import * as React from "react";
import "./TransactionListView.scss";
import {
  PaginatedListResults,
  Transaction,
  TransactionType
} from "../../services/Models";
import {
  MOCK_PAGINATED_RESULTS,
  MOCK_TRANSACTIONS
} from "../../services/Mocks";
import { TransactionListItem } from "./TransactionListItem";

interface TransactionListViewProps {}

interface State {
  transactions: PaginatedListResults | undefined;
}

const COMPONENT_NAME = "TransactionListView";

export class TransactionListView extends React.Component<
  TransactionListViewProps,
  State
> {
  constructor(props: TransactionListViewProps, context: any) {
    super(props, context);

    this.state = {
      transactions: undefined
    };
  }

  public componentDidMount(): void {
    this.setState({
      transactions: {
        ...MOCK_PAGINATED_RESULTS,
        data: MOCK_TRANSACTIONS
      }
    });
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
          )}
      </div>
    );
  }
}
