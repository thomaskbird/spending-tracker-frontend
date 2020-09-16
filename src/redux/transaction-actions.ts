import { TransactionWithRecurring } from "../services/Models";

export const SET_TARGET_ITEM = "SET_TARGET_ITEM";
export const SET_TRANSACTION_LIST = "SET_TRANSCATION_LIST";

export const setTargetItem = (item: TransactionWithRecurring): any => ({
    type: SET_TARGET_ITEM,
    item: item,
});

export const setTransactionList = (transactions: TransactionWithRecurring[]): any => ({
    type: SET_TRANSACTION_LIST,
    transactions: transactions
});
