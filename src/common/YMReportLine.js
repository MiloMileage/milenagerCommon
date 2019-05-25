"use strict";
exports.__esModule = true;
var YMDateRange_1 = require("./YMDateRange");
var YMPurpose_1 = require("./YMPurpose");
var Common = require("./../components/common");
var YMReportLine = /** @class */ (function () {
    function YMReportLine(when, purpose, fromTo, fromToPersonalized, vehicle, distanceInMiles, value, parking, tolls) {
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
    YMReportLine.fromDrive = function (drive, userSettings, globalSettings, savedLocations) {
        var originPersonal = Common.getPersonalNameIfExist(savedLocations, drive.origin, drive.origin.address.name);
        var destPersonal = Common.getPersonalNameIfExist(savedLocations, drive.dest, drive.dest.address.name);
        var startTime = drive.startTime();
        var endTime = drive.endTime();
        return new YMReportLine(new YMDateRange_1["default"](startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), Math.round(drive.timestampOffsetInSeconds / 60)), YMReportLine.getPurposeString(drive.drivePurposeId), drive.origin.address.name + " -> " + drive.dest.address.name, originPersonal + " -> " + destPersonal, drive.getVehicleName(userSettings), Common.milesToMetric(drive.miles, userSettings.personalSettings.isMetricSystem), Common.roundNumber(drive.getValue(userSettings, globalSettings)), Common.roundNumber(drive.driveNotes.parkingMoney), Common.roundNumber(drive.driveNotes.tollMoney));
    };
    YMReportLine.getPurposeString = function (purposeId) {
        switch (purposeId) {
            case YMPurpose_1["default"].defaultPuposesIds.business:
                return 'Business to Business';
            case YMPurpose_1["default"].defaultPuposesIds.charity:
                return 'Charity';
            case YMPurpose_1["default"].defaultPuposesIds.medical:
                return 'Medical';
            case YMPurpose_1["default"].defaultPuposesIds.moving:
                return 'Moving';
            case YMPurpose_1["default"].defaultPuposesIds.personal:
                return 'Personal to Personal';
            default:
                return '';
        }
    };
    // tslint:disable-next-line:member-ordering
    YMReportLine.fromObject = function (obj) {
        if (obj == null)
            return new YMReportLine(YMDateRange_1["default"].fromObject(undefined), '', '', '', '', 0, 0, 0, 0);
        return new YMReportLine(obj.when, obj.purpose, obj.fromTo, obj.fromToPersonalized, obj.vehicle, obj.distanceInMiles, obj.value, obj.parking, obj.tolls);
    };
    return YMReportLine;
}());
exports["default"] = YMReportLine;
