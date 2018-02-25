"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMDateRange {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
// tslint:disable-next-line:member-ordering
YMDateRange.fromObject = function (obj) {
    if (obj == null)
        return new YMDateRange(new Date, new Date);
    return new YMDateRange(obj.startDate, obj.endDate);
};
exports.default = YMDateRange;
//# sourceMappingURL=YMDateRange.js.map