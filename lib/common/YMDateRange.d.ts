export default class YMDateRange {
    startDate: Date;
    endDate: Date;
    constructor(startDate: Date, endDate: Date);
    static fromObject: (obj: any) => YMDateRange;
}
