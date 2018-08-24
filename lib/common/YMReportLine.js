"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./YMDateRange");
const YMPurpose_1 = require("./YMPurpose");
class YMReportLine {
    constructor(when, purpose, fromTo, vehicle, distanceInMiles, value, parking, tolls) {
        this.when = when;
        this.purpose = purpose;
        this.fromTo = fromTo;
        this.vehicle = vehicle;
        this.distanceInMiles = distanceInMiles;
        this.value = value;
        this.parking = parking;
        this.tolls = tolls;
    }
    static fromDrive(drive, userSettings, globalSettings) {
        return new YMReportLine(new YMDateRange_1.default(drive.startTime, drive.endTime), YMReportLine.getPurposeString(drive.drivePurposeId), `${drive.origin.address.name} -> ${drive.dest.address.name}`, drive.getVehicleName(userSettings), drive.miles, drive.getValue(userSettings, globalSettings), drive.driveNotes.parkingMoney, drive.driveNotes.tollMoney);
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
        return new YMReportLine(new YMDateRange_1.default(undefined, undefined), '', '', '', 0, 0, 0, 0);
    return new YMReportLine(obj.when, obj.purpose, obj.fromTo, obj.vehicle, obj.distanceInMiles, obj.value, obj.parking, obj.tolls);
};
exports.default = YMReportLine;
//# sourceMappingURL=YMReportLine.js.map