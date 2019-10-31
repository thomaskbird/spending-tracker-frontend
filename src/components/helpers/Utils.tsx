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
}
