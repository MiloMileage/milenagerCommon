"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./YMDateRange");
const YMUserSettings_1 = require("./YMUserSettings");
const YMGlobalUserSettings_1 = require("./YMGlobalUserSettings");
const Moment = require("moment");
const YMTransactionsReportLine_1 = require("./YMTransactionsReportLine");
const YMExpenseCategory_1 = require("./YMExpenseCategory");
const YMIncomeSource_1 = require("./YMIncomeSource");
class YMTransactionsReport {
    constructor(reportName, dateCreated, name, project, customerDetails, details, userSettings, globalSettings, dateRange, lines, expenseByCategory, incomeBySource, reportId, csvLink, pdfLink, moneySymbol) {
        this.reportName = reportName;
        this.dateCreated = dateCreated;
        this.name = name;
        this.project = project;
        this.customerDetails = customerDetails;
        this.details = details;
        this.userSettings = YMUserSettings_1.default.fromObject(userSettings);
        this.globalSettings = YMGlobalUserSettings_1.default.fromObject(globalSettings);
        this.dateRange = YMDateRange_1.default.fromObject(dateRange);
        this.lines = lines.map(line => YMTransactionsReportLine_1.default.fromObject(line));
        this.expenseByCategory = expenseByCategory;
        this.incomeBySource = incomeBySource;
        this.reportId = reportId;
        this.csvLink = csvLink;
        this.pdfLink = pdfLink;
        this.moneySymbol = moneySymbol ? moneySymbol : '$';
    }
    addTransactionValue(transaction) {
        this.lines.push(YMTransactionsReportLine_1.default.fromTransaction(transaction, this.userSettings, this.globalSettings));
        if (transaction.isExpense()) {
            const categoryName = YMExpenseCategory_1.default.getNameOrDefault(transaction.expenseCategoryId, 'n/a', this.userSettings, this.globalSettings, false);
            if (categoryName in this.expenseByCategory) {
                this.expenseByCategory[categoryName] += transaction.amount;
            }
            else {
                this.expenseByCategory[categoryName] = transaction.amount;
            }
        }
        else {
            const incomeSource = YMIncomeSource_1.default.getNameOrDefault(transaction.incomeSourceId, 'n/a', this.userSettings, this.globalSettings, false);
            if (incomeSource in this.incomeBySource) {
                this.incomeBySource[incomeSource] += transaction.amount;
            }
            else {
                this.incomeBySource[incomeSource] = transaction.amount;
            }
        }
    }
    formatMoney(amount, symbol, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            let amountStr = `${amount}`;
            let _decimalCount = Math.abs(decimalCount);
            _decimalCount = isNaN(_decimalCount) ? 2 : _decimalCount;
            const negativeSign = Number(amountStr) < 0 ? "-" : "";
            const i = parseInt(amountStr = Math.abs(Number(amountStr) || 0).toFixed(_decimalCount)).toString();
            const j = (i.length > 3) ? i.length % 3 : 0;
            return symbol + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, symbol + "1" + thousands) + (_decimalCount ? decimal + Math.abs(Number(amountStr) - Number(i)).toFixed(_decimalCount).slice(2) : "");
        }
        catch (e) {
            console.log(e);
            return symbol + "0.00";
        }
    }
    ;
    getExpensesAmount() {
        return Object.values(this.expenseByCategory).reduce((total, num) => total + num, 0);
    }
    getIncomeAmount() {
        return Object.values(this.incomeBySource).reduce((total, num) => total + num, 0);
    }
    getCsvData() {
        let data = '';
        data += '****,****,****,****,****,****,****,****,****,****\n';
        data += 'This,report,was,generated,by,ThisIsMilo.com\n';
        data += '****,****,****,****,****,****,****,****,****,****\n';
        data += '\n';
        data += '\n';
        data += 'Name,';
        data += 'Project,';
        data += 'Customer,';
        data += 'Details,';
        data += '\n';
        data += `${this.name},${this.project},${this.customerDetails},`;
        data += `${this.details}`;
        data += '\n';
        data += '\n';
        data += 'Businesses';
        data += '\n';
        data += `Name,Income`;
        Object.keys(this.incomeBySource).map(businessNAme => {
            data += '\n';
            data += `${businessNAme}, ${this.incomeBySource[businessNAme]}`;
        });
        data += '\n';
        data += '\n';
        data += 'Expenses';
        data += '\n';
        data += `Category,Expense`;
        Object.keys(this.expenseByCategory).map(category => {
            data += '\n';
            data += `${category}, ${this.expenseByCategory[category]}`;
        });
        data += '\n';
        data += '\n';
        data += 'Income Log';
        data += '\n';
        data += '#,';
        data += 'When,';
        data += 'Business,';
        data += `Note,`;
        data += `Amount,`;
        data += `Receipt,`;
        data += '\n';
        this.lines.forEach((dl, index) => {
            data += `${index + 1},`;
            data += `${Moment.utc(dl.when.getTime()).format('MMMM Do YYYY')},`;
            data += `${dl.incomeSource},`;
            data += `${dl.note},`;
            data += `${dl.amount},`;
            data += `${dl.receiptImageUrl},`;
            data += '\n';
        });
        data += `,`;
        data += `,`;
        data += `,`;
        data += `Total,`;
        data += `${this.getIncomeAmount()},`;
        data += `,`;
        data += '\n';
        data += '\n';
        data += 'Expense Log';
        data += '\n';
        data += '#,';
        data += 'When,';
        data += 'Expense Category,';
        data += 'Merchant,';
        data += `Note,`;
        data += `Amount,`;
        data += `Receipt,`;
        data += '\n';
        this.lines.forEach((dl, index) => {
            data += `${index + 1},`;
            data += `${Moment.utc(dl.when.getTime()).format('MMMM Do YYYY')},`;
            data += `${dl.expenseCategory},`;
            data += `${dl.merchantName},`;
            data += `${dl.note},`;
            data += `${dl.amount},`;
            data += `${dl.receiptImageUrl},`;
            data += '\n';
        });
        data += `,`;
        data += `,`;
        data += `,`;
        data += `Total,`;
        data += `${this.getExpensesAmount()},`;
        data += `,`;
        data += '\n';
        data += '\n';
        data += '****,****,****,****,****,****,****,****,****,****\n';
        data += 'This,report,was,generated,by,ThisIsMilo.com\n';
        data += '****,****,****,****,****,****,****,****,****,****\n';
        return data;
    }
}
// tslint:disable-next-line:member-ordering
YMTransactionsReport.fromObject = function (obj) {
    if (obj == null)
        return new YMTransactionsReport('', new Date(), '', '', '', '', YMUserSettings_1.default.fromObject(undefined), YMGlobalUserSettings_1.default.fromObject(undefined), YMDateRange_1.default.monthDateRange(new Date().getMonth(), new Date().getFullYear()), [], {}, {}, '', '', '', '$');
    return new YMTransactionsReport(obj.reportName, new Date(obj.dateCreated), obj.name, obj.project, obj.customerDetails, obj.details, obj.userSettings, obj.globalSettings, obj.dateRange, obj.lines, obj.expenseByCategory, obj.incomeBySource, obj.reportId, obj.csvLink, obj.pdfLink, obj.moneySymbol);
};
exports.default = YMTransactionsReport;
//# sourceMappingURL=YMTransactionsReport.js.map