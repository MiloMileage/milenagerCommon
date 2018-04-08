"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDrive_1 = require("./YMDrive");
const YMSavedLocation_1 = require("./YMSavedLocation");
const YMUserSettings_1 = require("./YMUserSettings");
const YMRateIRS_1 = require("./YMRateIRS");
const YMDateRange_1 = require("./YMDateRange");
class YMUserData {
    // selectedDrivesIds: Array<string>
    // filterSearch: string
    constructor(drives = [], savedLocations = new Map(), rates = new Map(), userSettings = new YMUserSettings_1.default(), globalSettings = new YMUserSettings_1.default(), dateRange = new YMDateRange_1.default(undefined, undefined), loading = false) {
        this.drives = drives.map(x => YMDrive_1.default.fromObject(x));
        for (const key in savedLocations) {
            savedLocations[key] = YMSavedLocation_1.default.fromObject(savedLocations[key]);
        }
        this.savedLocations = savedLocations;
        for (const key in rates) {
            rates[key] = YMRateIRS_1.default.fromObject(rates[key]);
        }
        this.rates = rates;
        this.userSettings = YMUserSettings_1.default.fromObject(userSettings);
        this.globalSettings = YMUserSettings_1.default.fromObject(globalSettings);
        this.dateRange = dateRange;
        this.loading = loading;
    }
    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if (obj == null)
            return new YMUserData([], new Map(), new Map(), YMUserSettings_1.default.fromObject(undefined), YMUserSettings_1.default.fromObject(undefined));
        return new YMUserData(obj.drives, obj.savedLocations, obj.rates, obj.userSettings, obj.globalSettings, obj.dateRange, obj.loading);
    }
}
exports.default = YMUserData;
//# sourceMappingURL=YMUserData.js.map