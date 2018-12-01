"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./YMDateRange");
const YMPurpose_1 = require("./YMPurpose");
const Common = require("./../components/common");
class YMReportLine {
    constructor(when, purpose, fromTo, fromToPersonalized, vehicle, distanceInMiles, value, parking, tolls) {
        this.when = when;
        this.purpose = purpose;
        this.fromTo = fromTo;
        this.fromToPersonalized = fromToPersonalized;
        this.vehicle = vehicle;
        this.distanceInMiles = distanceInMiles;
        this.value = value;
        this.parking = parking;
        this.tolls = tolls;
    }
    static fromDrive(drive, userSettings, globalSettings, savedLocations) {
        const originPersonal = Common.getPersonalNameIfExist(savedLocations, drive.origin, drive.origin.address.name);
        const destPersonal = Common.getPersonalNameIfExist(savedLocations, drive.dest, drive.dest.address.name);
        const startTime = drive.startTime();
        const endTime = drive.endTime();
        return new YMReportLine(new YMDateRange_1.default(startTime.getFullYear(), startTime.getMonth(), startTime.getDay(), endTime.getFullYear(), endTime.getMonth(), endTime.getDay(), Math.round(drive.timestampOffsetInSeconds / 60)), YMReportLine.getPurposeString(drive.drivePurposeId), `${drive.origin.address.name} -> ${drive.dest.address.name}`, `${originPersonal} -> ${destPersonal}`, drive.getVehicleName(userSettings), Common.milesToMetric(drive.miles, userSettings.personalSettings.isMetricSystem), Common.roundNumber(drive.getValue(userSettings, globalSettings)), Common.roundNumber(drive.driveNotes.parkingMoney), Common.roundNumber(drive.driveNotes.tollMoney));
    }
    static getPurposeString(purposeId) {
        switch (purposeId) {
            case YMPurpose_1.default.defaultPuposesIds.business:
                return 'Business to Business';
            case YMPurpose_1.default.defaultPuposesIds.charity:
                return 'Charity';
            case YMPurpose_1.default.defaultPuposesIds.medical:
                return 'Medical';
            case YMPurpose_1.default.defaultPuposesIds.moving:
                return 'Moving';
            case YMPurpose_1.default.defaultPuposesIds.personal:
                return 'Personal to Personal';
            default:
                return '';
        }
    }
}
// tslint:disable-next-line:member-ordering
YMReportLine.fromObject = function (obj) {
    if (obj == null)
        return new YMReportLine(YMDateRange_1.default.fromObject(undefined), '', '', '', '', 0, 0, 0, 0);
    return new YMReportLine(obj.when, obj.purpose, obj.fromTo, obj.fromToPersonalized, obj.vehicle, obj.distanceInMiles, obj.value, obj.parking, obj.tolls);
};
exports.default = YMReportLine;
//# sourceMappingURL=YMReportLine.js.map