import * as React from "react";
import _ from "lodash";
import "./CompactList.scss";
import { TransactionType } from "../../services/Models";

interface CompactListProps {
    items: any[];
    headings: string[];
    maxHeight?: number;
}

interface State {
    items: any[];
}

const COMPONENT_NAME = "CompactList";

export class CompactList extends React.Component<CompactListProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: CompactListProps, context: any) {
        super(props, context);

        this.state = {
            items: []
        };
    }

    public componentDidMount(): void {
        this.refreshData();
    }

    public componentDidUpdate(prevProps: Readonly<CompactListProps>): void {
        if(!_.isEqual(prevProps.items, this.props.items)) {
            this.refreshData();
        }
    }

    private refreshData(): void {
        const items: any = [];

        this.props.items.map(item => {
            const itemToAdd: any = [];
            this.props.headings.map(title => {
                if(title === "amount") {
                    itemToAdd.push(`$${item[title]}`);
                } else {
                    itemToAdd.push(item[title]);
                }
            });

            items.push(itemToAdd);
        });

        this.setState({ items: items });
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME}__detail--list`}>
                <div className={`${COMPONENT_NAME}__detail--list__header`}>
                    Transactions
                </div>
                <div className={`${COMPONENT_NAME}__detail--list__header--border-bottom`} />
                <div className={`${COMPONENT_NAME}__detail--list__body`}>
                    {this.props.tag.transactions.map((transaction, index) => {
                        return (
                            <div
                                key={index}
                                className={`${COMPONENT_NAME}__detail--list__body-item`}
                            >
                                <span>
                                    <b>{transaction.title}</b><br/>
                                    {transaction.description}
                                </span>
                                <span>
                                    {transaction.type === TransactionType.income ? "+" : "-"}{" "}{transaction.amount}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
