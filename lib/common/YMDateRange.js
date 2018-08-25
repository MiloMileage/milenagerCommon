"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
class YMDateRange {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
    isEqualTo(anotherDateRange) {
        return YMDateRange.compareDates(this.startDate, anotherDateRange.startDate) && YMDateRange.compareDates(this.endDate, anotherDateRange.endDate);
    }
    isMonthRange() {
        return Moment(this.startDate).date() === 1 &&
            Moment(this.endDate).date() === Moment(this.startDate).endOf('month').date() &&
            Moment(this.startDate).month() === Moment(this.endDate).month();
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