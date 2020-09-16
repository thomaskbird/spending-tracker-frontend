import { SET_TARGET_ITEM, SET_TRANSACTION_LIST } from "./transaction-actions";

const initialState = {
    targetItem: undefined,
};

function transactionReducer(state: any = initialState, data: any): any {
    switch (data.type) {
        case SET_TARGET_ITEM:
            return {
                targetItem: data.item
            };
        case SET_TRANSACTION_LIST:
            return {
                transactions: data.transactions
            };
        default:
            return state;
    }
}

export const TransactionReducers = transactionReducer;
