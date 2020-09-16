import { combineReducers } from "redux";
import {
    TOGGLE_SIDEBAR,
    TOGGLE_DETAIL,
} from "./redux-actions";

import { TransactionReducers } from "./transaction-reducers";
import { DateRangeReducers } from "./dateRange-reducers";

export interface HeaderUI {
    sidebarOpen: boolean;
    detailOpen: boolean;
}

const initialState = {
    sidebarOpen: false,
    detailOpen: false
};

function toggle(state: HeaderUI = initialState, data: any): any {
    switch(data.type) {
        case TOGGLE_SIDEBAR:
            return {
                sidebarOpen: state.sidebarOpen ? false : true,
                detailOpen: false
            };
        case TOGGLE_DETAIL:
            return {
                sidebarOpen: false,
                detailOpen: state.detailOpen ? false : true,
                transactionActionType: data.actionType,
            };
        default:
            return state
    }
}

export const BudgetAppReducers = combineReducers({
    ui: toggle,
    transactions: TransactionReducers,
    dateRange: DateRangeReducers,
});
