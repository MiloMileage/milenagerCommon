"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMLocation_1 = require("./YMLocation");
const YMDriveNotes_1 = require("./YMDriveNotes");
const YMPurpose_1 = require("./YMPurpose");
class YMDrive {
    constructor(driveId, autoClassifiedRuleId, reportIds, vehicleId, drivePurposeId, miles, origin, dest, startTime, endTime, driveNotes, isVisible = true, isDeleted = false, 
        // tslint:disable-next-line:variable-name
        joinedFromIds = [], obj_db_id, lastUpdated, startTimeTimestampUtc, endTimeTimestampUtc, timestampOffsetInSeconds, routeLocations = [], isManual = false, deletionReason = '') {
        this.setPurposeId = (purposeId) => {
            this.drivePurposeId = purposeId;
            this.isClassified = this.drivePurposeId !== YMPurpose_1.default.defaultPuposesIds.undetermined;
        };
        this.driveId = driveId;
        this.autoClassifiedRuleId = autoClassifiedRuleId;
        this.reportIds = reportIds;
        this.vehicleId = vehicleId;
        this.drivePurposeId = drivePurposeId;
        this.miles = miles;
        this.origin = YMLocation_1.default.fromObject(origin);
        this.dest = YMLocation_1.default.fromObject(dest);
        this.startTime = startTime;
        this.endTime = endTime;
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
    }
}
YMDrive.fromObject = function (obj) {
    if (obj == null)
        return new YMDrive('', '', [], '', '', 0, YMLocation_1.default.fromObject(undefined), YMLocation_1.default.fromObject(undefined), new Date, new Date, YMDriveNotes_1.default.fromObject(undefined), false, false, [], '', 0, 0, 0, 0, [], false, '');
    // tslint:disable-next-line:max-line-length
    return new YMDrive(obj.driveId, obj.autoClassifiedRuleId, obj.reportIds, obj.vehicleId, obj.drivePurposeId, obj.miles, obj.origin, obj.dest, obj.startTime, obj.endTime, obj.driveNotes, obj.isVisible, obj.isDeleted, obj.joinedFromIds, obj.obj_db_id, new Date().getTime(), obj.startTimeTimestampUtc, obj.endTimeTimestampUtc, obj.timestampOffsetInSeconds, obj.routeLocations, obj.isManual, obj.deletionReason);
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
exports.default = YMDrive;
//# sourceMappingURL=YMDrive.js.map