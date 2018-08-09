"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./../../common/YMDateRange");
const YMPurpose_1 = require("./../../common/YMPurpose");
const YMRate_1 = require("./../../common/YMRate");
class YMDriveSummaryResponse {
    constructor(drivesCount, earned, potential, loggedMiles, totalMiles, dateRange, parkingMoney, tollsMoney) {
        this.drivesCount = drivesCount;
        this.earned = earned;
        this.potential = potential;
        this.loggedMiles = loggedMiles;
        this.totalMiles = totalMiles;
        this.dateRange = dateRange;
        this.parkingMoney = parkingMoney;
        this.tollMoney = tollsMoney;
    }
    addDriveValue(drive, userSettings, globalSettings) {
        if (drive.drivePurposeId !== YMPurpose_1.default.defaultPuposesIds.undetermined) {
            this.earned += drive.miles * YMRate_1.default.getRateForPurposeId(drive.drivePurposeId, userSettings, globalSettings, drive);
            this.loggedMiles += drive.miles;
        }
        else {
            this.potential += drive.miles * YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.business, userSettings, globalSettings, drive);
        }
        this.totalMiles += drive.miles;
        this.parkingMoney += drive.driveNotes.parkingMoney;
        this.tollMoney += drive.driveNotes.tollMoney;
        if (this.drivesCount[drive.drivePurposeId] === undefined) {
            this.drivesCount[drive.drivePurposeId] = 1;
        }
        else {
            this.drivesCount[drive.drivePurposeId] += 1;
        }
    }
    reduceDriveValue(drive, userSettings, globalSettings) {
        if (drive.drivePurposeId !== YMPurpose_1.default.defaultPuposesIds.undetermined) {
            this.earned -= drive.miles * YMRate_1.default.getRateForPurposeId(drive.drivePurposeId, userSettings, globalSettings, drive);
            this.loggedMiles -= drive.miles;
        }
        else {
            this.potential -= drive.miles * YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.business, userSettings, globalSettings, drive);
        }
        this.totalMiles -= drive.miles;
        this.parkingMoney -= drive.driveNotes.parkingMoney;
        this.tollMoney -= drive.driveNotes.tollMoney;
        this.drivesCount[drive.drivePurposeId] -= 1;
    }
}
// tslint:disable-next-line:member-ordering
YMDriveSummaryResponse.fromObject = function (obj) {
    if (obj == null)
        return new YMDriveSummaryResponse({}, 0, 0, 0, 0, YMDateRange_1.default.fromObject({}), 0, 0);
    return new YMDriveSummaryResponse(obj.drivesCount, obj.earned, obj.potential, obj.loggedMiles, obj.totalMiles, obj.dateRange, obj.parkingMoney, obj.tollMoney);
};
exports.default = YMDriveSummaryResponse;
//# sourceMappingURL=YMDriveSummaryResponse.js.map