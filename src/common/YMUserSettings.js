"use strict";
exports.__esModule = true;
var YMVehicle_1 = require("./YMVehicle");
var YMPurpose_1 = require("./YMPurpose");
var YMNotificationSetting_1 = require("./YMNotificationSetting");
var YMPersonalSettings_1 = require("./YMPersonalSettings");
var YMAutoLocationRule_1 = require("./YMAutoLocationRule");
var YMRate_1 = require("./YMRate");
var YMWorkingHour_1 = require("./YMWorkingHour");
var YMUserSettings = /** @class */ (function () {
    function YMUserSettings(vehicles, personalRates, purposes, notificationSettings, personalSettings, autoRules, workingHours, isWorkingHoursEnabled, isAutoRulesEnabled, isCustomClassificationEnabled, customClassifications, isLocationClassificationEnabled) {
        if (vehicles === void 0) { vehicles = []; }
        if (personalRates === void 0) { personalRates = []; }
        if (purposes === void 0) { purposes = []; }
        if (notificationSettings === void 0) { notificationSettings = []; }
        if (personalSettings === void 0) { personalSettings = new YMPersonalSettings_1["default"](false, '1', undefined); }
        if (autoRules === void 0) { autoRules = []; }
        if (workingHours === void 0) { workingHours = []; }
        if (isWorkingHoursEnabled === void 0) { isWorkingHoursEnabled = false; }
        if (isAutoRulesEnabled === void 0) { isAutoRulesEnabled = true; }
        if (isCustomClassificationEnabled === void 0) { isCustomClassificationEnabled = false; }
        if (customClassifications === void 0) { customClassifications = []; }
        if (isLocationClassificationEnabled === void 0) { isLocationClassificationEnabled = false; }
        this.vehicles = vehicles.map(function (x) { return YMVehicle_1["default"].fromObject(x); });
        this.personalRates = personalRates.map(function (x) { return YMRate_1["default"].fromObject(x); });
        this.purposes = purposes.map(function (x) { return YMPurpose_1["default"].fromObject(x); });
        this.notificationSettings = notificationSettings.map(function (x) { return YMNotificationSetting_1["default"].fromObject(x); });
        this.personalSettings = YMPersonalSettings_1["default"].fromObject(personalSettings);
        this.autoRules = autoRules.map(function (x) { return YMAutoLocationRule_1["default"].fromObject(x); });
        this.workingHours = workingHours.map(function (x) { return YMWorkingHour_1["default"].fromObject(x); });
        this.isWorkingHoursEnabled = isWorkingHoursEnabled;
        this.isAutoRulesEnabled = isAutoRulesEnabled;
        this.isCustomClassificationEnabled = isCustomClassificationEnabled;
        this.customClassifications = customClassifications;
        this.isLocationClassificationEnabled = isLocationClassificationEnabled;
    }
    // tslint:disable-next-line:member-ordering
    YMUserSettings.fromObject = function (obj) {
        if (obj == null)
            return new YMUserSettings([], [], [], [], YMPersonalSettings_1["default"].fromObject(undefined), [], [], false, false, false, [], false);
        return new YMUserSettings(obj.vehicles, obj.personalRates, obj.purposes, obj.notificationSettings, obj.personalSettings, obj.autoRules, obj.workingHours, obj.isWorkingHoursEnabled, obj.isAutoRulesEnabled, obj.isCustomClassificationEnabled, obj.customClassifications, obj.isLocationClassificationEnabled);
    };
    YMUserSettings.prototype.isDriveDetectionEnabled = function () {
        return this.personalSettings.isDriveDetectionEnabled();
    };
    YMUserSettings.prototype.getPrimaryVehicle = function () {
        var primaryVehicle = this.vehicles.filter(function (x) { return x.visible; }).sort(function (x, y) { return y.primaryTime - x.primaryTime; })[0];
        return primaryVehicle === undefined ? '0' : primaryVehicle.vehicleId;
    };
    YMUserSettings.prototype.getPurposeCategory = function (purposeId) {
        var purpose = this.purposes.filter(function (x) { return x.purposeId === purposeId; })[0];
        if (purpose == null) {
            return '';
        }
        return purpose.category;
    };
    return YMUserSettings;
}());
exports["default"] = YMUserSettings;
