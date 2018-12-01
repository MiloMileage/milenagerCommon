"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
class YMDateRange {
    constructor(startDateYear, startDateMonth, startDateDay, endDateYear, endDateMonth, endDateDay, timezoneOffsetInMinutes) {
        this.startDateYear = startDateYear;
        this.startDateMonth = startDateMonth;
        this.startDateDay = startDateDay;
        this.endDateYear = endDateYear;
        this.endDateMonth = endDateMonth;
        this.endDateDay = endDateDay;
        this.timezoneOffsetInMinutes = timezoneOffsetInMinutes;
    }
    getStartDateLocal() {
        const d = new Date(Date.UTC(this.startDateYear, this.startDateMonth, this.startDateDay));
        d.setTime(d.getTime() + this.timezoneOffsetInMinutes * 60 * 1000);
        return d;
    }
    getEndDateLocal() {
        const d = new Date(Date.UTC(this.endDateYear, this.endDateMonth, this.endDateDay));
        d.setTime(d.getTime() + this.timezoneOffsetInMinutes * 60 * 1000);
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
        const startDate = this.getStartDateLocal();
        this.startDateMonth = Moment(startDate).add(number, 'month').month();
        this.startDateYear = Moment(startDate).add(number, 'month').year();
        this.startDateDay = Moment(startDate).add(number, 'month').date();
        const endDate = this.getEndDateLocal();
        this.endDateMonth = Moment(endDate).add(number, 'month').month();
        this.endDateYear = Moment(endDate).add(number, 'month').year();
        this.endDateDay = Moment(endDate).add(number, 'month').date();
    }
    static monthDateRange(month, year, timezoneOffsetInMinutes) {
        return new YMDateRange(year, month, 1, month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, 1, timezoneOffsetInMinutes);
    }
}
// tslint:disable-next-line:member-ordering
YMDateRange.fromObject = function (obj) {
    if (obj == null)
        return new YMDateRange(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    return new YMDateRange(obj.startDateYear, obj.startDateMonth, obj.startDateDay, obj.endDateYear, obj.endDateMonth, obj.endDateDay, obj.timezoneOffsetInMinutes);
};
exports.default = YMDateRange;
//# sourceMappingURL=YMDateRange.js.map