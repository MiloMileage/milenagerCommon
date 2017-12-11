"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMWorkingHour {
    constructor(dayOfWeek, startTimeInMinutes, endTimeInMinutes) {
        this.dayOfWeek = dayOfWeek;
        this.startTimeInMinutes = startTimeInMinutes;
        this.endTimeInMinutes = endTimeInMinutes;
    }
    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        return new YMWorkingHour(obj.dayOfWeek, obj.startTimeInMinutes, obj.endTimeInMinutes);
    }
}
exports.default = YMWorkingHour;
//# sourceMappingURL=YMWorkingHour.js.map