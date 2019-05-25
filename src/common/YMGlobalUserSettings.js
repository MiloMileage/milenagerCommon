"use strict";
exports.__esModule = true;
var YMPurpose_1 = require("./YMPurpose");
var YMNotificationSetting_1 = require("./YMNotificationSetting");
var YMWorkingHour_1 = require("./YMWorkingHour");
var YMGlobalUserSettings = /** @class */ (function () {
    function YMGlobalUserSettings(purposes, notificationSettings, workingHours, irsRates, tutorialContainers) {
        if (purposes === void 0) { purposes = []; }
        if (notificationSettings === void 0) { notificationSettings = []; }
        if (workingHours === void 0) { workingHours = []; }
        this.purposes = purposes.map(function (x) { return YMPurpose_1["default"].fromObject(x); });
        this.notificationSettings = notificationSettings.map(function (x) { return YMNotificationSetting_1["default"].fromObject(x); });
        this.workingHours = workingHours.map(function (x) { return YMWorkingHour_1["default"].fromObject(x); });
        this.irsRates = irsRates;
        this.tutorialContainers = tutorialContainers;
    }
    // tslint:disable-next-line:member-ordering
    YMGlobalUserSettings.fromObject = function (obj) {
        if (obj == null)
            return new YMGlobalUserSettings([], [], [], {}, {});
        return new YMGlobalUserSettings(obj.purposes, obj.notificationSettings, obj.workingHours, obj.irsRates, obj.tutorialContainers);
    };
    return YMGlobalUserSettings;
}());
exports["default"] = YMGlobalUserSettings;
