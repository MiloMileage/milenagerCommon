"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMExpenseCategory_1 = require("./YMExpenseCategory");
const YMIncomeSource_1 = require("./YMIncomeSource");
class YMTransactionsReportLine {
    constructor(when, amount, note, isExpense, merchantName, expenseCategory, incomeSource, receiptImageUrl) {
        this.when = when;
        this.amount = amount;
        this.note = note;
        this.isExpense = isExpense;
        this.merchantName = merchantName;
        this.expenseCategory = expenseCategory;
        this.incomeSource = incomeSource;
        this.receiptImageUrl = receiptImageUrl;
    }
    static fromTransaction(transaction, userSettings, globalSettings) {
        return new YMTransactionsReportLine(transaction.getTime(), transaction.amount, transaction.notes, transaction.isExpense(), transaction.merchant.name, YMExpenseCategory_1.default.getNameOrDefault(transaction.expenseCategoryId, 'n/a', userSettings, globalSettings, false), YMIncomeSource_1.default.getNameOrDefault(transaction.incomeSourceId, 'n/a', userSettings, globalSettings, false), transaction.receipts.length > 0 ? transaction.receipts[0].imageUrl : '');
    }
}
// tslint:disable-next-line:member-ordering
YMTransactionsReportLine.fromObject = function (obj) {
    if (obj == null)
        return new YMTransactionsReportLine(new Date(), 0, '', true, '', '', '', '');
    return new YMTransactionsReportLine(obj.when, obj.amount, obj.note, obj.isExpense, obj.merchantName, obj.expenseCategory, obj.incomeSource, obj.receiptImageUrl);
};
exports.default = YMTransactionsReportLine;
//# sourceMappingURL=YMTransactionsReportLine.js.map