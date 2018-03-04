"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMLocation_1 = require("./YMLocation");
const YMDriveNotes_1 = require("./YMDriveNotes");
const common_1 = require("./../store/common");
class YMDrive {
    constructor(driveId, autoClassifiedRuleId, reportIds, vehicleId, drivePurposeId, miles, origin, dest, startTime, endTime, driveNotes, isVisible = true, isDeleted = false, 
        // tslint:disable-next-line:variable-name
        joinedFromIds = [], obj_db_id, lastUpdated, startTimeTimestampUtc, endTimeTimestampUtc, timestampOffsetInSeconds) {
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
    }
}
YMDrive.fromObject = function (obj) {
    if (obj == null)
        return new YMDrive('', '', [], '', '', 0, YMLocation_1.default.fromObject(undefined), YMLocation_1.default.fromObject(undefined), new Date, new Date, YMDriveNotes_1.default.fromObject(undefined), false, false, [], '', 0, 0, 0, 0);
    // tslint:disable-next-line:max-line-length
    return new YMDrive(obj.driveId, obj.autoClassifiedRuleId, obj.reportIds, obj.vehicleId, obj.drivePurposeId, obj.miles, obj.origin, obj.dest, obj.startTime, obj.endTime, obj.driveNotes, obj.isVisible, obj.isDeleted, obj.joinedFromIds, obj.obj_db_id, new Date().getTime(), obj.startTimeTimestampUtc, obj.endTimeTimestampUtc, obj.timestampOffsetInSeconds);
};
YMDrive.joinDrives = function (drives, dbKey) {
    // TODO support more than 2 drives join
    let firstDrive = drives[0];
    let secondDrive = drives[1];
    if (new Date(firstDrive.startTime).getTime() > new Date(secondDrive.startTime).getTime()) {
        const tempDrive = firstDrive;
        firstDrive = secondDrive;
        secondDrive = tempDrive;
    }
    return new YMDrive(common_1.getUniqueDriveId(), '', [], firstDrive.vehicleId === secondDrive.vehicleId ? firstDrive.vehicleId : '', // TODO set default vehicle
    firstDrive.drivePurposeId === secondDrive.drivePurposeId ? firstDrive.drivePurposeId : '', firstDrive.miles + secondDrive.miles, firstDrive.origin, secondDrive.dest, firstDrive.startTime, secondDrive.endTime, new YMDriveNotes_1.default('', // TODO - think how to combine joined drive notes
    firstDrive.driveNotes.parkingMoney + secondDrive.driveNotes.parkingMoney, firstDrive.driveNotes.tollMoney + secondDrive.driveNotes.tollMoney), true, false, [firstDrive.driveId, secondDrive.driveId], dbKey, new Date().getTime(), firstDrive.startTimeTimestampUtc, secondDrive.endTimeTimestampUtc, firstDrive.timestampOffsetInSeconds);
};
exports.default = YMDrive;
//# sourceMappingURL=YMDrive.js.map