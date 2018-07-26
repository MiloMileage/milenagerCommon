"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMVehicle_1 = require("./YMVehicle");
const YMPurpose_1 = require("./YMPurpose");
const YMNotificationSetting_1 = require("./YMNotificationSetting");
const YMPersonalSettings_1 = require("./YMPersonalSettings");
const YMAutoLocationRule_1 = require("./YMAutoLocationRule");
const YMRate_1 = require("./YMRate");
const YMWorkingHour_1 = require("./YMWorkingHour");
class YMUserSettings {
    constructor(vehicles = [], personalRates = [], purposes = [], notificationSettings = [], personalSettings = new YMPersonalSettings_1.default(false, '1'), autoRules = [], workingHours = [], isWorkingHoursEnabled = false, isAutoRulesEnabled = false, isCustomClassificationEnabled = false, customClassifications = []) {
        this.vehicles = vehicles.map(x => YMVehicle_1.default.fromObject(x));
        this.personalRates = personalRates.map(x => YMRate_1.default.fromObject(x));
        this.purposes = purposes.map(x => YMPurpose_1.default.fromObject(x));
        this.notificationSettings = notificationSettings.map(x => YMNotificationSetting_1.default.fromObject(x));
        this.personalSettings = YMPersonalSettings_1.default.fromObject(personalSettings);
        this.autoRules = autoRules.map(x => YMAutoLocationRule_1.default.fromObject(x));
        this.workingHours = workingHours.map(x => YMWorkingHour_1.default.fromObject(x));
        this.isWorkingHoursEnabled = isWorkingHoursEnabled;
        this.isAutoRulesEnabled = isAutoRulesEnabled;
        this.isCustomClassificationEnabled = isCustomClassificationEnabled;
        this.customClassifications = customClassifications;
    }
    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if (obj == null)
            return new YMUserSettings([], [], [], [], YMPersonalSettings_1.default.fromObject(undefined), [], [], false, false, false, []);
        return new YMUserSettings(obj.vehicles, obj.personalRates, obj.purposes, obj.notificationSettings, obj.personalSettings, obj.autoRules, obj.workingHours, obj.isWorkingHoursEnabled, obj.isAutoRulesEnabled, obj.isCustomClassificationEnabled, obj.customClassifications);
    }
    getPurposeCategory(purposeId) {
        let purpose = this.purposes.filter(x => x.purposeId === purposeId)[0];
        if (purpose == null) {
            return '';
        }
        return purpose.category;
    }
}
exports.default = YMUserSettings;
//# sourceMappingURL=YMUserSettings.js.map