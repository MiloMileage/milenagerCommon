"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PdfText_1 = require("./PdfText");
const PdfTable_1 = require("./PdfTable");
const PdfTableSub_1 = require("./PdfTableSub");
const PdfLayout_1 = require("./PdfLayout");
const YMReportVehicleLine_1 = require("./../common/YMReportVehicleLine");
const YMReportLine_1 = require("./../common/YMReportLine");
const Moment = require("moment");
const common_1 = require("./../components/common");
const PdfImage_1 = require("./PdfImage");
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
        return new PdfText_1.default(`(${currentPage} of ${pageCount})         Created using ThisIsMilo.com for ${name}, ${project}, ${customerDetails}      Submitted By: ______________________     Date: ______________________     Approved: ______________________`, [30, 10, 0, 10], undefined, false, false, 'black', 10, 'left');
    };
};
PdfDescription.getHeaderFunc = (name, dateRanage, title) => {
    return (currentPage, pageCount) => {
        return new PdfText_1.default(`${title} (${Moment.utc(new Date(dateRanage.getStartDateLocal())).format('MMMM Do YYYY')} to ${Moment.utc(new Date(dateRanage.getEndDateLocal())).format('MMMM Do YYYY')}) - ${name}`, [30, 8, 30, 30], 'header', false, true, 'black', undefined, 'left');
    };
};
PdfDescription.fromReport = function (report) {
    const pd = PdfDescription.fromObject(undefined);
    pd.pageOrientation = 'landscape';
    pd.pageMargins = [30, 30, 30, 30];
    pd.footer = PdfDescription.getFooterFunc(report.name, report.project, report.customerDetails);
    pd.header = PdfDescription.getHeaderFunc(report.name, report.dateRange, 'Mileage Report');
    pd.content = new Array();
    // Add customer details table
    const customerDetailsTableSub = new PdfTableSub_1.default(['200', '*'], new Array());
    customerDetailsTableSub.body.push([
        PdfTableSub_1.default.getHeaderTableCell('Name'),
        PdfTableSub_1.default.getHeaderTableCell('Notes'),
    ]);
    customerDetailsTableSub.body.push([
        PdfTableSub_1.default.getTableCell(report.name),
        PdfTableSub_1.default.getTableCell(report.details),
    ]);
    const customerDetailsTable = new PdfTable_1.default('tableExample', [0, 10, 0, 10], customerDetailsTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), undefined));
    pd.content.push(customerDetailsTable);
    // Add rates table
    const ratesTableSub = new PdfTableSub_1.default(['*', '*'], new Array());
    ratesTableSub.body.push([
        PdfTableSub_1.default.getHeaderTableCell('Purpose'),
        PdfTableSub_1.default.getHeaderTableCell(`Rate (per ${report.DistanceUnit(report.userSettings.personalSettings.isMetricSystem)})`),
    ]);
    report.rates.map(rate => {
        ratesTableSub.body.push([
            PdfTableSub_1.default.getTableCell(rate.purpose),
            PdfTableSub_1.default.getTableCell(rate.rate),
        ]);
    });
    const ratesTable = new PdfTable_1.default('tableExample', [0, 10], ratesTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), undefined));
    pd.content.push(ratesTable);
    // Add business vehicles table
    pd.content.push(new PdfText_1.default('Report Summary (Business)', undefined, 'subheader', undefined, undefined, undefined, undefined));
    const businessVehiclesTableSub = new PdfTableSub_1.default(['*', '*', '*', '*', '*', '*', '*'], new Array());
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
            PdfTableSub_1.default.getTableCell(vl.vehicle),
            PdfTableSub_1.default.getTableCell(`${common_1.milesToMetric(vl.odometerRead, report.isMetricSystem)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.milesToMetric(vl.miles, report.isMetricSystem)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.roundNumber(vl.mileageValue)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.roundNumber(vl.parkingValue)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.roundNumber(vl.tollsValue)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.roundNumber(vl.totalValue)}`),
        ]);
    });
    businessVehiclesTableSub.body.push([
        PdfTableSub_1.default.getTotalCell(''),
        PdfTableSub_1.default.getTotalCell('Total'),
        PdfTableSub_1.default.getTotalCell(`${common_1.milesToMetric(businessSummaryLine.miles, report.isMetricSystem)}`),
        PdfTableSub_1.default.getTotalCell(`${common_1.roundNumber(businessSummaryLine.mileageValue)}`),
        PdfTableSub_1.default.getTotalCell(`${common_1.roundNumber(businessSummaryLine.parkingValue)}`),
        PdfTableSub_1.default.getTotalCell(`${common_1.roundNumber(businessSummaryLine.tollsValue)}`),
        PdfTableSub_1.default.getTotalCell(`${common_1.roundNumber(businessSummaryLine.totalValue)}`),
    ]);
    const businessVehiclesTable = new PdfTable_1.default('tableExample', undefined, businessVehiclesTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), PdfLayout_1.default.getTableHeaderHLineWidthFunc()));
    pd.content.push(businessVehiclesTable);
    // Add personal vehicles table
    pd.content.push(new PdfText_1.default('Report Summary (Personal)', undefined, 'subheader', undefined, undefined, undefined, undefined));
    const vehiclesTableSub = new PdfTableSub_1.default(['*', '*', '*', '*', '*', '*', '*'], new Array());
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
    report.vehiclePersonalLines.forEach(vl => {
        summaryLine.miles += vl.miles;
        summaryLine.parkingValue += vl.parkingValue;
        summaryLine.tollsValue += vl.tollsValue;
        summaryLine.mileageValue += vl.mileageValue;
        summaryLine.totalValue += vl.totalValue;
        vehiclesTableSub.body.push([
            PdfTableSub_1.default.getTableCell(vl.vehicle),
            PdfTableSub_1.default.getTableCell(`${common_1.milesToMetric(vl.odometerRead, report.isMetricSystem)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.milesToMetric(vl.miles, report.isMetricSystem)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.roundNumber(vl.mileageValue)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.roundNumber(vl.parkingValue)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.roundNumber(vl.tollsValue)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.roundNumber(vl.totalValue)}`),
        ]);
    });
    vehiclesTableSub.body.push([
        PdfTableSub_1.default.getTotalCell(''),
        PdfTableSub_1.default.getTotalCell('Total'),
        PdfTableSub_1.default.getTotalCell(`${common_1.milesToMetric(summaryLine.miles, report.isMetricSystem)}`),
        PdfTableSub_1.default.getTotalCell(`${common_1.roundNumber(summaryLine.mileageValue)}`),
        PdfTableSub_1.default.getTotalCell(`${common_1.roundNumber(summaryLine.parkingValue)}`),
        PdfTableSub_1.default.getTotalCell(`${common_1.roundNumber(summaryLine.tollsValue)}`),
        PdfTableSub_1.default.getTotalCell(`${common_1.roundNumber(summaryLine.totalValue)}`),
    ]);
    const vehiclesTable = new PdfTable_1.default('tableExample', undefined, vehiclesTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), PdfLayout_1.default.getTableHeaderHLineWidthFunc()));
    pd.content.push(vehiclesTable);
    // Add drives table
    pd.content.push(new PdfText_1.default('Mileage Log', undefined, 'subheader', undefined, undefined, undefined, undefined, undefined, 'before'));
    const drivesSummaryLine = YMReportLine_1.default.fromObject(undefined);
    const drivesTableSub = new PdfTableSub_1.default([14, 110, 30, 110, 130, 60, 60, 40, 50, 40, '*'], new Array());
    drivesTableSub.body.push([
        PdfTableSub_1.default.getHeaderTableCell('#'),
        PdfTableSub_1.default.getHeaderTableCell('When'),
        PdfTableSub_1.default.getHeaderTableCell('Rate ($)'),
        PdfTableSub_1.default.getHeaderTableCell('Why'),
        PdfTableSub_1.default.getHeaderTableCell(`From -> To (${report.isMetricSystem ? 'km' : 'mi'})`),
        PdfTableSub_1.default.getHeaderTableCell(`Vehicle (${report.isMetricSystem ? 'km' : 'mi'})`),
        PdfTableSub_1.default.getHeaderTableCell(`Distance (${report.isMetricSystem ? 'km' : 'mi'})`),
        PdfTableSub_1.default.getHeaderTableCell(`Value ($)`),
        PdfTableSub_1.default.getHeaderTableCell('Parking ($)'),
        PdfTableSub_1.default.getHeaderTableCell('Tolls ($)'),
        PdfTableSub_1.default.getHeaderTableCell('Total ($)'),
    ]);
    report.lines.forEach((dl, index) => {
        drivesSummaryLine.distanceInMiles += dl.distanceInMiles;
        drivesSummaryLine.parking += dl.parking;
        drivesSummaryLine.tolls += dl.tolls;
        drivesSummaryLine.value += dl.value;
        drivesTableSub.body.push([
            PdfTableSub_1.default.getTableCell(`${index + 1}`),
            PdfTableSub_1.default.getTableCell(Moment.utc(dl.when).format('MMMM Do YYYY, h:mm a')),
            PdfTableSub_1.default.getTableCell(`${dl.rate}`),
            PdfTableSub_1.default.getTableCell(dl.purpose),
            PdfTableSub_1.default.getTableCell(dl.fromToPersonalized),
            PdfTableSub_1.default.getTableCell(dl.vehicle),
            PdfTableSub_1.default.getTableCell(`${common_1.milesToMetric(dl.distanceInMiles, report.isMetricSystem)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.roundNumber(dl.value)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.roundNumber(dl.parking)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.roundNumber(dl.tolls)}`),
            PdfTableSub_1.default.getTableCell(`${common_1.roundNumber(dl.tolls + dl.parking + dl.value)}`),
        ]);
    });
    drivesTableSub.body.push([
        PdfTableSub_1.default.getTotalCell(''),
        PdfTableSub_1.default.getTotalCell(''),
        PdfTableSub_1.default.getTotalCell(''),
        PdfTableSub_1.default.getTotalCell(''),
        PdfTableSub_1.default.getTotalCell(''),
        PdfTableSub_1.default.getTotalCell('Report Total'),
        PdfTableSub_1.default.getTotalCell(`${common_1.milesToMetric(drivesSummaryLine.distanceInMiles, report.isMetricSystem)}`),
        PdfTableSub_1.default.getTotalCell(`${common_1.roundNumber(drivesSummaryLine.value)}`),
        PdfTableSub_1.default.getTotalCell(`${common_1.roundNumber(drivesSummaryLine.parking)}`),
        PdfTableSub_1.default.getTotalCell(`${common_1.roundNumber(drivesSummaryLine.tolls)}`),
        PdfTableSub_1.default.getTotalCell(`${common_1.roundNumber(drivesSummaryLine.tolls + drivesSummaryLine.parking + drivesSummaryLine.value)}`),
    ]);
    const drivesTable = new PdfTable_1.default('tableExample', [0, 10, 0, 10], drivesTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), PdfLayout_1.default.getTableHeaderHLineWidthFunc()));
    pd.content.push(drivesTable);
    return pd;
};
PdfDescription.fromTransactionReport = function (report, getBase64ImageFromURL) {
    return __awaiter(this, void 0, void 0, function* () {
        const pd = PdfDescription.fromObject(undefined);
        pd.pageOrientation = 'landscape';
        pd.pageMargins = [30, 30, 30, 30];
        pd.footer = PdfDescription.getFooterFunc(report.name, report.project, report.customerDetails);
        pd.header = PdfDescription.getHeaderFunc(report.name, report.dateRange, 'Expense and Income Report');
        pd.content = new Array();
        // Add customer details table
        const customerDetailsTableSub = new PdfTableSub_1.default([200, '*'], new Array());
        customerDetailsTableSub.body.push([
            PdfTableSub_1.default.getHeaderTableCell('Name'),
            PdfTableSub_1.default.getHeaderTableCell('Notes'),
        ]);
        customerDetailsTableSub.body.push([
            PdfTableSub_1.default.getTableCell(report.name),
            PdfTableSub_1.default.getTableCell(report.details),
        ]);
        const customerDetailsTable = new PdfTable_1.default('tableExample', [0, 10, 0, 10], customerDetailsTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), undefined, true));
        pd.content.push(customerDetailsTable);
        pd.content.push(new PdfText_1.default('Income Summary', undefined, 'subheader', undefined, undefined, undefined, undefined));
        // Add Income Summary
        const incomeTableSub = new PdfTableSub_1.default([200, '*'], new Array());
        incomeTableSub.body.push([
            PdfTableSub_1.default.getHeaderTableCell('Business'),
            PdfTableSub_1.default.getHeaderTableCell(`Amount (${report.moneySymbol})`),
        ]);
        Object.keys(report.incomeBySource).map(business => {
            incomeTableSub.body.push([
                PdfTableSub_1.default.getTableCell(business),
                PdfTableSub_1.default.getTableCell(`${Number(report.incomeBySource[business]).toFixed(2)}`),
            ]);
        });
        incomeTableSub.body.push([
            PdfTableSub_1.default.getTableCell('TOTAL:'),
            PdfTableSub_1.default.getTableCell(`${Number(report.getIncomeAmount()).toFixed(2)}`),
        ]);
        const incomeTable = new PdfTable_1.default('tableExample', [0, 10], incomeTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), undefined));
        pd.content.push(incomeTable);
        pd.content.push(new PdfText_1.default('Business Expenses Summary', undefined, 'subheader', undefined, undefined, undefined, undefined));
        // Add Expense Summary
        const expenseTableSub = new PdfTableSub_1.default([200, '*'], new Array());
        expenseTableSub.body.push([
            PdfTableSub_1.default.getHeaderTableCell('Expense Category'),
            PdfTableSub_1.default.getHeaderTableCell(`Amount (${report.moneySymbol})`),
        ]);
        Object.keys(report.expenseByCategory).map(category => {
            expenseTableSub.body.push([
                PdfTableSub_1.default.getTableCell(category),
                PdfTableSub_1.default.getTableCell(`${Number(report.expenseByCategory[category]).toFixed(2)}`),
            ]);
        });
        expenseTableSub.body.push([
            PdfTableSub_1.default.getTableCell('TOTAL:'),
            PdfTableSub_1.default.getTableCell(`${Number(report.getExpensesAmount()).toFixed(2)}`),
        ]);
        const expenseTable = new PdfTable_1.default('tableExample', [0, 10], expenseTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), undefined));
        pd.content.push(expenseTable);
        // Add income table
        pd.content.push(new PdfText_1.default('Income Log', undefined, 'subheader', undefined, undefined, undefined, undefined, undefined, 'before'));
        const incomeLogTableSub = new PdfTableSub_1.default([14, 110, 110, 60, 60, '*'], new Array());
        incomeLogTableSub.body.push([
            PdfTableSub_1.default.getHeaderTableCell('#'),
            PdfTableSub_1.default.getHeaderTableCell('When'),
            PdfTableSub_1.default.getHeaderTableCell('Business'),
            PdfTableSub_1.default.getHeaderTableCell(`Amount (${report.moneySymbol})`),
            PdfTableSub_1.default.getHeaderTableCell(`Receipt #`),
            PdfTableSub_1.default.getHeaderTableCell('Note'),
        ]);
        const incomeLinesWithReceipts = [];
        report.lines.filter(x => !x.isExpense).forEach((dl, index) => {
            let hasReceipt = false;
            if (dl.receiptImageUrl && dl.receiptImageUrl.length > 0) {
                incomeLinesWithReceipts.push(dl);
                hasReceipt = true;
            }
            incomeLogTableSub.body.push([
                PdfTableSub_1.default.getTableCell(`${index + 1}`),
                PdfTableSub_1.default.getTableCell(Moment.utc(dl.when).format('MMMM Do YYYY')),
                PdfTableSub_1.default.getTableCell(`${dl.incomeSource}`),
                PdfTableSub_1.default.getTableCell(`${Number(dl.amount).toFixed(2)}`),
                PdfTableSub_1.default.getTableCell(`${hasReceipt ? `#${incomeLinesWithReceipts.length}` : ''}`),
                PdfTableSub_1.default.getTableCell(dl.note),
            ]);
        });
        incomeLogTableSub.body.push([
            PdfTableSub_1.default.getTableCell(``),
            PdfTableSub_1.default.getTableCell(''),
            PdfTableSub_1.default.getTableCell('TOTAL:'),
            PdfTableSub_1.default.getTableCell(`${Number(report.getIncomeAmount()).toFixed(2)}`),
            PdfTableSub_1.default.getTableCell(``),
            PdfTableSub_1.default.getTableCell(``),
        ]);
        const incomeLogTable = new PdfTable_1.default('tableExample', [0, 10, 0, 10], incomeLogTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), PdfLayout_1.default.getTableHeaderHLineWidthFunc()));
        pd.content.push(incomeLogTable);
        // Add Expense table
        pd.content.push(new PdfText_1.default('Business Expenses Log', undefined, 'subheader', undefined, undefined, undefined, undefined, undefined, 'before'));
        const expenseLogTableSub = new PdfTableSub_1.default([14, 110, 110, 110, 60, 60, '*'], new Array());
        expenseLogTableSub.body.push([
            PdfTableSub_1.default.getHeaderTableCell('#'),
            PdfTableSub_1.default.getHeaderTableCell('When'),
            PdfTableSub_1.default.getHeaderTableCell('Expense Category'),
            PdfTableSub_1.default.getHeaderTableCell('Merchant'),
            PdfTableSub_1.default.getHeaderTableCell(`Amount (${report.moneySymbol})`),
            PdfTableSub_1.default.getHeaderTableCell(`Receipt #`),
            PdfTableSub_1.default.getHeaderTableCell('Note'),
        ]);
        const expenseLinesWithReceipts = [];
        report.lines.filter(x => x.isExpense).forEach((dl, index) => {
            let hasReceipt = false;
            if (dl.receiptImageUrl && dl.receiptImageUrl.length > 0) {
                expenseLinesWithReceipts.push(dl);
                hasReceipt = true;
            }
            expenseLogTableSub.body.push([
                PdfTableSub_1.default.getTableCell(`${index + 1}`),
                PdfTableSub_1.default.getTableCell(Moment.utc(dl.when).format('MMMM Do YYYY')),
                PdfTableSub_1.default.getTableCell(`${dl.expenseCategory}`),
                PdfTableSub_1.default.getTableCell(`${dl.merchantName}`),
                PdfTableSub_1.default.getTableCell(`${Number(dl.amount).toFixed(2)}`),
                PdfTableSub_1.default.getTableCell(`${hasReceipt ? `#${expenseLinesWithReceipts.length}` : ''}`),
                PdfTableSub_1.default.getTableCell(dl.note),
            ]);
        });
        expenseLogTableSub.body.push([
            PdfTableSub_1.default.getTableCell(``),
            PdfTableSub_1.default.getTableCell(''),
            PdfTableSub_1.default.getTableCell(``),
            PdfTableSub_1.default.getTableCell('TOTAL:'),
            PdfTableSub_1.default.getTableCell(`${Number(report.getExpensesAmount()).toFixed(2)}`),
            PdfTableSub_1.default.getTableCell(``),
            PdfTableSub_1.default.getTableCell(``),
        ]);
        const expenseLogTable = new PdfTable_1.default('tableExample', [0, 10, 0, 10], expenseLogTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), PdfLayout_1.default.getTableHeaderHLineWidthFunc()));
        pd.content.push(expenseLogTable);
        if (incomeLinesWithReceipts.length > 0) {
            pd.content.push(new PdfText_1.default('Receipts (Income)', undefined, 'subheader', undefined, undefined, undefined, undefined, undefined, 'before'));
            const incomeReceiptsTableSub = new PdfTableSub_1.default([50, '*'], new Array());
            incomeReceiptsTableSub.body.push([
                PdfTableSub_1.default.getHeaderTableCell(`Receipt #`),
                PdfTableSub_1.default.getHeaderTableCell(``),
            ]);
            let ind = 1;
            for (const line of incomeLinesWithReceipts) {
                incomeReceiptsTableSub.body.push([
                    PdfTableSub_1.default.getHeaderTableCell(`#${ind}`),
                    new PdfImage_1.default(yield getBase64ImageFromURL(line.receiptImageUrl), 230, 230),
                ]);
                ind += 1;
            }
            pd.content.push(new PdfTable_1.default('tableExample', [0, 10, 0, 10], incomeReceiptsTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), PdfLayout_1.default.getTableHeaderHLineWidthFunc(false))));
        }
        if (expenseLinesWithReceipts.length > 0) {
            pd.content.push(new PdfText_1.default('Receipts (Expense)', undefined, 'subheader', undefined, undefined, undefined, undefined, undefined, 'before'));
            const expenseReceiptsTableSub = new PdfTableSub_1.default([50, '*'], new Array());
            expenseReceiptsTableSub.body.push([
                PdfTableSub_1.default.getHeaderTableCell(`Receipt #`),
                PdfTableSub_1.default.getHeaderTableCell(``),
            ]);
            let ind = 1;
            for (const line of expenseLinesWithReceipts) {
                expenseReceiptsTableSub.body.push([
                    PdfTableSub_1.default.getHeaderTableCell(`#${ind}`),
                    new PdfImage_1.default(yield getBase64ImageFromURL(line.receiptImageUrl), 230, 230),
                ]);
                ind += 1;
            }
            pd.content.push(new PdfTable_1.default('tableExample', [0, 10, 0, 10], expenseReceiptsTableSub, new PdfLayout_1.default(PdfLayout_1.default.getTableHeaderFillColorFunc(), PdfLayout_1.default.getTableHeaderHLineWidthFunc(false))));
        }
        return pd;
    });
};
exports.default = PdfDescription;
//# sourceMappingURL=PdfDescription.js.map