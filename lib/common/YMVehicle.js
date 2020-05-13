"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMOdometerRead_1 = require("./YMOdometerRead");
var YMVehicleType;
(function (YMVehicleType) {
    YMVehicleType[YMVehicleType["car"] = 0] = "car";
    YMVehicleType[YMVehicleType["motorcycle"] = 1] = "motorcycle";
    YMVehicleType[YMVehicleType["bicycle"] = 2] = "bicycle";
})(YMVehicleType = exports.YMVehicleType || (exports.YMVehicleType = {}));
class YMVehicle {
    constructor(vehicleId, make, model, primaryTime, year, nickName, odometerReads, visible, vehicleType) {
        this.vehicleId = vehicleId;
        this.make = make;
        this.model = model;
        this.primaryTime = primaryTime;
        this.year = year;
        this.nickName = nickName;
        this.odometerReads = odometerReads.map(x => YMOdometerRead_1.default.fromObject(x));
        this.visible = visible;
        this.vehicleType = vehicleType ? vehicleType : YMVehicleType.car;
    }
    isPrimary(vehicles) {
        return vehicles.filter(vehicle => vehicle.visible && vehicle.primaryTime > this.primaryTime).length === 0;
    }
    getOdometerReadIfExist(year) {
        const read = this.odometerReads.filter(x => x.year === year)[0];
        return read !== undefined ? read.read : 0;
    }
    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if (obj == null)
            return new YMVehicle('', '', '', 0, '', '', [], true, YMVehicleType.car);
        return new YMVehicle(obj.vehicleId, obj.make, obj.model, obj.primaryTime, obj.year, obj.nickName, obj.odometerReads, obj.visible, obj.vehicleType);
    }
}
exports.default = YMVehicle;
//# sourceMappingURL=YMVehicle.js.map