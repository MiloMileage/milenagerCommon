"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMReceipt_1 = require("./YMReceipt");
const YMMerchant_1 = require("./YMMerchant");
class YMTransaction {
    constructor(transactionId, incomeSourceId, expenseCategoryId, time, amount, notes, receipts, merchant) {
        this.transactionId = transactionId;
        this.incomeSourceId = incomeSourceId;
        this.expenseCategoryId = expenseCategoryId;
        this.time = new Date(time);
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
}
// tslint:disable-next-line:member-ordering
YMTransaction.fromObject = function (obj) {
    if (obj == null)
        return new YMTransaction('', '', '', new Date(), 0, '', [], undefined);
    return new YMTransaction(obj.transactionId, obj.incomeSourceId, obj.expenseCategoryId, obj.time, obj.amount, obj.notes, obj.receipts, obj.merchant);
};
exports.default = YMTransaction;
//# sourceMappingURL=YMTransaction.js.map