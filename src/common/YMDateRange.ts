export default class YMDateRange {
    startDate: Date
    endDate: Date

    constructor (startDate: Date, endDate: Date) {
        this.startDate = startDate
        this.endDate = endDate
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        // tslint:disable-next-line:max-line-length
        return new YMDateRange(obj.startDate, obj.endDate)
    }
}