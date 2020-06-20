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
    constructor(subscriptionType, status, promoCode, expiresAt, apple_original_transaction_id, google_original_purchase_token) {
        this.status = status;
        this.subscriptionType = subscriptionType;
        this.promoCode = promoCode;
        this.expiresAt = expiresAt;
        this.apple_original_transaction_id = apple_original_transaction_id;
        this.google_original_purchase_token = google_original_purchase_token;
    }
    isUnderSubscription() {
        return Moment(this.expiresAt).isAfter(Moment());
    }
    isCanceledAndUnderSubscription() {
        return this.status === YMSubscriptionStatus.CANCELED && Moment(this.expiresAt).isAfter(Moment());
    }
    daysTillExpire() {
        return Moment(this.expiresAt).diff(Moment(), 'days');
    }
    isDummy() {
        return this.status === YMSubscriptionStatus.NONE && this.subscriptionType === YMSubscription_1.default.subscriptionsTypes.none;
    }
    static createDummyUserSubscription() {
        return new YMUserSubscription(YMSubscription_1.default.subscriptionsTypes.none, YMSubscriptionStatus.NONE, undefined, undefined, undefined, undefined);
    }
}
YMUserSubscription.fromObject = function (obj) {
    if (obj == null)
        return YMUserSubscription.createDummyUserSubscription();
    return new YMUserSubscription(obj.subscriptionType, obj.status, obj.promoCode, obj.expiresAt, obj.apple_original_transaction_id, obj.google_original_purchase_token);
};
exports.default = YMUserSubscription;
//# sourceMappingURL=YMUserSubscription.js.map