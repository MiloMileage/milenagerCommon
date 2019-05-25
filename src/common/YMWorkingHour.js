"use strict";
exports.__esModule = true;
var YMWorkingHour = /** @class */ (function () {
    function YMWorkingHour(dayOfWeek, startTimeInMinutes, endTimeInMinutes, workHourId) {
        this.dayOfWeek = dayOfWeek;
        this.startTimeInMinutes = startTimeInMinutes;
        this.endTimeInMinutes = endTimeInMinutes;
        this.workHourId = workHourId;
    }
    // tslint:disable-next-line:member-ordering
    YMWorkingHour.fromObject = function (obj) {
        if (obj == null)
            return new YMWorkingHour(0, 0, 0, '');
        return new YMWorkingHour(obj.dayOfWeek, obj.startTimeInMinutes, obj.endTimeInMinutes, obj.workHourId);
    };
    return YMWorkingHour;
}());
exports["default"] = YMWorkingHour;
