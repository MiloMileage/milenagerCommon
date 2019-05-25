"use strict";
exports.__esModule = true;
var YMDriveWeight = /** @class */ (function () {
    function YMDriveWeight(drivesPurposeId, earned, potential, loggedMiles, totalMiles, parkingMoney, tollsMoney, driveId) {
        this.drivesPurposeId = drivesPurposeId;
        this.earned = earned;
        this.potential = potential;
        this.loggedMiles = loggedMiles;
        this.totalMiles = totalMiles;
        this.parkingMoney = parkingMoney;
        this.tollMoney = tollsMoney;
        this.driveId = driveId;
    }
    // tslint:disable-next-line:member-ordering
    YMDriveWeight.fromObject = function (obj) {
        if (obj == null)
            return new YMDriveWeight('-1', 0, 0, 0, 0, 0, 0, '');
        return new YMDriveWeight(obj.drivesPurposeId, obj.earned, obj.potential, obj.loggedMiles, obj.totalMiles, obj.parkingMoney, obj.tollMoney, obj.driveId);
    };
    return YMDriveWeight;
}());
exports["default"] = YMDriveWeight;
