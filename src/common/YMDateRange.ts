import * as Moment from 'moment';
import YMDrive from './YMDrive'
import moment = require('moment');

export default class YMDateRange {
    startDateYear: number
    startDateMonth: number
    startDateDay: number

    endDateYear: number
    endDateMonth: number
    endDateDay: number

    timezoneOffsetInMinutes: number
    timezoneOffsetInMinutesEnd: number

    constructor (startDateYear: number, startDateMonth: number, startDateDay: number, endDateYear: number, endDateMonth: number, endDateDay: number, timezoneOffsetInMinutes: number, timezoneOffsetInMinutesEnd: number) {
        this.startDateYear = Number(startDateYear)
        this.startDateMonth = Number(startDateMonth)
        this.startDateDay = Number(startDateDay)
        this.endDateYear = Number(endDateYear)
        this.endDateMonth = Number(endDateMonth)
        this.endDateDay = Number(endDateDay)
        this.timezoneOffsetInMinutes = Number(timezoneOffsetInMinutes)
        this.timezoneOffsetInMinutesEnd = timezoneOffsetInMinutesEnd ?  Number(timezoneOffsetInMinutesEnd) : Number(timezoneOffsetInMinutes)
    }

    getStartDateLocal(ignoreDst: boolean = false) {  
        const d = new Date(Date.UTC(this.startDateYear, this.startDateMonth, this.startDateDay));
        d.setTime(d.getTime() + (this.timezoneOffsetInMinutes + (!ignoreDst && Moment(d).isDST() ? 60 : 0))*60*1000 )

        return d
    }

    getEndDateLocal(ignoreDst: boolean = false) {
        const d = new Date(Date.UTC(this.endDateYear, this.endDateMonth, this.endDateDay));
        d.setTime(d.getTime() + (this.timezoneOffsetInMinutesEnd + (!ignoreDst && Moment(d).isDST() ? 60 : 0))*60*1000 )
        
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
        if (number == 0) {
            return
        }

        if (number < 0) {
            this.substructMonth(Math.abs(number))
            return
        }

        let addYears = this.startDateMonth + number >= 12
        this.startDateMonth = (this.startDateMonth + number) % 12
        this.startDateYear = this.startDateYear + (addYears ? 1 : 0)
        const startDate = Moment(this.getStartDateLocal())
        this.startDateDay = startDate.endOf('month').date() < this.startDateDay ? startDate.endOf('month').date() : this.startDateDay

        addYears = this.endDateMonth + number >= 12
        this.endDateMonth = (this.endDateMonth + number) % 12
        this.endDateYear = this.endDateYear + (addYears ? 1 : 0)
        const endDate = Moment(this.getStartDateLocal())
        this.endDateDay = endDate.endOf('month').date() < this.endDateDay ? endDate.endOf('month').date() : this.endDateDay
    }

    substructMonth(number: number = 1) {
        if (number == 0) {
            return
        }

        if (number < 0) {
            this.addMonth(Math.abs(number))
            return
        }

        let subYears = this.startDateMonth - number < 0
        this.startDateMonth = (this.startDateMonth - number + 12) % 12
        this.startDateYear = this.startDateYear - (subYears ? 1 : 0)
        const startDate = Moment(this.getStartDateLocal())
        this.startDateDay = startDate.endOf('month').date() < this.startDateDay ? startDate.endOf('month').date() : this.startDateDay
        subYears = this.endDateMonth - number < 0
        this.endDateMonth = (this.endDateMonth - number + 12) % 12
        this.endDateYear = this.endDateYear - (subYears ? 1 : 0)
        const endDate = Moment(this.getStartDateLocal())
        this.endDateDay = endDate.endOf('month').date() < this.endDateDay ? endDate.endOf('month').date() : this.endDateDay
    }

    isInDateRange = (drive: YMDrive) => {
        const endDateRange = (Date.UTC(this.endDateYear, this.endDateMonth, this.endDateDay) / 1000) - drive.timestampOffsetInSeconds // get the local time reletively to the specific drive
        const startDateRange = (Date.UTC(this.startDateYear, this.startDateMonth, this.startDateDay) / 1000) - drive.timestampOffsetInSeconds // get the local time reletively to the specific drive
    
        return drive.startTimeTimestampUtc >= startDateRange && drive.startTimeTimestampUtc <= endDateRange 
      }

    static monthDateRange(month: number, year: number) {
        const startOfMonth = moment().year(year).month(month).date(1).toDate()
        const startOfNextMonth = moment().year(year).month(month).date(1).add(1, 'month').toDate()
        
        return YMDateRange.fromStartAndEndDates(startOfMonth, startOfNextMonth)
    }

    static fromStartAndEndDates(startDate: Date, endDate: Date) {
        return new YMDateRange(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), startDate.getTimezoneOffset(), endDate.getTimezoneOffset())
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return YMDateRange.monthDateRange(Moment().month(), Moment().year())

        return new YMDateRange(obj.startDateYear, obj.startDateMonth, obj.startDateDay, obj.endDateYear, obj.endDateMonth, obj.endDateDay, obj.timezoneOffsetInMinutes, obj.timezoneOffsetInMinutesEnd)
    }
}