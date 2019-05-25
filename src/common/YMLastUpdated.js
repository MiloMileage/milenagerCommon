"use strict";
exports.__esModule = true;
var YMLastUpdated = /** @class */ (function () {
    // tslint:disable-next-line:max-line-length
    function YMLastUpdated(driveUpdatedTimestamp) {
        this.driveUpdatedTimestamp = driveUpdatedTimestamp;
    }
    // tslint:disable-next-line:member-ordering
    YMLastUpdated.fromObject = function (obj) {
        if (obj == null)
            return new YMLastUpdated(new Date().getTime());
        // tslint:disable-next-line:max-line-length
        return new YMLastUpdated(obj.driveUpdatedTimestamp);
    };
    return YMLastUpdated;
}());
exports["default"] = YMLastUpdated;
