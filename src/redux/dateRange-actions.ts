export const SET_DATE_RANGE = "SET_DATE_RANGE";
export const NEXT_DATE_RANGE = "NEXT_DATE_RANGE";
export const PREVIOUS_DATE_RANGE = "PREVIOUS_DATE_RANGE";

export const setDateRange = (data: any): any => ({
    type: SET_DATE_RANGE,
    ...data,
});

export const nextDateRange = (data: any): any => ({
    type: NEXT_DATE_RANGE,
    ...data,
});

export const previousDateRange = (data: any): any => ({
    type: PREVIOUS_DATE_RANGE,
    ...data,
});
