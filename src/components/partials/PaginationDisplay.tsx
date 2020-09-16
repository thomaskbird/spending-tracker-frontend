import * as React from "react";
import "./PaginationDisplay.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { PaginationDirection } from "../../services/Models";
import { connect } from "react-redux";
import { setDateRange } from "../../redux/dateRange-actions";

interface DateRange {
    start: string;
    end: string;
}

interface DateRangeData {
    range: DateRange | "next" | "previous";
    current: DateRange;
}

interface PaginationDisplayProps {
    range: DateRange;
    setRange(data: DateRangeData): void;
}

interface State {}

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
                    onClick={() => this.props.setRange({ range: PaginationDirection.previous, current: this.props.range })}
                >
                    <FontAwesomeIcon icon={"chevron-left"} />
                </button>

                <span className={`HeaderPartial--month-indicator`}>
                    {moment(this.props.range.start).format("MMMM, YYYY")}
                </span>

                <button
                    type={"button"}
                    className={"pagination__button"}
                    onClick={() => this.props.setRange({ range: PaginationDirection.next, current: this.props.range })}
                >
                    <FontAwesomeIcon icon={"chevron-right"} />
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    range: state.dateRange.range
});

const mapDispatchToProps = (dispatch: any) => ({
    setRange: (data: any) => dispatch(setDateRange(data)),
});

export const ConnectedPaginationDisplay = connect(mapStateToProps, mapDispatchToProps)(PaginationDisplay);
