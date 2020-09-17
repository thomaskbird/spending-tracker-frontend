import { TOGGLE_DETAIL, TOGGLE_PAGINATION, TOGGLE_SIDEBAR } from "./ui-actions";

export interface HeaderUI {
    sidebarOpen: boolean;
    detailOpen: boolean;
    showPaginationBar: boolean;
}

const initialState = {
    sidebarOpen: false,
    detailOpen: false,
    showPaginationBar: false,
};

function ui(state: HeaderUI = initialState, data: any): any {
    switch(data.type) {
        case TOGGLE_SIDEBAR:
            return {
                sidebarOpen: !state.sidebarOpen,
                detailOpen: false
            };
        case TOGGLE_DETAIL:
            return {
                sidebarOpen: false,
                detailOpen: !state.detailOpen,
                transactionActionType: data.actionType,
            };
        case TOGGLE_PAGINATION:
            return {
                showPaginationBar: !state.showPaginationBar
            };
        default:
            return state
    }
}


export const UiReducers = ui;
