"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMPurpose_1 = require("./YMPurpose");
const Common = require("./../components/common");
const YMRate_1 = require("./YMRate");
class YMReportLine {
    constructor(when, purpose, rate, fromTo, fromToPersonalized, vehicle, distanceInMiles, value, parking, tolls) {
        this.when = when;
        this.purpose = purpose;
        this.rate = rate;
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
        const purposes = YMPurpose_1.default.mergePuprosesArrays(userSettings.purposes, globalSettings.purposes, false);
        // If drive is unclassified its purpose id is -1 and the purpose will be the default purpose
        const purpose = YMPurpose_1.default.fromObject(purposes.filter(x => x.purposeId === drive.drivePurposeId)[0]);
        return new YMReportLine(drive.startTime(), YMReportLine.getPurposeString(purpose, drive), YMRate_1.default.getRateForPurposeId(purpose.purposeId, userSettings, globalSettings), `${drive.origin.address.name} -> ${drive.dest.address.name}`, `${originPersonal} -> ${destPersonal}`, drive.getVehicleName(userSettings), Common.milesToMetric(drive.miles, userSettings.personalSettings.isMetricSystem), Common.roundNumber(drive.getValue(userSettings, globalSettings)), Common.roundNumber(drive.driveNotes.parkingMoney), Common.roundNumber(drive.driveNotes.tollMoney));
    }
    static getPurposeString(purpose, drive) {
        if (drive.isAutoLocation) {
            return purpose.purposeId === YMPurpose_1.default.defaultPuposesIds.business ? 'Business to Business' : 'Personal to Personal';
        }
        if (drive.isAutoWorkHours) {
            return 'Outside working hours';
        }
        return purpose.name;
    }
}
exports.default = YMReportLine;
// tslint:disable-next-line:member-ordering
YMReportLine.fromObject = function (obj) {
    if (obj == null)
        return new YMReportLine(new Date(), '', 0, '', '', '', 0, 0, 0, 0);
    return new YMReportLine(obj.when, obj.purpose, obj.rate, obj.fromTo, obj.fromToPersonalized, obj.vehicle, obj.distanceInMiles, obj.value, obj.parking, obj.tolls);
};
//# sourceMappingURL=YMReportLine.js.map