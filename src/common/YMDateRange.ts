import * as Moment from 'moment';

export default class YMDateRange {
    startDate: Date
    endDate: Date

    constructor (startDate: Date, endDate: Date) {
        this.startDate = startDate
        this.endDate = endDate
    }

    isEqualTo(anotherDateRange: YMDateRange) {
        return YMDateRange.compareDates(this.startDate, anotherDateRange.startDate) && YMDateRange.compareDates(this.endDate, anotherDateRange.endDate)
    }

    isMonthRange() {
        return (
            Moment(this.startDate).isSame(Moment(this.startDate).startOf('month').startOf('day')) && Moment(this.endDate).isSame(Moment(this.endDate).endOf('month').startOf('day')) ||
            Moment(this.startDate).isSame(Moment(this.startDate).startOf('month').startOf('day')) && Moment(this.endDate).isSame(Moment(this.startDate).add(1, 'month').startOf('month').startOf('day')))
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