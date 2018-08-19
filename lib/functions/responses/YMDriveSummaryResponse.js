"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./../../common/YMDateRange");
const YMDriveWeight_1 = require("./YMDriveWeight");
const YMPurpose_1 = require("./../../common/YMPurpose");
const YMRate_1 = require("./../../common/YMRate");
class YMDriveSummaryResponse {
    constructor(drivesCount, earned, potential, loggedMiles, totalMiles, dateRange, parkingMoney, tollsMoney, driveWeights, lastUpdated) {
        this.drivesCount = drivesCount;
        this.earned = earned;
        this.potential = potential;
        this.loggedMiles = loggedMiles;
        this.totalMiles = totalMiles;
        this.dateRange = YMDateRange_1.default.fromObject(dateRange);
        this.parkingMoney = parkingMoney;
        this.tollMoney = tollsMoney;
        this.driveWeights = driveWeights;
        this.lastUpdated = lastUpdated;
    }
    getClassifiedDrivesCount() {
        return Object.keys(this.drivesCount).map(key => YMPurpose_1.default.defaultPuposesIds.undetermined === key ? 0 : this.drivesCount[key])
            .reduce((total, num) => total + num, 0);
    }
    getTotalDrivesCount() {
        return Object.keys(this.drivesCount).map(key => this.drivesCount[key])
            .reduce((total, num) => total + num, 0);
    }
    reduceDriveWeight(driveWeight) {
        this.earned -= driveWeight.earned;
        this.potential -= driveWeight.potential;
        if (this.drivesCount[driveWeight.drivesPurposeId] !== undefined) {
            this.drivesCount[driveWeight.drivesPurposeId] -= 1;
        }
        this.loggedMiles -= driveWeight.loggedMiles;
        this.parkingMoney -= driveWeight.parkingMoney;
        this.tollMoney -= driveWeight.tollMoney;
        this.totalMiles -= driveWeight.totalMiles;
        this.driveWeights[driveWeight.driveId] = undefined;
    }
    reduceDriveWeightFromDriveId(driveId) {
        const driveWeight = this.driveWeights[driveId];
        if (driveWeight !== undefined) {
            this.reduceDriveWeight(driveWeight);
        }
    }
    addDriveValue(drive, userSettings, globalSettings) {
        const driveWeight = YMDriveWeight_1.default.fromObject(undefined);
        if (drive.drivePurposeId !== YMPurpose_1.default.defaultPuposesIds.undetermined) {
            driveWeight.earned = drive.miles * YMRate_1.default.getRateForPurposeId(drive.drivePurposeId, userSettings, globalSettings, drive);
            this.earned += driveWeight.earned;
            driveWeight.loggedMiles = drive.miles;
            this.loggedMiles += drive.miles;
        }
        else {
            driveWeight.potential = drive.miles * YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.business, userSettings, globalSettings, drive);
            this.potential += driveWeight.potential;
        }
        driveWeight.totalMiles = drive.miles;
        driveWeight.parkingMoney = drive.driveNotes.parkingMoney;
        driveWeight.tollMoney += drive.driveNotes.tollMoney;
        this.totalMiles += driveWeight.totalMiles;
        this.parkingMoney += driveWeight.parkingMoney;
        this.tollMoney += driveWeight.tollMoney;
        if (this.drivesCount[drive.drivePurposeId] === undefined) {
            this.drivesCount[drive.drivePurposeId] = 1;
        }
        else {
            this.drivesCount[drive.drivePurposeId] += 1;
        }
        driveWeight.drivesPurposeId = drive.drivePurposeId;
        driveWeight.driveId = drive.driveId;
        this.driveWeights[driveWeight.driveId] = driveWeight;
        this.lastUpdated = drive.lastUpdated;
    }
    reduceDriveValue(drive, userSettings, globalSettings) {
        this.reduceDriveWeightFromDriveId(drive.driveId);
    }
    static getMonthlyIdFromDate(date) {
        return `${new Date(date).getFullYear()}_${new Date(date).getMonth()}`;
    }
    static getMonthlyIdFromDateRange(dateRange) {
        if (dateRange.isMonthRange()) {
            return `${new Date(dateRange.startDate).getFullYear()}_${new Date(dateRange.startDate).getMonth()}`;
        }
        return undefined;
    }
}
// tslint:disable-next-line:member-ordering
YMDriveSummaryResponse.fromObject = function (obj) {
    if (obj == null)
        return new YMDriveSummaryResponse({}, 0, 0, 0, 0, YMDateRange_1.default.fromObject({}), 0, 0, {}, 0);
    return new YMDriveSummaryResponse(obj.drivesCount, obj.earned, obj.potential, obj.loggedMiles, obj.totalMiles, obj.dateRange, obj.parkingMoney, obj.tollMoney, obj.driveWeights, obj.lastUpdated);
};
exports.default = YMDriveSummaryResponse;
//# sourceMappingURL=YMDriveSummaryResponse.js.map