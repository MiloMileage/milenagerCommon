"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMPurpose_1 = require("./YMPurpose");
const YMNotificationSetting_1 = require("./YMNotificationSetting");
const YMWorkingHour_1 = require("./YMWorkingHour");
class YMGlobalUserSettings {
    constructor(purposes = [], notificationSettings = [], workingHours = [], irsRates, tutorialContainers, caRates, auRates, ukRates) {
        this.purposes = purposes.map(x => YMPurpose_1.default.fromObject(x));
        this.notificationSettings = notificationSettings.map(x => YMNotificationSetting_1.default.fromObject(x));
        this.workingHours = workingHours.map(x => YMWorkingHour_1.default.fromObject(x));
        this.irsRates = irsRates;
        this.tutorialContainers = tutorialContainers;
        this.caRates = caRates;
        this.auRates = auRates;
        this.ukRates = ukRates;
    }
    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if (obj == null)
            return new YMGlobalUserSettings([], [], [], {}, {}, {}, {}, {});
        return new YMGlobalUserSettings(obj.purposes, obj.notificationSettings, obj.workingHours, obj.irsRates, obj.tutorialContainers, obj.caRates, obj.auRates, obj.ukRates);
    }
}
exports.default = YMGlobalUserSettings;
//# sourceMappingURL=YMGlobalUserSettings.js.map