import * as React from "react";
import "./HeaderPartial.scss";
import { Link } from "react-router-dom";
import { DatePicker } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const { RangePicker } = DatePicker;

import { DateRange, PanelActionTypes } from "../../services/Models";
import { APP_DATE_FORMAT } from "../helpers/Utils";

interface HeaderPartialProps {
    range?: DateRange;
    /**
     * Toggles the sidebar
     *
     * @param {boolean} isOpen - Indicates whether the panel should be open/closed
     */
    onToggleSidebar?(isOpen: boolean): void;
    /**
     * Toggles the transaction panel
     *
     * @param {boolean} isOpen - Indicates whether the panel should be open
     * @param {TransactionPanelActionTypes} actionType - Indicates what action the panel should render
     * @param {undefined} transaction - The transaction data
     */
    onToggleContextPanel?(isOpen: boolean, actionType: PanelActionTypes): void;
    /**
     * Triggers when the data range has been changed
     *
     * @param {DateRange} range - An object containing the start/end values
     */
    onDateRangeChange?(direction: DateRange | string): void;
}

interface State {}

const COMPONENT_NAME = "HeaderPartial";

export class HeaderPartial extends React.Component<HeaderPartialProps, State> {
    public static readonly displayName = "Header Partial";

    constructor(props: HeaderPartialProps, context: any) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className={"HeaderPartial"}>
                <div className={"HeaderPartial--top"}>
                    {this.props.onToggleSidebar ? (
                        <span
                            className={"HeaderPartial--top--icons"}
                            onClick={() => this.props.onToggleSidebar!(true)}
                        >
                            <FontAwesomeIcon icon={"bars"} />
                        </span>
                    ) : (
                        undefined
                    )}

                    <Link to={"/admin"}>
                        <div className={"branding"}>
                            <div className={"branding--main"}>Spending</div>
                            <div className={"branding--secondary"}>Tracker</div>
                        </div>
                    </Link>

                    <span
                        className={`HeaderPartial--top--icons HeaderPartial--top--icons--add ${!this.props.onToggleContextPanel ? "hidden" : ""}`}
                        onClick={() => this.props.onToggleContextPanel && this.props.onToggleContextPanel!(true, PanelActionTypes.add)}
                    >
                        <FontAwesomeIcon icon={"plus"} />
                    </span>
                </div>
                {this.props.onDateRangeChange && this.props.range ? (
                    <>
                        <div className={"HeaderPartial--bottom"}>
                            <button
                                type={"button"}
                                className={"pagination__button"}
                                onClick={() => this.handlePaginationClick("previous")}
                            >
                                <FontAwesomeIcon icon={"chevron-left"} />
                            </button>
                            <RangePicker
                                defaultValue={[this.props.range.start, this.props.range.end]}
                                value={[this.props.range.start, this.props.range.end]}
                                format={APP_DATE_FORMAT}
                                onChange={(dates, dateStrings) => {
                                    if(this.props.onDateRangeChange) {
                                        this.props.onDateRangeChange({
                                            start: dates[0],
                                            end: dates[1]
                                        });
                                    }
                                }}
                            />
                            <button
                                type={"button"}
                                className={"pagination__button"}
                                onClick={() => this.handlePaginationClick("next")}
                            >
                                <FontAwesomeIcon icon={"chevron-right"} />
                            </button>
                        </div>
                        <div className={"HeaderPartial--bottom"}>
                            {moment(this.props.range && this.props.range.start).format("MMMM, YYYY")}
                        </div>
                    </>
                ) : (
                    undefined
                )}
            </div>
        );
    }

    private handlePaginationClick(direction: string): void {
        if(this.props.onDateRangeChange) {
            this.props.onDateRangeChange(direction);
        }
    }
}
