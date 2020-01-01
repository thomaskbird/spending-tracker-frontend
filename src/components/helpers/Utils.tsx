import { DateRange } from "../../services/Models";
import moment from "moment";

export class Utils {
    private isPropertySet(obj: any, key: string): any {
        return obj && obj[key];
    }
}

export const APP_DATE_FORMAT = "YYYY-MM-DD";

export function mapCollectionToArray(items: any[], headings: string[]): string[] {
    const formatted: any = [];

    items.map(item => {
        const itemToAdd: any = [];
        headings.map(title => {
            if(title === "amount") {
                itemToAdd.push(`$${item[title]}`);
            } else if(title === "occurred_at") {
                itemToAdd.push(item[title].substring(0,10));
            } else {
                itemToAdd.push(item[title]);
            }
        });

        formatted.push(itemToAdd);
    });

    return formatted;
};

export function handleDateRangeChange(next: DateRange | string, range?: DateRange): DateRange | undefined {
    let newRange;

    if(typeof next === "object") {
        newRange = next;
    } else {
        if(next && range) {
            if(next === "previous") {
                newRange = {
                    start: moment(range.start).subtract(1, "month").startOf(),
                    end: moment(range.end).subtract(1, "month").endOf()
                };
            } else {
                newRange = {
                    start: moment(range.start).add(1, "month").startOf(),
                    end: moment(range.end).add(1, "month").endOf()
                };
            }
        }
    }

    return newRange;
}
