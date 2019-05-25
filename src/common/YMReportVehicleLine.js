"use strict";
exports.__esModule = true;
var YMReportVehicleLine = /** @class */ (function () {
    function YMReportVehicleLine(vehicle, odometerRead, miles, mileageValue, parkingValue, tollsValue) {
        this.vehicle = vehicle;
        this.odometerRead = odometerRead;
        this.miles = miles;
        this.mileageValue = mileageValue;
        this.parkingValue = parkingValue;
        this.tollsValue = tollsValue;
        this.totalValue = mileageValue + parkingValue + tollsValue;
    }
    // tslint:disable-next-line:member-ordering
    YMReportVehicleLine.fromObject = function (obj) {
        if (obj == null)
            return new YMReportVehicleLine('', 0, 0, 0, 0, 0);
        return new YMReportVehicleLine(obj.vehicle, obj.odometerRead, obj.miles, obj.mileageValue, obj.parkingValue, obj.tollsValue);
    };
    return YMReportVehicleLine;
}());
exports["default"] = YMReportVehicleLine;
