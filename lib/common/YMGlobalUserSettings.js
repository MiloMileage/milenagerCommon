"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMPurpose_1 = require("./YMPurpose");
const YMNotificationSetting_1 = require("./YMNotificationSetting");
const YMWorkingHour_1 = require("./YMWorkingHour");
const YMRate_1 = require("./YMRate");
class YMGlobalUserSettings {
    constructor(purposes = [], notificationSettings = [], workingHours = [], irsRates, tutorialContainers, caRates, auRates, ukRates, expenseCategories = [], incomeSources = []) {
        this.purposes = purposes.map(x => YMPurpose_1.default.fromObject(x));
        this.notificationSettings = notificationSettings.map(x => YMNotificationSetting_1.default.fromObject(x));
        this.workingHours = workingHours.map(x => YMWorkingHour_1.default.fromObject(x));
        this.irsRates = irsRates;
        this.tutorialContainers = tutorialContainers;
        this.caRates = caRates;
        for (const year in this.caRates) {
            for (const businessType in this.caRates[year]) {
                this.caRates[year][businessType] = YMRate_1.default.fromObject(this.caRates[year][businessType]);
            }
        }
        this.auRates = auRates;
        for (const year in this.auRates) {
            for (const businessType in this.auRates[year]) {
                this.auRates[year][businessType] = YMRate_1.default.fromObject(this.auRates[year][businessType]);
            }
        }
        this.ukRates = ukRates;
        for (const year in this.ukRates) {
            for (const businessType in this.ukRates[year]) {
                this.ukRates[year][businessType] = YMRate_1.default.fromObject(this.ukRates[year][businessType]);
            }
        }
        this.expenseCategories = expenseCategories;
        this.incomeSources = incomeSources;
    }
    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if (obj == null)
            return new YMGlobalUserSettings([], [], [], {}, {}, {}, {}, {}, [], []);
        return new YMGlobalUserSettings(obj.purposes, obj.notificationSettings, obj.workingHours, obj.irsRates, obj.tutorialContainers, obj.caRates, obj.auRates, obj.ukRates, obj.expenseCategories, obj.incomeSources);
    }
}
exports.default = YMGlobalUserSettings;
//# sourceMappingURL=YMGlobalUserSettings.js.map