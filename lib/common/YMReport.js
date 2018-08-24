"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./YMDateRange");
const YMReportLine_1 = require("./YMReportLine");
const YMReportVehicleLine_1 = require("./YMReportVehicleLine");
class YMReport {
    constructor(name, project, customerDetails, details, businessRateInMiles, charityRateInMiles, movingRateInMiles, medicalRateInMiles, isMetricSystem, dateRange, lines, vehicleBusinessLines, vehiclePersonalLines) {
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
        this.vehicleBusinessLines = vehicleBusinessLines;
        this.vehiclePersonalLines = vehiclePersonalLines;
    }
    addDriveValue(drive, userSettings, globalSettings) {
        const newLine = YMReportLine_1.default.fromDrive(drive, userSettings, globalSettings);
        this.lines.push(newLine);
        const vehicle = userSettings.vehicles.filter(v => v.vehicleId === drive.vehicleId)[0];
        const purpose = drive.getPurpose(userSettings);
        const isBusiness = purpose !== undefined && purpose.category.toLowerCase() === 'business';
        const newVehicleLine = new YMReportVehicleLine_1.default(newLine.vehicle, vehicle === undefined ? 0 : vehicle.getOdometerReadIfExist(drive.startTime.getFullYear()), drive.miles, drive.getValue(userSettings, globalSettings), drive.driveNotes.parkingMoney, drive.driveNotes.tollMoney);
        if (isBusiness) {
            const vehicleLine = this.vehicleBusinessLines.filter(v => v.vehicle === newLine.vehicle)[0];
            if (vehicleLine === undefined) {
                this.vehicleBusinessLines.push(newVehicleLine);
            }
            else {
                vehicleLine.miles += newVehicleLine.miles;
                vehicleLine.mileageValue += newVehicleLine.mileageValue;
                vehicleLine.parkingValue += newVehicleLine.parkingValue;
                vehicleLine.tollsValue += newVehicleLine.tollsValue;
                vehicleLine.totalValue += newVehicleLine.totalValue;
                this.vehicleBusinessLines = [...this.vehicleBusinessLines.filter(v => v.vehicle === newLine.vehicle), vehicleLine];
            }
        }
        else {
            const vehicleLine = this.vehiclePersonalLines.filter(v => v.vehicle === newLine.vehicle)[0];
            if (vehicleLine === undefined) {
                this.vehiclePersonalLines.push(newVehicleLine);
            }
            else {
                vehicleLine.miles += newVehicleLine.miles;
                vehicleLine.mileageValue += newVehicleLine.mileageValue;
                vehicleLine.parkingValue += newVehicleLine.parkingValue;
                vehicleLine.tollsValue += newVehicleLine.tollsValue;
                vehicleLine.totalValue += newVehicleLine.totalValue;
                this.vehiclePersonalLines = [...this.vehiclePersonalLines.filter(v => v.vehicle === newLine.vehicle), vehicleLine];
            }
        }
    }
}
// tslint:disable-next-line:member-ordering
YMReport.fromObject = function (obj) {
    if (obj == null)
        return new YMReport('', '', '', '', 0, 0, 0, 0, false, YMDateRange_1.default.fromObject(undefined), [], [], []);
    return new YMReport(obj.name, obj.project, obj.customerDetails, obj.details, obj.businessRateInMiles, obj.charityRateInMiles, obj.movingRateInMiles, obj.medicalRateInMiles, obj.isMetricSystem, obj.dateRange, obj.lines, obj.vehicleBusinessLines, obj.vehiclePersonalLines);
};
exports.default = YMReport;
//# sourceMappingURL=YMReport.js.map