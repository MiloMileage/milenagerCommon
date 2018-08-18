export default class YMDateRange {
    startDate: Date;
    endDate: Date;
    constructor(startDate: Date, endDate: Date);
    isEqualTo(anotherDateRange: YMDateRange): boolean;
    static compareDates(date1: Date, date2: Date): boolean;
    static fromObject: (obj: any) => YMDateRange;
}
