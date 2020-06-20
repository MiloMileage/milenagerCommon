"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMVehicle_1 = require("./YMVehicle");
const YMPurpose_1 = require("./YMPurpose");
const YMNotificationSetting_1 = require("./YMNotificationSetting");
const YMPersonalSettings_1 = require("./YMPersonalSettings");
const YMAutoLocationRule_1 = require("./YMAutoLocationRule");
const YMRate_1 = require("./YMRate");
const YMWorkingHour_1 = require("./YMWorkingHour");
var YMCountry;
(function (YMCountry) {
    YMCountry["US"] = "US";
    YMCountry["CA"] = "CA";
    YMCountry["AU"] = "AU";
    YMCountry["UK"] = "UK";
    YMCountry["UNKNOWN"] = "UNKNOWN";
    YMCountry["CUSTOME"] = "CUSTOME";
})(YMCountry = exports.YMCountry || (exports.YMCountry = {}));
class YMUserSettings {
    constructor(vehicles = [], personalRates = [], purposes = [], notificationSettings = [], personalSettings = new YMPersonalSettings_1.default(false, '1', undefined), autoRules = [], workingHours = [], isWorkingHoursEnabled = false, isAutoRulesEnabled = true, isCustomClassificationEnabled = false, customClassifications = [], isLocationClassificationEnabled = false, country = YMCountry.CUSTOME, expenseCategories = [], incomeSources = []) {
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
        this.isLocationClassificationEnabled = isLocationClassificationEnabled;
        this.country = country ? country : YMCountry.CUSTOME;
        this.expenseCategories = expenseCategories;
        this.incomeSources = incomeSources;
    }
    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if (obj == null)
            return new YMUserSettings([], [], [], [], YMPersonalSettings_1.default.fromObject(undefined), [], [], false, false, false, [], false, undefined, [], []);
        return new YMUserSettings(obj.vehicles, obj.personalRates, obj.purposes, obj.notificationSettings, obj.personalSettings, obj.autoRules, obj.workingHours, obj.isWorkingHoursEnabled, obj.isAutoRulesEnabled, obj.isCustomClassificationEnabled, obj.customClassifications, obj.isLocationClassificationEnabled, obj.country, obj.expenseCategories, obj.incomeSources);
    }
    isDriveDetectionEnabled() {
        return this.personalSettings.isDriveDetectionEnabled();
    }
    getPrimaryVehicle() {
        const primaryVehicle = this.vehicles.filter(x => x.visible).sort((x, y) => y.primaryTime - x.primaryTime)[0];
        return primaryVehicle === undefined ? '0' : primaryVehicle.vehicleId;
    }
    getPurposeCategory(purposeId) {
        const purpose = this.purposes.filter(x => x.purposeId === purposeId)[0];
        if (purpose == null) {
            return '';
        }
        return purpose.category;
    }
}
exports.default = YMUserSettings;
//# sourceMappingURL=YMUserSettings.js.map