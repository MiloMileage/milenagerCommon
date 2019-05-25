"use strict";
exports.__esModule = true;
var YMDateRange_1 = require("./YMDateRange");
var YMReportLine_1 = require("./YMReportLine");
var YMReportVehicleLine_1 = require("./YMReportVehicleLine");
var common_1 = require("./../components/common");
var Moment = require("moment");
var YMReport = /** @class */ (function () {
    function YMReport(reportName, dateCreated, name, project, customerDetails, details, businessRateInMiles, charityRateInMiles, movingRateInMiles, medicalRateInMiles, isMetricSystem, dateRange, lines, vehicleBusinessLines, vehiclePersonalLines, reportId, csvLink, pdfLink) {
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
        this.dateRange = YMDateRange_1["default"].fromObject(dateRange);
        this.lines = lines.map(function (line) { return YMReportLine_1["default"].fromObject(line); });
        this.vehicleBusinessLines = vehicleBusinessLines.map(function (line) { return YMReportVehicleLine_1["default"].fromObject(line); });
        this.vehiclePersonalLines = vehiclePersonalLines.map(function (line) { return YMReportVehicleLine_1["default"].fromObject(line); });
        this.reportId = reportId;
        this.csvLink = csvLink;
        this.pdfLink = pdfLink;
    }
    YMReport.prototype.addDriveValue = function (drive, userSettings, globalSettings, savedLocations) {
        var newLine = YMReportLine_1["default"].fromDrive(drive, userSettings, globalSettings, savedLocations);
        this.lines.push(newLine);
        var vehicle = userSettings.vehicles.filter(function (v) { return v.vehicleId === drive.vehicleId; })[0];
        var purpose = drive.getPurpose(userSettings);
        var isBusiness = purpose !== undefined && purpose.category.toLowerCase() === 'business';
        var newVehicleLine = new YMReportVehicleLine_1["default"](newLine.vehicle, vehicle === undefined ? 0 : vehicle.getOdometerReadIfExist(drive.startTime().getFullYear()), drive.miles, drive.getValue(userSettings, globalSettings), drive.driveNotes.parkingMoney, drive.driveNotes.tollMoney);
        if (isBusiness) {
            var vehicleLine = this.vehicleBusinessLines.filter(function (v) { return v.vehicle === newLine.vehicle; })[0];
            if (vehicleLine === undefined) {
                this.vehicleBusinessLines.push(newVehicleLine);
            }
            else {
                vehicleLine.miles += newVehicleLine.miles;
                vehicleLine.mileageValue += newVehicleLine.mileageValue;
                vehicleLine.parkingValue += newVehicleLine.parkingValue;
                vehicleLine.tollsValue += newVehicleLine.tollsValue;
                vehicleLine.totalValue += newVehicleLine.totalValue;
                this.vehicleBusinessLines = this.vehicleBusinessLines.filter(function (v) { return v.vehicle !== newLine.vehicle; }).concat([vehicleLine]);
            }
        }
        else {
            var vehicleLine = this.vehiclePersonalLines.filter(function (v) { return v.vehicle === newLine.vehicle; })[0];
            if (vehicleLine === undefined) {
                this.vehiclePersonalLines.push(newVehicleLine);
            }
            else {
                vehicleLine.miles += newVehicleLine.miles;
                vehicleLine.mileageValue += newVehicleLine.mileageValue;
                vehicleLine.parkingValue += newVehicleLine.parkingValue;
                vehicleLine.tollsValue += newVehicleLine.tollsValue;
                vehicleLine.totalValue += newVehicleLine.totalValue;
                this.vehiclePersonalLines = this.vehiclePersonalLines.filter(function (v) { return v.vehicle !== newLine.vehicle; }).concat([vehicleLine]);
            }
        }
        this.vehicleBusinessLines.sort(function (a, b) { return b.miles - a.miles; });
        this.vehiclePersonalLines.sort(function (a, b) { return b.miles - a.miles; });
        this.lines.sort(function (a, b) { return a.when.getStartDateLocal().getTime() - b.when.getStartDateLocal().getTime(); });
    };
    YMReport.prototype.getPersonalMiles = function () {
        return this.vehiclePersonalLines.map(function (x) { return x.miles; }).reduce(function (total, num) { return total + num; }, 0);
    };
    YMReport.prototype.getBusinessMiles = function () {
        return this.vehicleBusinessLines.map(function (x) { return x.miles; }).reduce(function (total, num) { return total + num; }, 0);
    };
    YMReport.prototype.getPersonalValue = function () {
        return this.vehiclePersonalLines.map(function (x) { return x.mileageValue; }).reduce(function (total, num) { return total + num; }, 0);
    };
    YMReport.prototype.getBusinessValue = function () {
        return this.vehicleBusinessLines.map(function (x) { return x.mileageValue; }).reduce(function (total, num) { return total + num; }, 0);
    };
    YMReport.prototype.getPersonalTollsValue = function () {
        return this.vehiclePersonalLines.map(function (x) { return x.tollsValue; }).reduce(function (total, num) { return total + num; }, 0);
    };
    YMReport.prototype.getBusinessTollsValue = function () {
        return this.vehicleBusinessLines.map(function (x) { return x.tollsValue; }).reduce(function (total, num) { return total + num; }, 0);
    };
    YMReport.prototype.getPersonalParkingValue = function () {
        return this.vehiclePersonalLines.map(function (x) { return x.parkingValue; }).reduce(function (total, num) { return total + num; }, 0);
    };
    YMReport.prototype.getBusinessParkingValue = function () {
        return this.vehicleBusinessLines.map(function (x) { return x.parkingValue; }).reduce(function (total, num) { return total + num; }, 0);
    };
    YMReport.prototype.getPersonalTotalValue = function () {
        return this.vehiclePersonalLines.map(function (x) { return x.totalValue; }).reduce(function (total, num) { return total + num; }, 0);
    };
    YMReport.prototype.getBusinessTotalValue = function () {
        return this.vehicleBusinessLines.map(function (x) { return x.totalValue; }).reduce(function (total, num) { return total + num; }, 0);
    };
    YMReport.prototype.getCsvData = function () {
        var _this = this;
        var data = '';
        data += '****,****,****,****,****,****,****,****,****,****\n';
        data += 'This,report,was,generated,by,ThisIsMilo.com\n';
        data += '****,****,****,****,****,****,****,****,****,****\n';
        data += '\n';
        data += '\n';
        data += 'Name,';
        data += 'Project,';
        data += 'Customer,';
        data += 'Business Rate,';
        data += 'Charity Rate,';
        data += 'Moving Rate,';
        data += 'Medical Rate,';
        data += 'Details,';
        data += '\n';
        data += this.name + "," + this.project + "," + this.customerDetails + ",";
        data += common_1.metricToMiles(this.businessRateInMiles, this.isMetricSystem, 1000) + " $\\" + (this.isMetricSystem ? 'km' : 'mi') + ",";
        data += common_1.metricToMiles(this.charityRateInMiles, this.isMetricSystem, 1000) + " $\\" + (this.isMetricSystem ? 'km' : 'mi') + ",";
        data += common_1.metricToMiles(this.movingRateInMiles, this.isMetricSystem, 1000) + " $\\" + (this.isMetricSystem ? 'km' : 'mi') + ",";
        data += common_1.metricToMiles(this.medicalRateInMiles, this.isMetricSystem, 1000) + " $\\" + (this.isMetricSystem ? 'km' : 'mi') + ",";
        data += "" + this.details;
        data += '\n';
        data += '\n';
        data += 'Business Summary';
        data += '\n';
        data += 'Vehicle,';
        data += 'Odometer (Start of Year),';
        data += "Business (" + (this.isMetricSystem ? 'km' : 'mi') + "),";
        data += 'Mileage Value,';
        data += 'Parking Value ($),';
        data += 'Tolls Value ($),';
        data += 'Total Value ($),';
        data += '\n';
        this.vehicleBusinessLines.forEach(function (vl) {
            data += vl.vehicle + ",";
            data += vl.odometerRead + ",";
            data += common_1.milesToMetric(vl.miles, _this.isMetricSystem) + ",";
            data += common_1.roundNumber(vl.mileageValue) + ",";
            data += common_1.roundNumber(vl.parkingValue) + ",";
            data += common_1.roundNumber(vl.tollsValue) + ",";
            data += common_1.roundNumber(vl.totalValue) + ",";
            data += '\n';
        });
        data += ",";
        data += "Total,";
        data += common_1.milesToMetric(this.getBusinessMiles(), this.isMetricSystem) + ",";
        data += common_1.roundNumber(this.getBusinessValue()) + ",";
        data += common_1.roundNumber(this.getBusinessParkingValue()) + ",";
        data += common_1.roundNumber(this.getBusinessTollsValue()) + ",";
        data += common_1.roundNumber(this.getBusinessTotalValue()) + ",";
        data += '\n';
        data += '\n';
        data += '\n';
        data += 'Personal Summary';
        data += '\n';
        data += 'Vehicle,';
        data += 'Odometer (Start of Year),';
        data += "Personal (" + (this.isMetricSystem ? 'km' : 'mi') + "),";
        data += 'Mileage Value,';
        data += 'Parking Value ($),';
        data += 'Tolls Value ($),';
        data += 'Total Value ($),';
        data += '\n';
        this.vehiclePersonalLines.forEach(function (vl) {
            data += vl.vehicle + ",";
            data += common_1.milesToMetric(vl.odometerRead) + ",";
            data += common_1.milesToMetric(vl.miles, _this.isMetricSystem) + ",";
            data += common_1.roundNumber(vl.mileageValue) + ",";
            data += common_1.roundNumber(vl.parkingValue) + ",";
            data += common_1.roundNumber(vl.tollsValue) + ",";
            data += common_1.roundNumber(vl.totalValue) + ",";
            data += '\n';
        });
        data += ",";
        data += "Total,";
        data += common_1.milesToMetric(this.getPersonalMiles(), this.isMetricSystem) + ",";
        data += common_1.roundNumber(this.getPersonalValue()) + ",";
        data += common_1.roundNumber(this.getPersonalParkingValue()) + ",";
        data += common_1.roundNumber(this.getPersonalTollsValue()) + ",";
        data += common_1.roundNumber(this.getPersonalTotalValue()) + ",";
        data += '\n';
        data += '\n';
        data += '\n';
        data += 'Mileage Log';
        data += '\n';
        data += 'When,';
        data += "Why,";
        data += "From -> To,";
        data += "From -> To (Frequent Locations),";
        data += "Vehicle (" + (this.isMetricSystem ? 'km' : 'mi') + "),";
        data += "Distance (" + (this.isMetricSystem ? 'km' : 'mi') + "),";
        data += "Value ($),";
        data += "Parking ($),";
        data += "Tolls ($),";
        data += "Total ($),";
        data += '\n';
        this.lines.forEach(function (dl) {
            data += Moment.utc(dl.when.getStartDateLocal()).format('MMMM Do YYYY h:mm a') + ",";
            data += dl.purpose + ",";
            data += dl.fromTo + ",";
            data += dl.fromToPersonalized + ",";
            data += dl.vehicle + ",";
            data += common_1.milesToMetric(dl.distanceInMiles, _this.isMetricSystem) + ",";
            data += common_1.roundNumber(dl.value) + ",";
            data += common_1.roundNumber(dl.parking) + ",";
            data += common_1.roundNumber(dl.tolls) + ",";
            data += common_1.roundNumber(dl.tolls + dl.parking + dl.value) + ",";
            data += '\n';
        });
        data += ",";
        data += ",";
        data += ",";
        data += "Total,";
        data += common_1.milesToMetric(this.getBusinessMiles() + this.getPersonalMiles(), this.isMetricSystem) + ",";
        data += common_1.roundNumber(this.getBusinessValue() + this.getPersonalValue()) + ",";
        data += common_1.roundNumber(this.getBusinessParkingValue() + this.getPersonalParkingValue()) + ",";
        data += common_1.roundNumber(this.getBusinessTollsValue() + this.getPersonalTollsValue()) + ",";
        data += common_1.roundNumber(this.getBusinessTotalValue() + this.getPersonalTotalValue()) + ",";
        data += '\n';
        data += '\n';
        data += '****,****,****,****,****,****,****,****,****,****\n';
        data += 'This,report,was,generated,by,ThisIsMilo.com\n';
        data += '****,****,****,****,****,****,****,****,****,****\n';
        return data;
    };
    // tslint:disable-next-line:member-ordering
    YMReport.fromObject = function (obj) {
        if (obj == null)
            return new YMReport('', new Date(), '', '', '', '', 0, 0, 0, 0, false, YMDateRange_1["default"].fromObject(undefined), [], [], [], '', '', '');
        return new YMReport(obj.reportName, obj.dateCreated, obj.name, obj.project, obj.customerDetails, obj.details, obj.businessRateInMiles, obj.charityRateInMiles, obj.movingRateInMiles, obj.medicalRateInMiles, obj.isMetricSystem, obj.dateRange, obj.lines, obj.vehicleBusinessLines, obj.vehiclePersonalLines, obj.reportId, obj.csvLink, obj.pdfLink);
    };
    return YMReport;
}());
exports["default"] = YMReport;
