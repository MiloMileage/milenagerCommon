"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMPurpose_1 = require("./YMPurpose");
const YMNotificationSetting_1 = require("./YMNotificationSetting");
const YMWorkingHour_1 = require("./YMWorkingHour");
const YMTutorialView_1 = require("./YMTutorialView");
class YMGlobalUserSettings {
    constructor(purposes = [], notificationSettings = [], workingHours = [], irsRates, tutorialViews = []) {
        this.purposes = purposes.map(x => YMPurpose_1.default.fromObject(x));
        this.notificationSettings = notificationSettings.map(x => YMNotificationSetting_1.default.fromObject(x));
        this.workingHours = workingHours.map(x => YMWorkingHour_1.default.fromObject(x));
        this.irsRates = irsRates;
        this.tutorialViews = tutorialViews.map(x => YMTutorialView_1.default.fromObject(x));
    }
    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if (obj == null)
            return new YMGlobalUserSettings([], [], [], new Map(), []);
        return new YMGlobalUserSettings(obj.purposes, obj.notificationSettings, obj.workingHours, obj.irsRates, obj.tutorialViews);
    }
}
exports.default = YMGlobalUserSettings;
//# sourceMappingURL=YMGlobalUserSettings.js.map