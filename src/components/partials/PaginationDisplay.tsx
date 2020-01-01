import * as React from "react";
import "./PaginationDisplay.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { DateRange, PaginationDirection } from "../../services/Models";

interface PaginationDisplayProps {
    range?: DateRange;
    onPaginationClick(direction: PaginationDirection): void;
}

interface State {

}

const COMPONENT_NAME = "PaginationDisplay";

export class PaginationDisplay extends React.Component<PaginationDisplayProps, State> {
    public static readonly displayName = "Pagination Display";

    constructor(props: PaginationDisplayProps, context: any) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME}__wrapper`}>
                <button
                    type={"button"}
                    className={"pagination__button"}
                    onClick={() => this.props.onPaginationClick(PaginationDirection.previous)}
                >
                    <FontAwesomeIcon icon={"chevron-left"} />
                </button>

                <span className={`HeaderPartial--month-indicator`}>
                    {moment(this.props.range && this.props.range.start).format("MMMM, YYYY")}
                </span>

                {/*
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
                */}

                <button
                    type={"button"}
                    className={"pagination__button"}
                    onClick={() => this.props.onPaginationClick(PaginationDirection.next)}
                >
                    <FontAwesomeIcon icon={"chevron-right"} />
                </button>
            </div>
        )
    }
}
