"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
class YMDateRange {
    constructor(startDateYear, startDateMonth, startDateDay, endDateYear, endDateMonth, endDateDay, timezoneOffsetInMinutes) {
        this.startDateYear = Number(startDateYear);
        this.startDateMonth = Number(startDateMonth);
        this.startDateDay = Number(startDateDay);
        this.endDateYear = Number(endDateYear);
        this.endDateMonth = Number(endDateMonth);
        this.endDateDay = Number(endDateDay);
        this.timezoneOffsetInMinutes = Number(timezoneOffsetInMinutes);
    }
    getStartDateLocal(ignoreDst = false) {
        const d = new Date(Date.UTC(this.startDateYear, this.startDateMonth, this.startDateDay));
        d.setTime(d.getTime() + (this.timezoneOffsetInMinutes + (!ignoreDst && Moment(d).isDST() ? 60 : 0)) * 60 * 1000);
        return d;
    }
    getEndDateLocal(ignoreDst = false) {
        const d = new Date(Date.UTC(this.endDateYear, this.endDateMonth, this.endDateDay));
        d.setTime(d.getTime() + (this.timezoneOffsetInMinutes + (!ignoreDst && Moment(d).isDST() ? 60 : 0)) * 60 * 1000);
        return d;
    }
    isEqualTo(anotherDateRange) {
        return this.startDateYear === anotherDateRange.startDateYear &&
            this.startDateMonth === anotherDateRange.startDateMonth &&
            this.startDateDay === anotherDateRange.startDateDay &&
            this.endDateYear === anotherDateRange.endDateYear &&
            this.endDateMonth === anotherDateRange.endDateMonth &&
            this.endDateDay === anotherDateRange.endDateDay;
    }
    isMonthRange() {
        return this.startDateDay === 1 && this.endDateDay === 1 &&
            ((this.startDateMonth + 1 === this.endDateMonth && this.startDateYear === this.endDateYear) ||
                (this.startDateMonth === 11 && this.endDateMonth === 0 && this.startDateYear + 1 === this.endDateYear));
    }
    addMonth(number = 1) {
        if (number == 0) {
            return;
        }
        if (number < 0) {
            this.substructMonth(Math.abs(number));
            return;
        }
        let addYears = this.startDateMonth + number >= 12;
        this.startDateMonth = (this.startDateMonth + number) % 12;
        this.startDateYear = this.startDateYear + (addYears ? 1 : 0);
        const startDate = Moment(this.getStartDateLocal());
        this.startDateDay = startDate.endOf('month').date() < this.startDateDay ? startDate.endOf('month').date() : this.startDateDay;
        addYears = this.endDateMonth + number >= 12;
        this.endDateMonth = (this.endDateMonth + number) % 12;
        this.endDateYear = this.endDateYear + (addYears ? 1 : 0);
        const endDate = Moment(this.getStartDateLocal());
        this.endDateDay = endDate.endOf('month').date() < this.endDateDay ? endDate.endOf('month').date() : this.endDateDay;
    }
    substructMonth(number = 1) {
        if (number == 0) {
            return;
        }
        if (number < 0) {
            this.addMonth(Math.abs(number));
            return;
        }
        let subYears = this.startDateMonth - number < 0;
        this.startDateMonth = (this.startDateMonth - number + 12) % 12;
        this.startDateYear = this.startDateYear - (subYears ? 1 : 0);
        const startDate = Moment(this.getStartDateLocal());
        this.startDateDay = startDate.endOf('month').date() < this.startDateDay ? startDate.endOf('month').date() : this.startDateDay;
        subYears = this.endDateMonth - number < 0;
        this.endDateMonth = (this.endDateMonth - number + 12) % 12;
        this.endDateYear = this.endDateYear - (subYears ? 1 : 0);
        const endDate = Moment(this.getStartDateLocal());
        this.endDateDay = endDate.endOf('month').date() < this.endDateDay ? endDate.endOf('month').date() : this.endDateDay;
    }
    static monthDateRange(month, year, timezoneOffsetInMinutes) {
        const tzInMinutes = timezoneOffsetInMinutes ? timezoneOffsetInMinutes : Moment().month(month).date(1).toDate().getTimezoneOffset();
        return new YMDateRange(year, month, 1, month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, 1, tzInMinutes);
    }
}
// tslint:disable-next-line:member-ordering
YMDateRange.fromObject = function (obj) {
    if (obj == null)
        return YMDateRange.monthDateRange(Moment().month(), Moment().year());
    return new YMDateRange(obj.startDateYear, obj.startDateMonth, obj.startDateDay, obj.endDateYear, obj.endDateMonth, obj.endDateDay, obj.timezoneOffsetInMinutes);
};
exports.default = YMDateRange;
//# sourceMappingURL=YMDateRange.js.map