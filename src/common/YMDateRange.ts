export default class YMDateRange {
    startDate: Date
    endDate: Date

    constructor (startDate: Date, endDate: Date) {
        this.startDate = startDate
        this.endDate = endDate
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMDateRange(new Date, new Date)

        return new YMDateRange(obj.startDate, obj.endDate)
    }
}