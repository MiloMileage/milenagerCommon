"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
class YMSubscription {
    constructor(subscriptionType, isSetToRenew, renewalDate, latestPaidDate, receipt, isIos, userId, originalTransactionId) {
        this.subscriptionType = subscriptionType;
        this.isSetToRenew = isSetToRenew;
        this.renewalDate = renewalDate;
        this.latestPaidDate = latestPaidDate;
        this.receipt = receipt;
        this.isIos = isIos;
        this.userId = userId;
        this.originalTransactionId = originalTransactionId;
    }
    isUnderSubscription() {
        return Moment(this.renewalDate).isAfter(Moment());
    }
    isNone() {
        return this.subscriptionType === YMSubscription.subscriptionsTypes.none;
    }
    isAnnual() {
        return this.subscriptionType === YMSubscription.subscriptionsTypes.annual;
    }
    isMonthly() {
        return this.subscriptionType === YMSubscription.subscriptionsTypes.monthly;
    }
    isDummy() {
        return this.receipt == null;
    }
    static getLatestPaidDate(appleReceipt) {
        return new Date(parseInt(appleReceipt.receipt.expiration_date_ms));
    }
    static createDummySubscription(userId) {
        return new YMSubscription(YMSubscription.subscriptionsTypes.none, null, null, null, null, true, userId, undefined);
    }
}
exports.default = YMSubscription;
YMSubscription.subscriptionsTypes = {
    none: 'none',
    annual: 'anual',
    monthly: 'monthly'
};
//# sourceMappingURL=YMSubscription.js.map