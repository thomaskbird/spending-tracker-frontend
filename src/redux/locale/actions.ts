/* tslint:disable:valid-jsdoc completed-docs */
/**
 * TODO document
 */
export namespace ActionTypes {
    export const CHANGE_TIMEZONE = "CHANGE_TIMEZONE";
    export const CHANGE_LOCALE = "CHANGE_LOCALE";
}

/**
 * TODO document
 */
export namespace Actions {
    /**
     * TODO document
     */
    export interface CHANGE_TIMEZONE {
        type: typeof ActionTypes.CHANGE_TIMEZONE;
        timezoneId: string;
    }

    /**
     * TODO document
     */
    export interface CHANGE_LOCALE {
        type: typeof ActionTypes.CHANGE_LOCALE;
        localeId: string;
    }

    /**
     * TODO document
     */
    export type ANY = CHANGE_TIMEZONE | CHANGE_LOCALE;
}

/**
 * TODO document
 */
export namespace ActionCreators {
    /**
     * TODO document
     * @param timeZoneId
     * @returns
     */
    export function changeTimezone(
        timeZoneId: string
    ): Actions.CHANGE_TIMEZONE {
        return {
            type: ActionTypes.CHANGE_TIMEZONE,
            timezoneId: timeZoneId
        };
    }

    /**
     * TODO document
     * @param  localeId
     * @returns
     */
    export function changeLocale(localeId: string): Actions.CHANGE_LOCALE {
        return {
            type: ActionTypes.CHANGE_LOCALE,
            localeId: localeId
        };
    }
}
