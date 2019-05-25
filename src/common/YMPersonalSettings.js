"use strict";
exports.__esModule = true;
var Moment = require("moment");
var YMPersonalSettings = /** @class */ (function () {
    function YMPersonalSettings(isMetricSystem, monitoringLevel, monitorFromTimestamp) {
        this.isMetricSystem = isMetricSystem;
        this.monitoringLevel = monitoringLevel === undefined ? '1' : monitoringLevel;
        this.monitorFromTimestamp = monitorFromTimestamp === undefined ? Moment.utc().add(-1, 'day').toDate().getTime() : monitorFromTimestamp;
    }
    YMPersonalSettings.prototype.isDriveDetectionEnabled = function () {
        return this.monitorFromTimestamp < new Date().getTime();
    };
    // tslint:disable-next-line:member-ordering
    YMPersonalSettings.flipMetric = function (curr) {
        return new YMPersonalSettings(!curr.isMetricSystem, curr.monitoringLevel, curr.monitorFromTimestamp);
    };
    // tslint:disable-next-line:member-ordering
    YMPersonalSettings.fromObject = function (obj) {
        if (obj == null)
            return new YMPersonalSettings(false, '', Moment.utc().add(-1, 'day').toDate().getTime());
        return new YMPersonalSettings(obj.isMetricSystem, obj.monitoringLevel, obj.monitorFromTimestamp);
    };
    return YMPersonalSettings;
}());
exports["default"] = YMPersonalSettings;
