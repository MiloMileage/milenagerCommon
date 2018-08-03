"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMWorkingHour {
    constructor(dayOfWeek, startTimeInMinutes, endTimeInMinutes, workHourId) {
        this.dayOfWeek = dayOfWeek;
        this.startTimeInMinutes = startTimeInMinutes;
        this.endTimeInMinutes = endTimeInMinutes;
        this.workHourId = workHourId;
    }
    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if (obj == null)
            return new YMWorkingHour(0, 0, 0, '');
        return new YMWorkingHour(obj.dayOfWeek, obj.startTimeInMinutes, obj.endTimeInMinutes, obj.workHourId);
    }
}
exports.default = YMWorkingHour;
//# sourceMappingURL=YMWorkingHour.js.map