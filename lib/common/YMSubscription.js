"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
class YMSubscription {
    constructor(subscriptionType, isActive, renewalDate, latestPaidDate, receipt, isIos) {
        this.subscriptionType = subscriptionType;
        this.isActive = isActive;
        this.renewalDate = renewalDate;
        this.latestPaidDate = latestPaidDate;
        this.receipt = receipt;
        this.isIos = isIos;
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
    static createDummySubscription() {
        return new YMSubscription(YMSubscription.subscriptionsTypes.none, null, null, null, null, true);
    }
}
// tslint:disable-next-line:member-ordering
YMSubscription.fromIosReceipt = function (obj) {
    const appleReceipt = obj;
    const latestPaidDate = YMSubscription.getLatestPaidDate(appleReceipt);
    const isActive = appleReceipt.pending_renewal_info[0].auto_renew_status === '1';
    const subscriptionType = !isActive ? YMSubscription.subscriptionsTypes.none : appleReceipt.pending_renewal_info[0].auto_renew_product_id.indexOf('annualy') === -1 ? YMSubscription.subscriptionsTypes.monthly : YMSubscription.subscriptionsTypes.annual;
    const receipt = appleReceipt;
    const renewalDate = isActive ? Moment(latestPaidDate).add(1, subscriptionType === YMSubscription.subscriptionsTypes.monthly ? 'month' : 'year').toDate() : null;
    return new YMSubscription(subscriptionType, isActive, renewalDate, latestPaidDate, receipt, true);
};
YMSubscription.subscriptionsTypes = {
    none: 'none',
    annual: 'anual',
    monthly: 'monthly'
};
exports.default = YMSubscription;
//# sourceMappingURL=YMSubscription.js.map