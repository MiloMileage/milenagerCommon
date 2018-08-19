export default class YMDateRange {
    startDate: Date
    endDate: Date

    constructor (startDate: Date, endDate: Date) {
        this.startDate = new Date(startDate)
        this.endDate = new Date(endDate)
    }

    isEqualTo(anotherDateRange: YMDateRange) {
        return YMDateRange.compareDates(this.startDate, anotherDateRange.startDate) && YMDateRange.compareDates(this.endDate, anotherDateRange.endDate)
    }

    isMonthRange() {
        return this.startDate.getDate() === 1 && this.endDate.getDate() === 1 && this.startDate.getMonth() + 1 === this.endDate.getMonth()
    }

    static compareDates(date1: Date, date2: Date) {
        if (date1 === undefined && date2 === undefined) {
            return true
        }

        if (date1 !== undefined && date2 !== undefined) {
            return new Date(date1).getTime() === new Date(date2).getTime()
        }

        return false
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMDateRange(new Date, new Date)

        return new YMDateRange(new Date(obj.startDate), new Date(obj.endDate))
    }
}