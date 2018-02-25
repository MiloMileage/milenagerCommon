"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMOdometerRead_1 = require("./YMOdometerRead");
class YMVehicle {
    constructor(vehicleId = '', make = '', model = '', primaryTime = 0, year = '', nickName = '', odometerReads = [new YMOdometerRead_1.default()], visible = true) {
        this.vehicleId = vehicleId;
        this.make = make;
        this.model = model;
        this.primaryTime = primaryTime;
        this.year = year;
        this.nickName = nickName;
        this.odometerReads = odometerReads.map(x => YMOdometerRead_1.default.fromObject(x));
        this.visible = true;
    }
    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if (obj == null)
            return new YMVehicle('', '', '', 0, '', '', [], false);
        return new YMVehicle(obj.vehicleId, obj.make, obj.model, obj.primaryTime, obj.year, obj.nickName, obj.odometerReads, obj.visible);
    }
}
// tslint:disable-next-line:member-ordering
YMVehicle.getOldestOdometerRead = function (vehicle) {
    return Number(vehicle.odometerReads.sort((x, y) => x.year - y.year)[0].year);
};
exports.default = YMVehicle;
//# sourceMappingURL=YMVehicle.js.map