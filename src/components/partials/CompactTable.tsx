import * as React from "react";
import _ from "lodash";
import "./CompactTable.scss";
import { mapCollectionToArray } from "../helpers/Utils";

interface CompactTableProps {
    items: any[];
    headings: string[];
    maxHeight?: number;
}

interface State {
    items: any[];
}

const COMPONENT_NAME = "CompactTable";

export class CompactTable extends React.Component<CompactTableProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: CompactTableProps, context: any) {
        super(props, context);

        this.state = {
            items: []
        };
    }

    public componentDidMount(): void {
        this.refreshData();
    }

    public componentDidUpdate(prevProps: Readonly<CompactTableProps>): void {
        if(!_.isEqual(prevProps.items, this.props.items)) {
            this.refreshData();
        }
    }

    private refreshData(): void {
        this.setState({ items: mapCollectionToArray(this.props.items, this.props.headings) });
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                <div className={`${COMPONENT_NAME}__row`}>
                    {this.props.headings && this.props.headings.map((title, index) => (
                        <div className={`${COMPONENT_NAME}__column ${COMPONENT_NAME}__heading`} key={index}>
                            {title}
                        </div>
                    ))}
                </div>

                <div className={`${COMPONENT_NAME}__body`} style={{ maxHeight: this.props.maxHeight ? this.props.maxHeight : 250 }}>
                    {this.state.items.map((item, rowIndex) => (
                        <div className={`${COMPONENT_NAME}__row`} key={rowIndex}>
                            {item.map((column: string, columnIndex: number) => (
                                <div className={`${COMPONENT_NAME}__column`} key={columnIndex}>
                                    {column}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
