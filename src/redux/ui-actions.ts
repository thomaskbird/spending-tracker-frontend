import { PanelActionTypes } from "../services/Models";

// Action types
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const TOGGLE_DETAIL = "TOGGLE_DETAIL";
export const TOGGLE_LOADING = "TOGGLE_LOADING";

// Actions creators
export const toggleSidebar = (): any => ({
    type: TOGGLE_SIDEBAR,
});

export const toggleDetailPanel = (actionType?: PanelActionTypes): any => ({
    type: TOGGLE_DETAIL,
    actionType: actionType,
});

export const toggleLoading = (): any => ({
    type: TOGGLE_LOADING,
});
