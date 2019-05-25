"use strict";
exports.__esModule = true;
var Moment = require("moment");
var YMDateRange = /** @class */ (function () {
    function YMDateRange(startDateYear, startDateMonth, startDateDay, endDateYear, endDateMonth, endDateDay, timezoneOffsetInMinutes) {
        this.startDateYear = startDateYear;
        this.startDateMonth = startDateMonth;
        this.startDateDay = startDateDay;
        this.endDateYear = endDateYear;
        this.endDateMonth = endDateMonth;
        this.endDateDay = endDateDay;
        this.timezoneOffsetInMinutes = timezoneOffsetInMinutes;
    }
    YMDateRange.prototype.getStartDateLocal = function () {
        var d = new Date(Date.UTC(this.startDateYear, this.startDateMonth, this.startDateDay));
        d.setTime(d.getTime() + (this.timezoneOffsetInMinutes + (Moment().isDST() ? 60 : 0)) * 60 * 1000);
        return d;
    };
    YMDateRange.prototype.getEndDateLocal = function () {
        var d = new Date(Date.UTC(this.endDateYear, this.endDateMonth, this.endDateDay));
        d.setTime(d.getTime() + (this.timezoneOffsetInMinutes + (Moment().isDST() ? 60 : 0)) * 60 * 1000);
        return d;
    };
    YMDateRange.prototype.isEqualTo = function (anotherDateRange) {
        return this.startDateYear === anotherDateRange.startDateYear &&
            this.startDateMonth === anotherDateRange.startDateMonth &&
            this.startDateDay === anotherDateRange.startDateDay &&
            this.endDateYear === anotherDateRange.endDateYear &&
            this.endDateMonth === anotherDateRange.endDateMonth &&
            this.endDateDay === anotherDateRange.endDateDay;
    };
    YMDateRange.prototype.isMonthRange = function () {
        return this.startDateDay === 1 && this.endDateDay === 1 &&
            ((this.startDateMonth + 1 === this.endDateMonth && this.startDateYear === this.endDateYear) ||
                (this.startDateMonth === 11 && this.endDateMonth === 0 && this.startDateYear + 1 === this.endDateYear));
    };
    YMDateRange.prototype.addMonth = function (number) {
        if (number === void 0) { number = 1; }
        var startDate = this.getStartDateLocal();
        this.startDateMonth = Moment(startDate).add(number, 'month').month();
        this.startDateYear = Moment(startDate).add(number, 'month').year();
        this.startDateDay = Moment(startDate).add(number, 'month').date();
        var endDate = this.getEndDateLocal();
        this.endDateMonth = Moment(endDate).add(number, 'month').month();
        this.endDateYear = Moment(endDate).add(number, 'month').year();
        this.endDateDay = Moment(endDate).add(number, 'month').date();
    };
    YMDateRange.monthDateRange = function (month, year, timezoneOffsetInMinutes) {
        return new YMDateRange(year, month, 1, month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, 1, timezoneOffsetInMinutes);
    };
    // tslint:disable-next-line:member-ordering
    YMDateRange.fromObject = function (obj) {
        if (obj == null)
            return new YMDateRange(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
        return new YMDateRange(obj.startDateYear, obj.startDateMonth, obj.startDateDay, obj.endDateYear, obj.endDateMonth, obj.endDateDay, obj.timezoneOffsetInMinutes);
    };
    return YMDateRange;
}());
exports["default"] = YMDateRange;
