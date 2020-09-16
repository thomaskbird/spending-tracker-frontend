import { combineReducers } from "redux";
import { SET_DATE_RANGE, PREVIOUS_DATE_RANGE, NEXT_DATE_RANGE } from "./dateRange-actions";
import moment from "moment";

const initialState = {
    range: {
        start: moment().startOf("month"),
        end: moment().endOf("month")
    },
};

function dateRangeReducer(state: any = initialState, data: any): any {
    switch (data.type) {
        case SET_DATE_RANGE:
            let newRange = {};
            if(typeof data.range === "object") {
                newRange = data.range;
            } else {
                if(data.range && data.current) {
                    if(data.range === "previous") {
                        newRange = {
                            start: moment(data.current.start).subtract(1, "month").startOf(),
                            end: moment(data.current.end).subtract(1, "month").endOf()
                        };
                    } else {
                        newRange = {
                            start: moment(data.current.start).add(1, "month").startOf(),
                            end: moment(data.current.end).add(1, "month").endOf()
                        };
                    }
                }
            }

            return {
                range: newRange
            };
        case PREVIOUS_DATE_RANGE:
            return {
                range: {
                    start: moment(data.current.start).subtract(1, "month").startOf(),
                    end: moment(data.current.end).subtract(1, "month").endOf()
                }
            };
        case NEXT_DATE_RANGE:
            return {
                range: {
                    start: moment(data.current.start).add(1, "month").startOf(),
                    end: moment(data.current.end).add(1, "month").endOf()
                }
            };
        default:
            return state;
    }
}

export const DateRangeReducers = dateRangeReducer;
