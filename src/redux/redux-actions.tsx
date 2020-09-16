import { PanelActionTypes } from "../services/Models";

/**
 * Interfaces
 */

// Action types
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const TOGGLE_DETAIL = "TOGGLE_DETAIL";

// Actions creators
export const toggleSidebar = (): any => ({
    type: TOGGLE_SIDEBAR,
});

export const toggleDetailPanel = (actionType?: PanelActionTypes): any => ({
    type: TOGGLE_DETAIL,
    actionType: actionType,
});
