"use strict";
exports.__esModule = true;
var PdfText_1 = require("./PdfText");
var PdfTable_1 = require("./PdfTable");
var PdfTableSub_1 = require("./PdfTableSub");
var PdfLayout_1 = require("./PdfLayout");
var YMReportVehicleLine_1 = require("./../common/YMReportVehicleLine");
var YMReportLine_1 = require("./../common/YMReportLine");
var Moment = require("moment");
var common_1 = require("./../components/common");
var PdfDescription = /** @class */ (function () {
    function PdfDescription(pageOrientation, pageMargins, content, footer, header) {
        this.pageOrientation = pageOrientation;
        this.pageMargins = pageMargins;
        this.footer = footer;
        this.header = header;
        this.content = content;
        this.styles = {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            }
        };
    }
    PdfDescription.onFooter = function (currentPage, pageCount) {
        return new PdfText_1["default"]('', [], '', false, false, '', 10);
    };
    PdfDescription.onHeader = function (currentPage, pageCount) {
        return new PdfText_1["default"]('', [], '', false, false, '', 10);
    };
    PdfDescription.fromObject = function (obj) {
        if (obj == null)
            return new PdfDescription('', [], [], PdfDescription.onFooter, PdfDescription.onHeader);
        return new PdfDescription(obj.pageOrientation, obj.pageMargins, obj.content, obj.footer, obj.header);
    };
    PdfDescription.getFooterFunc = function (name, project, customerDetails) {
        return function (currentPage, pageCount) {
            return new PdfText_1["default"]("(" + currentPage + " of " + pageCount + ")         Created using ThisIsMilo.com for " + name + ", " + project + ", " + customerDetails + "      Submitted By: ______________________     Date: ______________________     Approved: ______________________", [30, 10, 0, 10], undefined, false, false, 'black', 10, 'left');
        };
    };
    PdfDescription.getHeaderFunc = function (name, dateRanage) {
        return function (currentPage, pageCount) {
            return new PdfText_1["default"]("Mileage Report (" + Moment.utc(new Date(dateRanage.getStartDateLocal())).format('MMMM Do YYYY') + " to " + Moment.utc(new Date(dateRanage.getEndDateLocal())).format('MMMM Do YYYY') + ") - " + name, [30, 8, 30, 30], 'header', false, true, 'black', undefined, 'left');
        };
    };
    PdfDescription.fromReport = function (report) {
        var pd = PdfDescription.fromObject(undefined);
        pd.pageOrientation = 'landscape';
        pd.pageMargins = [30, 30, 30, 30];
        pd.footer = PdfDescription.getFooterFunc(report.name, report.project, report.customerDetails);
        pd.header = PdfDescription.getHeaderFunc(report.name, report.dateRange);
        pd.content = new Array();
        // Add customer details table
        var customerDetailsTableSub = new PdfTableSub_1["default"](['*', '*', '*', '*', '*', '*', '*', '*'], new Array());
        customerDetailsTableSub.body.push([
            PdfTableSub_1["default"].getHeaderTableCell('Name'),
            PdfTableSub_1["default"].getHeaderTableCell('Project'),
            PdfTableSub_1["default"].getHeaderTableCell('Customer'),
            PdfTableSub_1["default"].getHeaderTableCell('Business Rate'),
            PdfTableSub_1["default"].getHeaderTableCell('Charity Rate'),
            PdfTableSub_1["default"].getHeaderTableCell('Moving Rate'),
            PdfTableSub_1["default"].getHeaderTableCell('Medical Rate'),
            PdfTableSub_1["default"].getHeaderTableCell('Details'),
        ]);
        customerDetailsTableSub.body.push([
            PdfTableSub_1["default"].getTableCell(report.name),
            PdfTableSub_1["default"].getTableCell(report.project),
            PdfTableSub_1["default"].getTableCell(report.customerDetails),
            PdfTableSub_1["default"].getTableCell(common_1.metricToMiles(report.businessRateInMiles, report.isMetricSystem, 1000) + " $\\" + (report.isMetricSystem ? 'km' : 'mi')),
            PdfTableSub_1["default"].getTableCell(common_1.metricToMiles(report.charityRateInMiles, report.isMetricSystem, 1000) + " $\\" + (report.isMetricSystem ? 'km' : 'mi')),
            PdfTableSub_1["default"].getTableCell(common_1.metricToMiles(report.movingRateInMiles, report.isMetricSystem, 1000) + " $\\" + (report.isMetricSystem ? 'km' : 'mi')),
            PdfTableSub_1["default"].getTableCell(common_1.metricToMiles(report.medicalRateInMiles, report.isMetricSystem, 1000) + " $\\" + (report.isMetricSystem ? 'km' : 'mi')),
            PdfTableSub_1["default"].getTableCell(report.details),
        ]);
        var customerDetailsTable = new PdfTable_1["default"]('tableExample', [0, 10, 0, 10], customerDetailsTableSub, new PdfLayout_1["default"](PdfLayout_1["default"].getTableHeaderFillColorFunc(), undefined));
        pd.content.push(customerDetailsTable);
        // Add business vehicles table
        pd.content.push(new PdfText_1["default"]('Report Summary (Business)', undefined, 'subheader', undefined, undefined, undefined, undefined));
        var businessVehiclesTableSub = new PdfTableSub_1["default"](['*', '*', '*', '*', '*', '*', '*'], new Array());
        businessVehiclesTableSub.body.push([
            PdfTableSub_1["default"].getHeaderTableCell('Vehicle'),
            PdfTableSub_1["default"].getHeaderTableCell('Odometer (Start of Year)'),
            PdfTableSub_1["default"].getHeaderTableCell("Business (" + (report.isMetricSystem ? 'km' : 'mi') + ")"),
            PdfTableSub_1["default"].getHeaderTableCell("Mileage Value"),
            PdfTableSub_1["default"].getHeaderTableCell('Parking Value ($)'),
            PdfTableSub_1["default"].getHeaderTableCell('Tolls Value ($)'),
            PdfTableSub_1["default"].getHeaderTableCell('Total Value ($)'),
        ]);
        var businessSummaryLine = new YMReportVehicleLine_1["default"]('', 0, 0, 0, 0, 0);
        report.vehicleBusinessLines.forEach(function (vl) {
            businessSummaryLine.miles += vl.miles;
            businessSummaryLine.parkingValue += vl.parkingValue;
            businessSummaryLine.tollsValue += vl.tollsValue;
            businessSummaryLine.mileageValue += vl.mileageValue;
            businessSummaryLine.totalValue += vl.totalValue;
            businessVehiclesTableSub.body.push([
                PdfTableSub_1["default"].getTableCell(vl.vehicle),
                PdfTableSub_1["default"].getTableCell("" + common_1.milesToMetric(vl.odometerRead, report.isMetricSystem)),
                PdfTableSub_1["default"].getTableCell("" + common_1.milesToMetric(vl.miles, report.isMetricSystem)),
                PdfTableSub_1["default"].getTableCell("" + common_1.roundNumber(vl.mileageValue)),
                PdfTableSub_1["default"].getTableCell("" + common_1.roundNumber(vl.parkingValue)),
                PdfTableSub_1["default"].getTableCell("" + common_1.roundNumber(vl.tollsValue)),
                PdfTableSub_1["default"].getTableCell("" + common_1.roundNumber(vl.totalValue)),
            ]);
        });
        businessVehiclesTableSub.body.push([
            PdfTableSub_1["default"].getTotalCell(''),
            PdfTableSub_1["default"].getTotalCell('Total'),
            PdfTableSub_1["default"].getTotalCell("" + common_1.milesToMetric(businessSummaryLine.miles, report.isMetricSystem)),
            PdfTableSub_1["default"].getTotalCell("" + common_1.roundNumber(businessSummaryLine.mileageValue)),
            PdfTableSub_1["default"].getTotalCell("" + common_1.roundNumber(businessSummaryLine.parkingValue)),
            PdfTableSub_1["default"].getTotalCell("" + common_1.roundNumber(businessSummaryLine.tollsValue)),
            PdfTableSub_1["default"].getTotalCell("" + common_1.roundNumber(businessSummaryLine.totalValue)),
        ]);
        var businessVehiclesTable = new PdfTable_1["default"]('tableExample', undefined, businessVehiclesTableSub, new PdfLayout_1["default"](PdfLayout_1["default"].getTableHeaderFillColorFunc(), PdfLayout_1["default"].getTableHeaderHLineWidthFunc()));
        pd.content.push(businessVehiclesTable);
        // Add personal vehicles table
        pd.content.push(new PdfText_1["default"]('Report Summary (Personal)', undefined, 'subheader', undefined, undefined, undefined, undefined));
        var vehiclesTableSub = new PdfTableSub_1["default"](['*', '*', '*', '*', '*', '*', '*'], new Array());
        vehiclesTableSub.body.push([
            PdfTableSub_1["default"].getHeaderTableCell('Vehicle'),
            PdfTableSub_1["default"].getHeaderTableCell('Odometer (Start of Year)'),
            PdfTableSub_1["default"].getHeaderTableCell("Personal (" + (report.isMetricSystem ? 'km' : 'mi') + ")"),
            PdfTableSub_1["default"].getHeaderTableCell("Mileage Value"),
            PdfTableSub_1["default"].getHeaderTableCell('Parking Value ($)'),
            PdfTableSub_1["default"].getHeaderTableCell('Tolls Value ($)'),
            PdfTableSub_1["default"].getHeaderTableCell('Total Value ($)'),
        ]);
        var summaryLine = new YMReportVehicleLine_1["default"]('', 0, 0, 0, 0, 0);
        report.vehiclePersonalLines.forEach(function (vl) {
            summaryLine.miles += vl.miles;
            summaryLine.parkingValue += vl.parkingValue;
            summaryLine.tollsValue += vl.tollsValue;
            summaryLine.mileageValue += vl.mileageValue;
            summaryLine.totalValue += vl.totalValue;
            vehiclesTableSub.body.push([
                PdfTableSub_1["default"].getTableCell(vl.vehicle),
                PdfTableSub_1["default"].getTableCell("" + common_1.milesToMetric(vl.odometerRead, report.isMetricSystem)),
                PdfTableSub_1["default"].getTableCell("" + common_1.milesToMetric(vl.miles, report.isMetricSystem)),
                PdfTableSub_1["default"].getTableCell("" + common_1.roundNumber(vl.mileageValue)),
                PdfTableSub_1["default"].getTableCell("" + common_1.roundNumber(vl.parkingValue)),
                PdfTableSub_1["default"].getTableCell("" + common_1.roundNumber(vl.tollsValue)),
                PdfTableSub_1["default"].getTableCell("" + common_1.roundNumber(vl.totalValue)),
            ]);
        });
        vehiclesTableSub.body.push([
            PdfTableSub_1["default"].getTotalCell(''),
            PdfTableSub_1["default"].getTotalCell('Total'),
            PdfTableSub_1["default"].getTotalCell("" + common_1.milesToMetric(summaryLine.miles, report.isMetricSystem)),
            PdfTableSub_1["default"].getTotalCell("" + common_1.roundNumber(summaryLine.mileageValue)),
            PdfTableSub_1["default"].getTotalCell("" + common_1.roundNumber(summaryLine.parkingValue)),
            PdfTableSub_1["default"].getTotalCell("" + common_1.roundNumber(summaryLine.tollsValue)),
            PdfTableSub_1["default"].getTotalCell("" + common_1.roundNumber(summaryLine.totalValue)),
        ]);
        var vehiclesTable = new PdfTable_1["default"]('tableExample', undefined, vehiclesTableSub, new PdfLayout_1["default"](PdfLayout_1["default"].getTableHeaderFillColorFunc(), PdfLayout_1["default"].getTableHeaderHLineWidthFunc()));
        pd.content.push(vehiclesTable);
        // Add drives table
        pd.content.push(new PdfText_1["default"]('Mileage Log', undefined, 'subheader', undefined, undefined, undefined, undefined, undefined, 'before'));
        var drivesSummaryLine = new YMReportLine_1["default"](undefined, undefined, undefined, undefined, undefined, 0, 0, 0, 0);
        var drivesTableSub = new PdfTableSub_1["default"]([110, 110, 130, 70, 70, 50, 60, 50, '*'], new Array());
        drivesTableSub.body.push([
            PdfTableSub_1["default"].getHeaderTableCell('When'),
            PdfTableSub_1["default"].getHeaderTableCell('Why'),
            PdfTableSub_1["default"].getHeaderTableCell("From -> To (" + (report.isMetricSystem ? 'km' : 'mi') + ")"),
            PdfTableSub_1["default"].getHeaderTableCell("Vehicle (" + (report.isMetricSystem ? 'km' : 'mi') + ")"),
            PdfTableSub_1["default"].getHeaderTableCell("Distance (" + (report.isMetricSystem ? 'km' : 'mi') + ")"),
            PdfTableSub_1["default"].getHeaderTableCell("Value ($)"),
            PdfTableSub_1["default"].getHeaderTableCell('Parking ($)'),
            PdfTableSub_1["default"].getHeaderTableCell('Tolls ($)'),
            PdfTableSub_1["default"].getHeaderTableCell('Total ($)'),
        ]);
        report.lines.forEach(function (dl) {
            drivesSummaryLine.distanceInMiles += dl.distanceInMiles;
            drivesSummaryLine.parking += dl.parking;
            drivesSummaryLine.tolls += dl.tolls;
            drivesSummaryLine.value += dl.value;
            drivesTableSub.body.push([
                PdfTableSub_1["default"].getTableCell(Moment.utc(new Date(dl.when.getStartDateLocal())).format('MMMM Do YYYY, h:mm a')),
                PdfTableSub_1["default"].getTableCell(dl.purpose),
                PdfTableSub_1["default"].getTableCell(dl.fromToPersonalized),
                PdfTableSub_1["default"].getTableCell(dl.vehicle),
                PdfTableSub_1["default"].getTableCell("" + common_1.milesToMetric(dl.distanceInMiles, report.isMetricSystem)),
                PdfTableSub_1["default"].getTableCell("" + common_1.roundNumber(dl.value)),
                PdfTableSub_1["default"].getTableCell("" + common_1.roundNumber(dl.parking)),
                PdfTableSub_1["default"].getTableCell("" + common_1.roundNumber(dl.tolls)),
                PdfTableSub_1["default"].getTableCell("" + common_1.roundNumber(dl.tolls + dl.parking + dl.value)),
            ]);
        });
        drivesTableSub.body.push([
            PdfTableSub_1["default"].getTotalCell(''),
            PdfTableSub_1["default"].getTotalCell(''),
            PdfTableSub_1["default"].getTotalCell(''),
            PdfTableSub_1["default"].getTotalCell('Report Total'),
            PdfTableSub_1["default"].getTotalCell("" + common_1.milesToMetric(drivesSummaryLine.distanceInMiles, report.isMetricSystem)),
            PdfTableSub_1["default"].getTotalCell("" + common_1.roundNumber(drivesSummaryLine.value)),
            PdfTableSub_1["default"].getTotalCell("" + common_1.roundNumber(drivesSummaryLine.parking)),
            PdfTableSub_1["default"].getTotalCell("" + common_1.roundNumber(drivesSummaryLine.tolls)),
            PdfTableSub_1["default"].getTotalCell("" + common_1.roundNumber(drivesSummaryLine.tolls + drivesSummaryLine.parking + drivesSummaryLine.value)),
        ]);
        var drivesTable = new PdfTable_1["default"]('tableExample', [0, 10, 0, 10], drivesTableSub, new PdfLayout_1["default"](PdfLayout_1["default"].getTableHeaderFillColorFunc(), PdfLayout_1["default"].getTableHeaderHLineWidthFunc()));
        pd.content.push(drivesTable);
        return pd;
    };
    return PdfDescription;
}());
exports["default"] = PdfDescription;