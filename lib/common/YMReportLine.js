"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./YMDateRange");
class YMReportLine {
    constructor(when, purpose, fromTo, vehicle, distanceInMiles, value, parking, tolls) {
        this.when = when;
        this.purpose = purpose;
        this.fromTo = fromTo;
        this.vehicle = vehicle;
        this.distanceInMiles = distanceInMiles;
        this.value = value;
        this.parking = parking;
        this.tolls = tolls;
    }
}
// tslint:disable-next-line:member-ordering
YMReportLine.fromObject = function (obj) {
    if (obj == null)
        return new YMReportLine(new YMDateRange_1.default(undefined, undefined), '', '', '', 0, 0, 0, 0);
    return new YMReportLine(obj.when, obj.purpose, obj.fromTo, obj.vehicle, obj.distanceInMiles, obj.value, obj.parking, obj.tolls);
};
exports.default = YMReportLine;
//# sourceMappingURL=YMReportLine.js.map