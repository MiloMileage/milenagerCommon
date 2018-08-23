"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./YMDateRange");
class YMReport {
    constructor(name, project, customerDetails, details, businessRateInMiles, charityRateInMiles, movingRateInMiles, medicalRateInMiles, isMetricSystem, dateRange, lines, vehicleLines) {
        this.name = name;
        this.project = project;
        this.customerDetails = customerDetails;
        this.details = details;
        this.businessRateInMiles = businessRateInMiles;
        this.charityRateInMiles = charityRateInMiles;
        this.movingRateInMiles = movingRateInMiles;
        this.medicalRateInMiles = medicalRateInMiles;
        this.isMetricSystem = isMetricSystem;
        this.dateRange = dateRange;
        this.lines = lines;
        this.vehicleLines = vehicleLines;
    }
}
// tslint:disable-next-line:member-ordering
YMReport.fromObject = function (obj) {
    if (obj == null)
        return new YMReport('', '', '', '', 0, 0, 0, 0, false, YMDateRange_1.default.fromObject(undefined), [], []);
    return new YMReport(obj.name, obj.project, obj.customerDetails, obj.details, obj.businessRateInMiles, obj.charityRateInMiles, obj.movingRateInMiles, obj.medicalRateInMiles, obj.isMetricSystem, obj.dateRange, obj.lines, obj.vehicleLines);
};
exports.default = YMReport;
//# sourceMappingURL=YMReport.js.map