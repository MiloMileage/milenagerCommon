"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PdfText_1 = require("./PdfText");
const PdfTable_1 = require("./PdfTable");
const PdfTableSub_1 = require("./PdfTableSub");
const PdfLayout_1 = require("./PdfLayout");
const YMReportVehicleLine_1 = require("./../common/YMReportVehicleLine");
const YMReportLine_1 = require("./../common/YMReportLine");
const Moment = require("moment");
const common_1 = require("./../components/common");
class PdfDescription {
    constructor(pageOrientation, pageMargins, content, footer, header) {
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
}
PdfDescription.onFooter = (currentPage, pageCount) => {
    return new PdfText_1.default('', [], '', false, false, '', 10);
};
PdfDescription.onHeader = (currentPage, pageCount) => {
    return new PdfText_1.default('', [], '', false, false, '', 10);
};
PdfDescription.fromObject = function (obj) {
    if (obj == null)
        return new PdfDescription('', [], [], PdfDescription.onFooter, PdfDescription.onHeader);
    return new PdfDescription(obj.pageOrientation, obj.pageMargins, obj.content, obj.footer, obj.header);
};
PdfDescription.getFooterFunc = (name, project, customerDetails) => {
    return (currentPage, pageCount) => {
        return new PdfText_1.default(`(${currentPage} of ${pageCount})         Created using ThisIsMilo.com for ${name}, ${project}, ${customerDetails}      Submitted By: ______________     Date: ___________     Approved: ___________`, [30], undefined, false, false, 'black', 8, 'left');
    };
};
PdfDescription.getHeaderFunc = (name, dateRanage) => {
    return (currentPage, pageCount) => {
        return new PdfText_1.default(`Mileage Report (${Moment(dateRanage.endDate).format('MMMM Do YYYY')} to ${Moment(dateRanage.startDate).format('MMMM Do YYYY')}) - ${name}`, [30, 8, 30, 30], 'header', false, false, 'black', 8, 'left');
    };
};
PdfDescription.fromReport = function (report) {
    const pd = PdfDescription.fromObject(undefined);
    pd.pageOrientation = 'landscape';
    pd.pageMargins = [30, 30, 30, 30];
    pd.footer = PdfDescription.getFooterFunc(report.name, report.project, report.customerDetails);
    pd.header = PdfDescription.getHeaderFunc(report.name, report.dateRange);
    pd.content = new Array();
    // Add customer details table
    const customerDetailsTableSub = new PdfTableSub_1.default([], new Array());
    customerDetailsTableSub.body.push([
        PdfTableSub_1.default.getHeaderTableCell('Name'),
        PdfTableSub_1.default.getHeaderTableCell('Project'),
        PdfTableSub_1.default.getHeaderTableCell('Customer'),
        PdfTableSub_1.default.getHeaderTableCell('Business Rate'),
        PdfTableSub_1.default.getHeaderTableCell('Charity Rate'),
        PdfTableSub_1.default.getHeaderTableCell('Moving Rate'),
        PdfTableSub_1.default.getHeaderTableCell('Medical Rate'),
        PdfTableSub_1.default.getHeaderTableCell('Details'),
    ]);
    customerDetailsTableSub.body.push([
        PdfTableSub_1.default.getHeaderTableCell(report.name),
        PdfTableSub_1.default.getHeaderTableCell(report.project),
        PdfTableSub_1.default.getHeaderTableCell(report.customerDetails),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(Math.round(report.businessRateInMiles * 1000) / 1000, report.isMetricSystem)} $\\${report.isMetricSystem ? 'km' : 'mi'}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(Math.round(report.charityRateInMiles * 1000) / 1000, report.isMetricSystem)} $\\${report.isMetricSystem ? 'km' : 'mi'}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(Math.round(report.movingRateInMiles * 1000) / 1000, report.isMetricSystem)} $\\${report.isMetricSystem ? 'km' : 'mi'}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(Math.round(report.medicalRateInMiles * 1000) / 1000, report.isMetricSystem)} $\\${report.isMetricSystem ? 'km' : 'mi'}`),
        PdfTableSub_1.default.getHeaderTableCell(report.details),
    ]);
    const customerDetailsTable = new PdfTable_1.default('tableExample', [], customerDetailsTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), undefined));
    pd.content.push(customerDetailsTable);
    // Add business vehicles table
    pd.content.push(new PdfText_1.default('Report Summary (Business)', [], 'subheader', undefined, undefined, undefined, undefined));
    const businessVehiclesTableSub = new PdfTableSub_1.default([], new Array());
    businessVehiclesTableSub.body.push([
        PdfTableSub_1.default.getHeaderTableCell('Vehicle'),
        PdfTableSub_1.default.getHeaderTableCell('Odometer (Start of Year)'),
        PdfTableSub_1.default.getHeaderTableCell(`Business (${report.isMetricSystem ? 'km' : 'mi'})`),
        PdfTableSub_1.default.getHeaderTableCell(`Mileage Value`),
        PdfTableSub_1.default.getHeaderTableCell('Parking Value ($)'),
        PdfTableSub_1.default.getHeaderTableCell('Tolls Value ($)'),
        PdfTableSub_1.default.getHeaderTableCell('Total Value ($)'),
    ]);
    const businessSummaryLine = new YMReportVehicleLine_1.default('', 0, 0, 0, 0, 0);
    report.vehicleBusinessLines.forEach(vl => {
        businessSummaryLine.miles += vl.miles;
        businessSummaryLine.parkingValue += vl.parkingValue;
        businessSummaryLine.tollsValue += vl.tollsValue;
        businessSummaryLine.mileageValue += vl.mileageValue;
        businessSummaryLine.totalValue += vl.totalValue;
        businessVehiclesTableSub.body.push([
            PdfTableSub_1.default.getHeaderTableCell(vl.vehicle),
            PdfTableSub_1.default.getHeaderTableCell(`${vl.odometerRead}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(vl.miles, report.isMetricSystem)}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(vl.mileageValue, report.isMetricSystem)}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(vl.parkingValue, report.isMetricSystem)}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(vl.tollsValue, report.isMetricSystem)}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(vl.totalValue, report.isMetricSystem)}`),
        ]);
    });
    businessVehiclesTableSub.body.push([
        PdfTableSub_1.default.getHeaderTableCell(''),
        PdfTableSub_1.default.getHeaderTableCell('Total'),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(businessSummaryLine.miles, report.isMetricSystem)}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(businessSummaryLine.mileageValue, report.isMetricSystem)}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(businessSummaryLine.parkingValue, report.isMetricSystem)}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(businessSummaryLine.tollsValue, report.isMetricSystem)}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(businessSummaryLine.totalValue, report.isMetricSystem)}`),
    ]);
    const businessVehiclesTable = new PdfTable_1.default('tableExample', [], businessVehiclesTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), PdfLayout_1.default.getTableHeaderHLineWidthFunc()));
    pd.content.push(businessVehiclesTable);
    // Add personal vehicles table
    pd.content.push(new PdfText_1.default('Report Summary (Personal)', [], 'subheader', undefined, undefined, undefined, undefined));
    const vehiclesTableSub = new PdfTableSub_1.default([], new Array());
    vehiclesTableSub.body.push([
        PdfTableSub_1.default.getHeaderTableCell('Vehicle'),
        PdfTableSub_1.default.getHeaderTableCell('Odometer (Start of Year)'),
        PdfTableSub_1.default.getHeaderTableCell(`Personal (${report.isMetricSystem ? 'km' : 'mi'})`),
        PdfTableSub_1.default.getHeaderTableCell(`Mileage Value`),
        PdfTableSub_1.default.getHeaderTableCell('Parking Value ($)'),
        PdfTableSub_1.default.getHeaderTableCell('Tolls Value ($)'),
        PdfTableSub_1.default.getHeaderTableCell('Total Value ($)'),
    ]);
    const summaryLine = new YMReportVehicleLine_1.default('', 0, 0, 0, 0, 0);
    report.vehicleBusinessLines.forEach(vl => {
        summaryLine.miles += vl.miles;
        summaryLine.parkingValue += vl.parkingValue;
        summaryLine.tollsValue += vl.tollsValue;
        summaryLine.mileageValue += vl.mileageValue;
        summaryLine.totalValue += vl.totalValue;
        vehiclesTableSub.body.push([
            PdfTableSub_1.default.getHeaderTableCell(vl.vehicle),
            PdfTableSub_1.default.getHeaderTableCell(`${vl.odometerRead}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(vl.miles, report.isMetricSystem)}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(vl.mileageValue, report.isMetricSystem)}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(vl.parkingValue, report.isMetricSystem)}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(vl.tollsValue, report.isMetricSystem)}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(vl.totalValue, report.isMetricSystem)}`),
        ]);
    });
    vehiclesTableSub.body.push([
        PdfTableSub_1.default.getHeaderTableCell(''),
        PdfTableSub_1.default.getHeaderTableCell('Total'),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(summaryLine.miles, report.isMetricSystem)}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(summaryLine.mileageValue, report.isMetricSystem)}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(summaryLine.parkingValue, report.isMetricSystem)}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(summaryLine.tollsValue, report.isMetricSystem)}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(summaryLine.totalValue, report.isMetricSystem)}`),
    ]);
    const vehiclesTable = new PdfTable_1.default('tableExample', [], vehiclesTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), PdfLayout_1.default.getTableHeaderHLineWidthFunc()));
    pd.content.push(vehiclesTable);
    // Add drives table
    pd.content.push(new PdfText_1.default('Mileage Log', [], 'subheader', undefined, undefined, undefined, undefined));
    const drivesSummaryLine = new YMReportLine_1.default(undefined, undefined, undefined, undefined, 0, 0, 0, 0);
    const drivesTableSub = new PdfTableSub_1.default([], new Array());
    drivesTableSub.body.push([
        PdfTableSub_1.default.getHeaderTableCell('Vehicle'),
        PdfTableSub_1.default.getHeaderTableCell('Odometer (Start of Year)'),
        PdfTableSub_1.default.getHeaderTableCell(`Business (${report.isMetricSystem ? 'km' : 'mi'})`),
        PdfTableSub_1.default.getHeaderTableCell(`Personal (${report.isMetricSystem ? 'km' : 'mi'})`),
        PdfTableSub_1.default.getHeaderTableCell(`Total Distance (${report.isMetricSystem ? 'km' : 'mi'})`),
        PdfTableSub_1.default.getHeaderTableCell(`Business Value ($)`),
        PdfTableSub_1.default.getHeaderTableCell('Parking Value ($)'),
        PdfTableSub_1.default.getHeaderTableCell('Tolls Value ($)'),
        PdfTableSub_1.default.getHeaderTableCell('Total Value ($)'),
    ]);
    report.lines.forEach(dl => {
        drivesSummaryLine.distanceInMiles += dl.distanceInMiles;
        drivesSummaryLine.parking += dl.parking;
        drivesSummaryLine.tolls += dl.tolls;
        drivesSummaryLine.value += dl.value;
        drivesTableSub.body.push([
            PdfTableSub_1.default.getHeaderTableCell(Moment(dl.when.startDate).format('MMMM Do YYYY')),
            PdfTableSub_1.default.getHeaderTableCell(dl.purpose),
            PdfTableSub_1.default.getHeaderTableCell(dl.fromTo),
            PdfTableSub_1.default.getHeaderTableCell(dl.vehicle),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(dl.distanceInMiles, report.isMetricSystem)}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(dl.value, report.isMetricSystem)}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(dl.parking, report.isMetricSystem)}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(dl.tolls, report.isMetricSystem)}`),
            PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(dl.tolls + dl.parking + dl.value, report.isMetricSystem)}`),
        ]);
    });
    drivesTableSub.body.push([
        PdfTableSub_1.default.getHeaderTableCell(''),
        PdfTableSub_1.default.getHeaderTableCell(''),
        PdfTableSub_1.default.getHeaderTableCell(''),
        PdfTableSub_1.default.getHeaderTableCell('Report Total'),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(drivesSummaryLine.distanceInMiles, report.isMetricSystem)}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(drivesSummaryLine.value, report.isMetricSystem)}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.milesToMetric(drivesSummaryLine.parking, report.isMetricSystem)}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(drivesSummaryLine.tolls, report.isMetricSystem)}`),
        PdfTableSub_1.default.getHeaderTableCell(`${common_1.metricToMiles(drivesSummaryLine.tolls + drivesSummaryLine.parking + drivesSummaryLine.value, report.isMetricSystem)}`),
    ]);
    const drivesTable = new PdfTable_1.default('tableExample', [], drivesTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), PdfLayout_1.default.getTableHeaderHLineWidthFunc()));
    pd.content.push(drivesTable);
};
exports.default = PdfDescription;
//# sourceMappingURL=PdfDescription.js.map