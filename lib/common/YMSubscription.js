"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
class YMSubscription {
    constructor(subscriptionType, isSetToRenew, renewalDate, latestPaidDate, receipt, isIos, userId) {
        this.subscriptionType = subscriptionType;
        this.isSetToRenew = isSetToRenew;
        this.renewalDate = renewalDate;
        this.latestPaidDate = latestPaidDate;
        this.receipt = receipt;
        this.isIos = isIos;
        this.userId = userId;
    }
    isUnderSubscription() {
        return Moment(this.latestPaidDate).isAfter(Moment());
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
        let latestDate = null;
        appleReceipt.latest_receipt_info.forEach(rec => {
            const currDate = new Date(parseInt(rec.expires_date_ms));
            if (latestDate == null || Moment(latestDate).isBefore(Moment(currDate))) {
                latestDate = currDate;
            }
        });
        return latestDate;
    }
    static createDummySubscription(userId) {
        return new YMSubscription(YMSubscription.subscriptionsTypes.none, null, null, null, null, true, userId);
    }
}
// tslint:disable-next-line:member-ordering
YMSubscription.fromIosReceipt = function (obj, userId) {
    const appleReceipt = obj;
    const latestPaidDate = YMSubscription.getLatestPaidDate(appleReceipt);
    const isSetToRenew = appleReceipt.pending_renewal_info[0].auto_renew_status === '1';
    const receipt = appleReceipt;
    const subscription = new YMSubscription(YMSubscription.subscriptionsTypes.none, isSetToRenew, null, latestPaidDate, receipt, true, userId);
    const subscriptionType = !subscription.isUnderSubscription() ? YMSubscription.subscriptionsTypes.none : appleReceipt.pending_renewal_info[0].auto_renew_product_id.indexOf('annualy') === -1 ? YMSubscription.subscriptionsTypes.monthly : YMSubscription.subscriptionsTypes.annual;
    subscription.subscriptionType = subscriptionType;
    subscription.renewalDate = isSetToRenew ? Moment(latestPaidDate).add(1, subscriptionType === YMSubscription.subscriptionsTypes.monthly ? 'month' : 'year').toDate() : null;
    return subscription;
};
YMSubscription.subscriptionsTypes = {
    none: 'none',
    annual: 'anual',
    monthly: 'monthly'
};
exports.default = YMSubscription;
//# sourceMappingURL=YMSubscription.js.map