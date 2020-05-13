"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMLocation_1 = require("./YMLocation");
const YMDriveNotes_1 = require("./YMDriveNotes");
const YMPurpose_1 = require("./YMPurpose");
const YMRate_1 = require("./YMRate");
class YMDrive {
    constructor(driveId, vehicleId, drivePurposeId, miles, origin, dest, driveNotes, isVisible = true, isDeleted = false, 
    // tslint:disable-next-line:variable-name
    joinedFromIds = [], obj_db_id, lastUpdated, startTimeTimestampUtc, endTimeTimestampUtc, timestampOffsetInSeconds, routeLocations = [], isManual = false, deletionReason = '', isAutoWorkHours = false, isAutoLocation = false, signalSource = 'unknown', didApplyDefaults = false) {
        this.startTime = () => {
            return new Date().getTimezoneOffset() === 0 ? this.startTimeInUtcEnv() : new Date(this.startTimeTimestampUtc * 1000);
        };
        this.endTime = () => {
            return new Date().getTimezoneOffset() === 0 ? this.endTimeInUtcEnv() : new Date(this.endTimeTimestampUtc * 1000);
        };
        this.getStartTimeLocal = () => {
            return new Date((this.startTimeTimestampUtc + (new Date().getTimezoneOffset() * 60 + this.timestampOffsetInSeconds)) * 1000);
        };
        this.getEndTimeLocal = () => {
            return new Date((this.endTimeTimestampUtc + (new Date().getTimezoneOffset() * 60 + this.timestampOffsetInSeconds)) * 1000);
        };
        this.startTimeInUtcEnv = () => {
            const d = new Date(this.startTimeTimestampUtc * 1000);
            d.setTime(d.getTime() + (this.timestampOffsetInSeconds === undefined ? new Date().getTimezoneOffset() : this.timestampOffsetInSeconds) * 1000);
            return d;
        };
        this.endTimeInUtcEnv = () => {
            const d = new Date(this.endTimeTimestampUtc * 1000);
            d.setTime(d.getTime() + (this.timestampOffsetInSeconds === undefined ? new Date().getTimezoneOffset() : this.timestampOffsetInSeconds) * 1000);
            return d;
        };
        this.setPurposeId = (purposeId) => {
            this.drivePurposeId = purposeId;
            this.isClassified = this.drivePurposeId !== YMPurpose_1.default.defaultPuposesIds.undetermined;
        };
        this.getVehicle = (userSettings) => {
            return userSettings.vehicles.filter(v => v.vehicleId === this.vehicleId)[0];
        };
        this.getVehicleName = (userSettings) => {
            const vehicle = this.getVehicle(userSettings);
            return vehicle === undefined ? '' : vehicle.nickName;
        };
        this.getPurpose = (userSettings, globalSettings) => {
            const purposeFromUserSettings = userSettings.purposes.filter(p => p.purposeId === this.drivePurposeId);
            if (purposeFromUserSettings.length > 0) {
                return purposeFromUserSettings[0];
            }
            return globalSettings.purposes.filter(p => p.purposeId === this.drivePurposeId)[0];
        };
        this.getValue = (userSettings, globalSettings) => {
            return this.drivePurposeId === YMPurpose_1.default.defaultPuposesIds.undetermined ? 0 : YMRate_1.default.getRateForPurposeId(this.drivePurposeId, userSettings, globalSettings, this) * this.miles;
        };
        this.driveId = driveId;
        this.vehicleId = vehicleId;
        this.drivePurposeId = drivePurposeId;
        this.miles = miles;
        this.origin = YMLocation_1.default.fromObject(origin);
        this.dest = YMLocation_1.default.fromObject(dest);
        this.driveNotes = YMDriveNotes_1.default.fromObject(driveNotes);
        this.isVisible = isVisible;
        this.isDeleted = isDeleted;
        this.joinedFromIds = joinedFromIds;
        this.obj_db_id = obj_db_id;
        this.lastUpdated = lastUpdated;
        this.startTimeTimestampUtc = startTimeTimestampUtc;
        this.endTimeTimestampUtc = endTimeTimestampUtc;
        this.timestampOffsetInSeconds = timestampOffsetInSeconds;
        this.routeLocations = routeLocations;
        this.isManual = isManual;
        this.isClassified = drivePurposeId !== YMPurpose_1.default.defaultPuposesIds.undetermined;
        this.deletionReason = deletionReason;
        this.isAutoWorkHours = isAutoWorkHours;
        this.isAutoLocation = isAutoLocation;
        this.signalSource = signalSource;
        this.didApplyDefaults = didApplyDefaults;
    }
}
exports.default = YMDrive;
YMDrive.fromObject = function (obj) {
    if (obj == null)
        return new YMDrive('', '', '', 0, YMLocation_1.default.fromObject(undefined), YMLocation_1.default.fromObject(undefined), YMDriveNotes_1.default.fromObject(undefined), false, false, [], '', 0, 0, 0, 0, [], false, '', false, false);
    // tslint:disable-next-line:max-line-length
    return new YMDrive(obj.driveId, obj.vehicleId, obj.drivePurposeId, obj.miles, obj.origin, obj.dest, obj.driveNotes, obj.isVisible, obj.isDeleted, obj.joinedFromIds, obj.obj_db_id, obj.lastUpdated, obj.startTimeTimestampUtc, obj.endTimeTimestampUtc, obj.timestampOffsetInSeconds, obj.routeLocations, obj.isManual, obj.deletionReason, obj.isAutoWorkHours, obj.isAutoLocation, obj.signalSource, obj.didApplyDefaults);
};
YMDrive.getUniqueDriveArray = (drives) => {
    const set = new Set();
    const uniqueDrives = new Array();
    drives.forEach(d => {
        if (!set.has(d.driveId)) {
            uniqueDrives.push(d);
            set.add(d.driveId);
        }
    });
    return uniqueDrives;
};
YMDrive.smartConcatDrivesArray = (drives1, drives2) => {
    const drives = new Array();
    let i = 0;
    let j = 0;
    while (i < drives1.length || j < drives2.length) {
        if (i >= drives1.length) {
            drives.push(drives2[j]);
            j++;
            continue;
        }
        if (j >= drives2.length) {
            drives.push(drives1[i]);
            i++;
            continue;
        }
        const drive1 = drives1[i];
        const drive2 = drives2[j];
        if (drive1.startTimeTimestampUtc > drive2.startTimeTimestampUtc) {
            drives.push(drive1);
            i++;
            continue;
        }
        drives.push(drive2);
        j++;
    }
    return drives;
};
//# sourceMappingURL=YMDrive.js.map