"use strict";
exports.__esModule = true;
var YMLocation_1 = require("./YMLocation");
var YMDriveNotes_1 = require("./YMDriveNotes");
var YMPurpose_1 = require("./YMPurpose");
var YMRate_1 = require("./YMRate");
var YMDrive = /** @class */ (function () {
    function YMDrive(driveId, vehicleId, drivePurposeId, miles, origin, dest, driveNotes, isVisible, isDeleted, 
        // tslint:disable-next-line:variable-name
        joinedFromIds, obj_db_id, lastUpdated, startTimeTimestampUtc, endTimeTimestampUtc, timestampOffsetInSeconds, routeLocations, isManual, deletionReason, isAutoWorkHours, isAutoLocation, signalSource, didApplyDefaults) {
        if (isVisible === void 0) { isVisible = true; }
        if (isDeleted === void 0) { isDeleted = false; }
        // tslint:disable-next-line:variable-name
        if (joinedFromIds === void 0) { joinedFromIds = []; }
        if (routeLocations === void 0) { routeLocations = []; }
        if (isManual === void 0) { isManual = false; }
        if (deletionReason === void 0) { deletionReason = ''; }
        if (isAutoWorkHours === void 0) { isAutoWorkHours = false; }
        if (isAutoLocation === void 0) { isAutoLocation = false; }
        if (signalSource === void 0) { signalSource = 'unknown'; }
        if (didApplyDefaults === void 0) { didApplyDefaults = false; }
        var _this = this;
        this.startTime = function () {
            return new Date().getTimezoneOffset() === 0 ? _this.startTimeInUtcEnv() : new Date(_this.startTimeTimestampUtc * 1000);
        };
        this.endTime = function () {
            return new Date().getTimezoneOffset() === 0 ? _this.endTimeInUtcEnv() : new Date(_this.endTimeTimestampUtc * 1000);
        };
        this.getStartTimeLocal = function () {
            return new Date((_this.startTimeTimestampUtc + (new Date().getTimezoneOffset() * 60 + _this.timestampOffsetInSeconds)) * 1000);
        };
        this.getEndTimeLocal = function () {
            return new Date((_this.endTimeTimestampUtc + (new Date().getTimezoneOffset() * 60 + _this.timestampOffsetInSeconds)) * 1000);
        };
        this.startTimeInUtcEnv = function () {
            var d = new Date(_this.startTimeTimestampUtc * 1000);
            d.setTime(d.getTime() + (_this.timestampOffsetInSeconds === undefined ? new Date().getTimezoneOffset() : _this.timestampOffsetInSeconds) * 1000);
            return d;
        };
        this.endTimeInUtcEnv = function () {
            var d = new Date(_this.endTimeTimestampUtc * 1000);
            d.setTime(d.getTime() + (_this.timestampOffsetInSeconds === undefined ? new Date().getTimezoneOffset() : _this.timestampOffsetInSeconds) * 1000);
            return d;
        };
        this.setPurposeId = function (purposeId) {
            _this.drivePurposeId = purposeId;
            _this.isClassified = _this.drivePurposeId !== YMPurpose_1["default"].defaultPuposesIds.undetermined;
        };
        this.getVehicleName = function (userSettings) {
            var vehicle = userSettings.vehicles.filter(function (v) { return v.vehicleId === _this.vehicleId; })[0];
            return vehicle === undefined ? '' : vehicle.nickName;
        };
        this.getPurpose = function (userSettings) {
            return userSettings.purposes.filter(function (p) { return p.purposeId === _this.drivePurposeId; })[0];
        };
        this.getValue = function (userSettings, globalSettings) {
            return _this.drivePurposeId === YMPurpose_1["default"].defaultPuposesIds.undetermined ? 0 : YMRate_1["default"].getRateForPurposeId(_this.drivePurposeId, userSettings, globalSettings, _this) * _this.miles;
        };
        this.driveId = driveId;
        this.vehicleId = vehicleId;
        this.drivePurposeId = drivePurposeId;
        this.miles = miles;
        this.origin = YMLocation_1["default"].fromObject(origin);
        this.dest = YMLocation_1["default"].fromObject(dest);
        this.driveNotes = YMDriveNotes_1["default"].fromObject(driveNotes);
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
        this.isClassified = drivePurposeId !== YMPurpose_1["default"].defaultPuposesIds.undetermined;
        this.deletionReason = deletionReason;
        this.isAutoWorkHours = isAutoWorkHours;
        this.isAutoLocation = isAutoLocation;
        this.signalSource = signalSource;
        this.didApplyDefaults = didApplyDefaults;
    }
    YMDrive.fromObject = function (obj) {
        if (obj == null)
            return new YMDrive('', '', '', 0, YMLocation_1["default"].fromObject(undefined), YMLocation_1["default"].fromObject(undefined), YMDriveNotes_1["default"].fromObject(undefined), false, false, [], '', 0, 0, 0, 0, [], false, '', false, false);
        // tslint:disable-next-line:max-line-length
        return new YMDrive(obj.driveId, obj.vehicleId, obj.drivePurposeId, obj.miles, obj.origin, obj.dest, obj.driveNotes, obj.isVisible, obj.isDeleted, obj.joinedFromIds, obj.obj_db_id, obj.lastUpdated, obj.startTimeTimestampUtc, obj.endTimeTimestampUtc, obj.timestampOffsetInSeconds, obj.routeLocations, obj.isManual, obj.deletionReason, obj.isAutoWorkHours, obj.isAutoLocation, obj.signalSource, obj.didApplyDefaults);
    };
    YMDrive.getUniqueDriveArray = function (drives) {
        var set = new Set();
        var uniqueDrives = new Array();
        drives.forEach(function (d) {
            if (!set.has(d.driveId)) {
                uniqueDrives.push(d);
                set.add(d.driveId);
            }
        });
        return uniqueDrives;
    };
    YMDrive.smartConcatDrivesArray = function (drives1, drives2) {
        var drives = new Array();
        var i = 0;
        var j = 0;
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
            var drive1 = drives1[i];
            var drive2 = drives2[j];
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
    return YMDrive;
}());
exports["default"] = YMDrive;
