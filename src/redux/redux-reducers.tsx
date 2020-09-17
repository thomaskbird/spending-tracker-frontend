import { combineReducers } from "redux";

import { TransactionReducers } from "./transaction-reducers";
import { DateRangeReducers } from "./dateRange-reducers";
import { UiReducers } from "./ui-reducers";

export const BudgetAppReducers = combineReducers({
    ui: UiReducers,
    transactions: TransactionReducers,
    dateRange: DateRangeReducers,
});
