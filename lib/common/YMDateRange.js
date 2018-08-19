"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMDateRange {
    constructor(startDate, endDate) {
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
    }
    isEqualTo(anotherDateRange) {
        return YMDateRange.compareDates(this.startDate, anotherDateRange.startDate) && YMDateRange.compareDates(this.endDate, anotherDateRange.endDate);
    }
    isMonthRange() {
        return this.startDate.getDate() === 1 && this.endDate.getDate() === 1 && this.startDate.getMonth() + 1 === this.endDate.getMonth();
    }
    static compareDates(date1, date2) {
        if (date1 === undefined && date2 === undefined) {
            return true;
        }
        if (date1 !== undefined && date2 !== undefined) {
            return new Date(date1).getTime() === new Date(date2).getTime();
        }
        return false;
    }
}
// tslint:disable-next-line:member-ordering
YMDateRange.fromObject = function (obj) {
    if (obj == null)
        return new YMDateRange(new Date, new Date);
    return new YMDateRange(new Date(obj.startDate), new Date(obj.endDate));
};
exports.default = YMDateRange;
//# sourceMappingURL=YMDateRange.js.map