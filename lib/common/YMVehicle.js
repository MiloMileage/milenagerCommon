"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMOdometerRead_1 = require("./YMOdometerRead");
class YMVehicle {
    constructor(vehicleId, make, model, primaryTime, year, nickName, odometerReads, visible) {
        this.vehicleId = vehicleId;
        this.make = make;
        this.model = model;
        this.primaryTime = primaryTime;
        this.year = year;
        this.nickName = nickName;
        this.odometerReads = odometerReads.map(x => YMOdometerRead_1.default.fromObject(x));
        this.visible = visible;
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
            return new YMVehicle('', '', '', 0, '', '', [], true);
        return new YMVehicle(obj.vehicleId, obj.make, obj.model, obj.primaryTime, obj.year, obj.nickName, obj.odometerReads, obj.visible);
    }
}
exports.default = YMVehicle;
//# sourceMappingURL=YMVehicle.js.map