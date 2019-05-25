"use strict";
exports.__esModule = true;
var YMOdometerRead_1 = require("./YMOdometerRead");
var YMVehicle = /** @class */ (function () {
    function YMVehicle(vehicleId, make, model, primaryTime, year, nickName, odometerReads, visible) {
        if (vehicleId === void 0) { vehicleId = ''; }
        if (make === void 0) { make = ''; }
        if (model === void 0) { model = ''; }
        if (primaryTime === void 0) { primaryTime = 0; }
        if (year === void 0) { year = ''; }
        if (nickName === void 0) { nickName = ''; }
        if (odometerReads === void 0) { odometerReads = [new YMOdometerRead_1["default"]()]; }
        if (visible === void 0) { visible = true; }
        this.vehicleId = vehicleId;
        this.make = make;
        this.model = model;
        this.primaryTime = primaryTime;
        this.year = year;
        this.nickName = nickName;
        this.odometerReads = odometerReads.map(function (x) { return YMOdometerRead_1["default"].fromObject(x); });
        this.visible = visible;
    }
    YMVehicle.prototype.isPrimary = function (vehicles) {
        var _this = this;
        return vehicles.filter(function (vehicle) { return vehicle.visible && vehicle.primaryTime > _this.primaryTime; }).length === 0;
    };
    YMVehicle.prototype.getOdometerReadIfExist = function (year) {
        var read = this.odometerReads.filter(function (x) { return x.year === year; })[0];
        return read !== undefined ? read.read : 0;
    };
    // tslint:disable-next-line:member-ordering
    YMVehicle.fromObject = function (obj) {
        if (obj == null)
            return new YMVehicle('', '', '', 0, '', '', [], true);
        return new YMVehicle(obj.vehicleId, obj.make, obj.model, obj.primaryTime, obj.year, obj.nickName, obj.odometerReads, obj.visible);
    };
    // tslint:disable-next-line:member-ordering
    YMVehicle.getOldestOdometerRead = function (vehicle) {
        return Number(vehicle.odometerReads.sort(function (x, y) { return x.year - y.year; })[0].year);
    };
    return YMVehicle;
}());
exports["default"] = YMVehicle;
