"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./YMDateRange");
const YMReportLine_1 = require("./YMReportLine");
const YMReportVehicleLine_1 = require("./YMReportVehicleLine");
class YMReport {
    constructor(reportName, dateCreated, name, project, customerDetails, details, businessRateInMiles, charityRateInMiles, movingRateInMiles, medicalRateInMiles, isMetricSystem, dateRange, lines, vehicleBusinessLines, vehiclePersonalLines, reportId, csvLink, pdfLink) {
        this.reportName = reportName;
        this.dateCreated = dateCreated;
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
        this.reportId = reportId;
        this.csvLink = csvLink;
        this.pdfLink = pdfLink;
    }
    addDriveValue(drive, userSettings, globalSettings) {
        const newLine = YMReportLine_1.default.fromDrive(drive, userSettings, globalSettings);
        this.lines.push(newLine);
        const vehicle = userSettings.vehicles.filter(v => v.vehicleId === drive.vehicleId)[0];
        const purpose = drive.getPurpose(userSettings);
        const isBusiness = purpose !== undefined && purpose.category.toLowerCase() === 'business';
        const newVehicleLine = new YMReportVehicleLine_1.default(newLine.vehicle, vehicle === undefined ? 0 : vehicle.getOdometerReadIfExist(new Date(drive.startTime).getFullYear()), drive.miles, drive.getValue(userSettings, globalSettings), drive.driveNotes.parkingMoney, drive.driveNotes.tollMoney);
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
                this.vehicleBusinessLines = [...this.vehicleBusinessLines.filter(v => v.vehicle !== newLine.vehicle), vehicleLine];
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
                this.vehiclePersonalLines = [...this.vehiclePersonalLines.filter(v => v.vehicle !== newLine.vehicle), vehicleLine];
            }
        }
        this.vehicleBusinessLines.sort((a, b) => { return b.miles - a.miles; });
        this.vehiclePersonalLines.sort((a, b) => { return b.miles - a.miles; });
        this.lines.sort((a, b) => new Date(b.when.startDate).getTime() - new Date(a.when.startDate).getTime());
    }
}
// tslint:disable-next-line:member-ordering
YMReport.fromObject = function (obj) {
    if (obj == null)
        return new YMReport('', new Date(), '', '', '', '', 0, 0, 0, 0, false, YMDateRange_1.default.fromObject(undefined), [], [], [], '', '', '');
    return new YMReport(obj.reportName, obj.dateCreated, obj.name, obj.project, obj.customerDetails, obj.details, obj.businessRateInMiles, obj.charityRateInMiles, obj.movingRateInMiles, obj.medicalRateInMiles, obj.isMetricSystem, obj.dateRange, obj.lines, obj.vehicleBusinessLines, obj.vehiclePersonalLines, obj.reportId, obj.csvLink, obj.pdfLink);
};
exports.default = YMReport;
//# sourceMappingURL=YMReport.js.map