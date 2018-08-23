"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMReportVehicleLine {
    constructor(vehicle, odometerRead, businessMiles, personalMiles, totalMiles, businessValue, parkingValue, tollsValue, totalValue) {
        this.vehicle = vehicle;
        this.odometerRead = odometerRead;
        this.businessMiles = businessMiles;
        this.personalMiles = personalMiles;
        this.totalMiles = totalMiles;
        this.businessValue = businessValue;
        this.parkingValue = parkingValue;
        this.tollsValue = tollsValue;
        this.totalValue = totalValue;
    }
}
// tslint:disable-next-line:member-ordering
YMReportVehicleLine.fromObject = function (obj) {
    if (obj == null)
        return new YMReportVehicleLine('', 0, 0, 0, 0, 0, 0, 0, 0);
    return new YMReportVehicleLine(obj.vehicle, obj.odometerRead, obj.businessMiles, obj.personalMiles, obj.totalMiles, obj.businessValue, obj.parkingValue, obj.tollsValue, obj.totalValue);
};
exports.default = YMReportVehicleLine;
//# sourceMappingURL=YMReportVehicleLine.js.map