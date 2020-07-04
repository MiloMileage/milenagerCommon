"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMReceipt_1 = require("./YMReceipt");
const YMMerchant_1 = require("./YMMerchant");
const moment = require("moment");
class YMTransaction {
    constructor(transactionId, incomeSourceId, expenseCategoryId, date, amount, notes, receipts, merchant) {
        this.transactionId = transactionId;
        this.incomeSourceId = incomeSourceId;
        this.expenseCategoryId = expenseCategoryId;
        this.date = date;
        this.amount = amount;
        this.notes = notes;
        this.receipts = receipts.map(x => YMReceipt_1.default.fromObject(x));
        this.merchant = YMMerchant_1.default.fromObject(merchant);
    }
    isExpense() {
        return this.expenseCategoryId != null;
    }
    isIncome() {
        return !this.isExpense();
    }
    getIncomeSourceName(userSettings) {
        const incomeSource = userSettings.incomeSources.filter(x => x.incomeSourceId === this.incomeSourceId)[0];
        return incomeSource ? incomeSource.name : '';
    }
    getReceiptImageUrl() {
        return this.receipts ? this.receipts.length > 0 ? this.receipts[0].imageUrl : '' : '';
    }
    getIncomeExpenseCategory(userSettings) {
        const expenseCategory = userSettings.expenseCategories.filter(x => x.expenseCategoryId === this.expenseCategoryId)[0];
        return expenseCategory ? expenseCategory.name : '';
    }
    getTime() {
        return YMTransaction.fromDateString(this.date);
    }
}
YMTransaction.fromDateString = (dateStr) => {
    return moment(dateStr).toDate();
};
YMTransaction.toDateString = (date) => {
    return moment(date).format('YYYYMMDD');
};
// tslint:disable-next-line:member-ordering
YMTransaction.fromObject = function (obj) {
    if (obj == null)
        return new YMTransaction('', '', '', '20200101', 0, '', [], undefined);
    return new YMTransaction(obj.transactionId, obj.incomeSourceId, obj.expenseCategoryId, obj.date, obj.amount, obj.notes, obj.receipts, obj.merchant);
};
exports.default = YMTransaction;
//# sourceMappingURL=YMTransaction.js.map