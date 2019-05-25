"use strict";
exports.__esModule = true;
var YMOdometerRead = /** @class */ (function () {
    function YMOdometerRead(year, read) {
        if (year === void 0) { year = new Date().getFullYear(); }
        if (read === void 0) { read = 0; }
        this.year = year;
        this.read = read;
    }
    // tslint:disable-next-line:member-ordering
    YMOdometerRead.fromObject = function (obj) {
        if (obj == null)
            return new YMOdometerRead(0, 0);
        return new YMOdometerRead(obj.year, obj.read);
    };
    return YMOdometerRead;
}());
exports["default"] = YMOdometerRead;
