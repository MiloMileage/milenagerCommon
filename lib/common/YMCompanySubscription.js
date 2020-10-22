"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
var YMCompanySubscriptionStatus;
(function (YMCompanySubscriptionStatus) {
    YMCompanySubscriptionStatus["TRIAL"] = "TRIAL";
    YMCompanySubscriptionStatus["ACTIVE"] = "ACTIVE";
    YMCompanySubscriptionStatus["CANCELED"] = "CANCELED";
})(YMCompanySubscriptionStatus = exports.YMCompanySubscriptionStatus || (exports.YMCompanySubscriptionStatus = {}));
var YMCompanySubscriptionType;
(function (YMCompanySubscriptionType) {
    YMCompanySubscriptionType["NONE"] = "NONE";
    YMCompanySubscriptionType["MONTHLY"] = "MONTHLY";
})(YMCompanySubscriptionType = exports.YMCompanySubscriptionType || (exports.YMCompanySubscriptionType = {}));
class YMCompanySubscription {
    constructor(status, subscriptionType, expiresAt, stripe_transaction_id) {
        this.status = status;
        this.subscriptionType = subscriptionType;
        this.expiresAt = expiresAt;
        this.stripe_transaction_id = stripe_transaction_id;
    }
    isUnderSubscription() {
        return Moment(this.expiresAt).isAfter(Moment());
    }
    isCanceledAndUnderSubscription() {
        return this.status === YMCompanySubscriptionStatus.CANCELED && Moment(this.expiresAt).isAfter(Moment());
    }
    daysTillExpire() {
        return Moment(this.expiresAt).diff(Moment(), 'days');
    }
    isTrial() {
        return this.status === YMCompanySubscriptionStatus.TRIAL && this.subscriptionType == YMCompanySubscriptionType.NONE;
    }
    static createTrialSubscription(days) {
        return new YMCompanySubscription(YMCompanySubscriptionStatus.TRIAL, YMCompanySubscriptionType.NONE, Moment().startOf('day').add(days, 'day').toDate(), undefined);
    }
}
YMCompanySubscription.fromObject = function (obj) {
    if (obj == null)
        return YMCompanySubscription.createTrialSubscription(7);
    return new YMCompanySubscription(obj.status, obj.subscriptionType, obj.expiresAt, obj.stripe_transaction_id);
};
exports.default = YMCompanySubscription;
//# sourceMappingURL=YMCompanySubscription.js.map