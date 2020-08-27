/**
 * Interfaces
 */

/**
 * Action types
 */
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const TOGGLE_DETAIL = "TOGGLE_DETAIL";

/**
 * Action creators
 */

export function toggleSidebar(isOpen: boolean): any {
    return {
        type: TOGGLE_SIDEBAR,
        isOpen: isOpen
    };
}

export function toggleDetailPanel(isOpen: boolean): any {
    return {
        type: TOGGLE_DETAIL,
        isOpen: isOpen
    };
}
