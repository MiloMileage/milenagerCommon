import * as Moment from 'moment';

export default class YMDateRange {
    startDateYear: number
    startDateMonth: number
    startDateDay: number

    endDateYear: number
    endDateMonth: number
    endDateDay: number

    timezoneOffsetInMinutes: number

    constructor (startDateYear: number, startDateMonth: number, startDateDay: number, endDateYear: number, endDateMonth: number, endDateDay: number, timezoneOffsetInMinutes: number) {
        this.startDateYear = startDateYear
        this.startDateMonth = startDateMonth
        this.startDateDay = startDateDay
        this.endDateYear = endDateYear
        this.endDateMonth = endDateMonth
        this.endDateDay = endDateDay
        this.timezoneOffsetInMinutes = timezoneOffsetInMinutes
    }

    getStartDateLocal() {
        const d = new Date(Date.UTC(this.startDateYear, this.startDateMonth, this.startDateDay));
        d.setTime(d.getTime() + (this.timezoneOffsetInMinutes + (Moment(d).isDST() ? 60 : 0))*60*1000 )

        return d
    }

    getEndDateLocal() {
        const d = new Date(Date.UTC(this.endDateYear, this.endDateMonth, this.endDateDay));
        d.setTime(d.getTime() + (this.timezoneOffsetInMinutes + (Moment(d).isDST() ? 60 : 0))*60*1000 )
        
        return d
    }

    isEqualTo(anotherDateRange: YMDateRange) {
        return this.startDateYear === anotherDateRange.startDateYear &&
            this.startDateMonth === anotherDateRange.startDateMonth &&
            this.startDateDay === anotherDateRange.startDateDay &&
            this.endDateYear === anotherDateRange.endDateYear &&
            this.endDateMonth === anotherDateRange.endDateMonth &&
            this.endDateDay === anotherDateRange.endDateDay
    }

    isMonthRange() {
        return this.startDateDay === 1 && this.endDateDay === 1 &&
            ((this.startDateMonth + 1 === this.endDateMonth && this.startDateYear === this.endDateYear) ||
            (this.startDateMonth === 11 && this.endDateMonth === 0 && this.startDateYear + 1 === this.endDateYear)) 
    }
    
    addMonth(number: number = 1) {
        let addYears = this.startDateMonth + number >= 12
        this.startDateMonth = (this.startDateMonth + number) % 12
        this.startDateYear = this.startDateYear + (addYears ? 1 : 0)
        const startDate = Moment(this.getStartDateLocal())
        this.startDateDay = startDate.endOf('month').date() < this.startDateDay ? startDate.endOf('month').date() : this.startDateDay

        addYears = this.endDateMonth + number > 12
        this.endDateMonth = (this.endDateMonth + number) % 12
        this.endDateYear = this.endDateYear + (addYears ? 1 : 0)
        const endDate = Moment(this.getStartDateLocal())
        this.endDateDay = endDate.endOf('month').date() < this.endDateDay ? endDate.endOf('month').date() : this.endDateDay
    }

    static monthDateRange(month: number, year: number, timezoneOffsetInMinutes: number) {
        return new YMDateRange(year, month, 1, month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, 1, timezoneOffsetInMinutes)
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return YMDateRange.monthDateRange(Moment().month(), Moment().year(), 0)

        return new YMDateRange(obj.startDateYear, obj.startDateMonth, obj.startDateDay, obj.endDateYear, obj.endDateMonth, obj.endDateDay, obj.timezoneOffsetInMinutes)
    }
}