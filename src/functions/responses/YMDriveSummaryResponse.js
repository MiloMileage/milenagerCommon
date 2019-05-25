"use strict";
exports.__esModule = true;
var YMDateRange_1 = require("./../../common/YMDateRange");
var YMDriveWeight_1 = require("./YMDriveWeight");
var YMPurpose_1 = require("./../../common/YMPurpose");
var YMRate_1 = require("./../../common/YMRate");
var YMDriveSummaryResponse = /** @class */ (function () {
    function YMDriveSummaryResponse(drivesCount, earned, potential, loggedMiles, totalMiles, dateRange, parkingMoney, tollsMoney, driveWeights, lastUpdated) {
        this.drivesCount = drivesCount;
        this.earned = earned;
        this.potential = potential;
        this.loggedMiles = loggedMiles;
        this.totalMiles = totalMiles;
        this.dateRange = YMDateRange_1["default"].fromObject(dateRange);
        this.parkingMoney = parkingMoney;
        this.tollMoney = tollsMoney;
        this.driveWeights = driveWeights;
        this.lastUpdated = lastUpdated;
    }
    YMDriveSummaryResponse.prototype.getKey = function () {
        return YMDriveSummaryResponse.getMonthlyIdFromDateRange(this.dateRange);
    };
    YMDriveSummaryResponse.prototype.getClassifiedDrivesCount = function () {
        var _this = this;
        return Object.keys(this.drivesCount).map(function (key) {
            return YMPurpose_1["default"].defaultPuposesIds.undetermined === key ? 0 : _this.drivesCount[key];
        })
            .reduce(function (total, num) { return total + num; }, 0);
    };
    YMDriveSummaryResponse.prototype.getTotalDrivesCount = function () {
        var _this = this;
        return Object.keys(this.drivesCount).map(function (key) {
            return _this.drivesCount[key];
        })
            .reduce(function (total, num) { return total + num; }, 0);
    };
    YMDriveSummaryResponse.prototype.reduceDriveWeight = function (driveWeight) {
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
    };
    YMDriveSummaryResponse.prototype.reduceDriveWeightFromDriveId = function (driveId) {
        var driveWeight = this.driveWeights[driveId];
        if (driveWeight !== undefined) {
            this.reduceDriveWeight(driveWeight);
        }
    };
    YMDriveSummaryResponse.prototype.addDriveValue = function (drive, userSettings, globalSettings) {
        var driveWeight = YMDriveWeight_1["default"].fromObject(undefined);
        if (drive.isDeleted || !drive.isVisible) {
            return;
        }
        if (drive.drivePurposeId !== YMPurpose_1["default"].defaultPuposesIds.undetermined) {
            driveWeight.earned = drive.miles * YMRate_1["default"].getRateForPurposeId(drive.drivePurposeId, userSettings, globalSettings, drive);
            this.earned += driveWeight.earned;
            driveWeight.loggedMiles = drive.miles;
            this.loggedMiles += drive.miles;
            driveWeight.parkingMoney = drive.drivePurposeId === YMPurpose_1["default"].defaultPuposesIds.personal ? 0 : drive.driveNotes.parkingMoney;
            driveWeight.tollMoney = drive.drivePurposeId === YMPurpose_1["default"].defaultPuposesIds.personal ? 0 : drive.driveNotes.tollMoney;
            this.parkingMoney += driveWeight.parkingMoney;
            this.tollMoney += driveWeight.tollMoney;
        }
        else {
            driveWeight.potential = drive.miles * YMRate_1["default"].getRateForPurposeId(YMPurpose_1["default"].defaultPuposesIds.business, userSettings, globalSettings, drive);
            this.potential += driveWeight.potential;
        }
        driveWeight.totalMiles = drive.miles;
        this.totalMiles += driveWeight.totalMiles;
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
    };
    YMDriveSummaryResponse.prototype.reduceDriveValue = function (drive, userSettings, globalSettings) {
        this.reduceDriveWeightFromDriveId(drive.driveId);
    };
    YMDriveSummaryResponse.getMonthlyIdFromDateRange = function (dateRange) {
        if (dateRange.isMonthRange()) {
            return YMDriveSummaryResponse.getMonthlyId(dateRange.startDateMonth, dateRange.startDateYear);
        }
        return undefined;
    };
    YMDriveSummaryResponse.getMonthlyId = function (month, year) {
        return year + "_" + month;
    };
    // tslint:disable-next-line:member-ordering
    YMDriveSummaryResponse.fromObject = function (obj) {
        if (obj == null)
            return new YMDriveSummaryResponse({}, 0, 0, 0, 0, YMDateRange_1["default"].fromObject({}), 0, 0, {}, 0);
        return new YMDriveSummaryResponse(obj.drivesCount, obj.earned, obj.potential, obj.loggedMiles, obj.totalMiles, obj.dateRange, obj.parkingMoney, obj.tollMoney, obj.driveWeights, obj.lastUpdated);
    };
    return YMDriveSummaryResponse;
}());
exports["default"] = YMDriveSummaryResponse;
