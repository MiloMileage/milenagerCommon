"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
const YMSubscription_1 = require("./YMSubscription");
var YMSubscriptionStatus;
(function (YMSubscriptionStatus) {
    YMSubscriptionStatus["NONE"] = "NONE";
    YMSubscriptionStatus["ACTIVE"] = "ACTIVE";
    YMSubscriptionStatus["CANCELED"] = "CANCELED";
    YMSubscriptionStatus["GRACE_PERIOD"] = "GRACE_PERIOD";
})(YMSubscriptionStatus = exports.YMSubscriptionStatus || (exports.YMSubscriptionStatus = {}));
class YMUserSubscription {
    constructor(subscriptionType, status, promoCode, expiresAt, apple_original_transaction_id, google_original_purchase_token, stripe_subscription_id) {
        this.status = status;
        this.subscriptionType = subscriptionType;
        this.promoCode = promoCode;
        this.expiresAt = expiresAt;
        this.apple_original_transaction_id = apple_original_transaction_id;
        this.google_original_purchase_token = google_original_purchase_token;
        this.stripe_subscription_id = stripe_subscription_id;
    }
    isUnderSubscription(companySubscription) {
        if (companySubscription != null && companySubscription.isUnderSubscription() && !companySubscription.isCanceledAndUnderSubscription()) {
            return true;
        }
        return Moment(this.expiresAt).isAfter(Moment());
    }
    isCanceledAndUnderSubscription(companySubscription) {
        if (companySubscription != null && companySubscription.isUnderSubscription() && !companySubscription.isCanceledAndUnderSubscription()) {
            return false;
        }
        return this.status === YMSubscriptionStatus.CANCELED && Moment(this.expiresAt).isAfter(Moment());
    }
    daysTillExpire() {
        return Moment(this.expiresAt).diff(Moment(), 'days');
    }
    isDummy() {
        return this.status === YMSubscriptionStatus.NONE && this.subscriptionType === YMSubscription_1.default.subscriptionsTypes.none;
    }
    static createDummyUserSubscription() {
        return new YMUserSubscription(YMSubscription_1.default.subscriptionsTypes.none, YMSubscriptionStatus.NONE, undefined, undefined, undefined, undefined, undefined);
    }
}
YMUserSubscription.fromObject = function (obj) {
    if (obj == null)
        return YMUserSubscription.createDummyUserSubscription();
    return new YMUserSubscription(obj.subscriptionType, obj.status, obj.promoCode, obj.expiresAt, obj.apple_original_transaction_id, obj.google_original_purchase_token, obj.stripe_subscription_id);
};
exports.default = YMUserSubscription;
//# sourceMappingURL=YMUserSubscription.js.map