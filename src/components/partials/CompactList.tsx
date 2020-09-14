import * as React from "react";
import _ from "lodash";
import "./CompactList.scss";
import { mapCollectionToArray } from "../helpers/Utils";

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
        this.setState({ items: mapCollectionToArray(this.props.items, this.props.headings) });
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME}__detail--list`}>
                <div className={`${COMPONENT_NAME}__detail--list__header`}>
                    Transactions
                </div>
                <div className={`${COMPONENT_NAME}__detail--list__header--border-bottom`} />
                <div
                    className={`${COMPONENT_NAME}__detail--list__body-item ${COMPONENT_NAME}__detail--list__body--header`}
                >
                    {this.props.headings && this.props.headings.map((title, index) => (
                        <div className={`${COMPONENT_NAME}__column ${COMPONENT_NAME}`} key={index}>
                            {title}
                        </div>
                    ))}
                </div>
                <div className={`${COMPONENT_NAME}__detail--list__body`}>
                    {this.state.items.map((item, itemIndex) => {
                        return (
                            <div
                                key={itemIndex}
                                className={`${COMPONENT_NAME}__detail--list__body-item`}
                            >
                                {this.props.headings.map((heading, headingIndex) => (
                                    <span key={headingIndex}>
                                        {item[headingIndex]}
                                    </span>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
