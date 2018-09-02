export default class YMDateRange {
    startDate: Date;
    endDate: Date;
    constructor(startDate: Date, endDate: Date);
    isEqualTo(anotherDateRange: YMDateRange): boolean;
    isMonthRange(): boolean;
    static monthDateRange(date?: Date): YMDateRange;
    static compareDates(date1: Date, date2: Date): boolean;
    static fromObject: (obj: any) => YMDateRange;
}
