"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMSubscription {
    constructor(subscriptionType, subscriptionDateRanges) {
        this.subscriptionType = subscriptionType;
        this.subscriptionDateRanges = subscriptionDateRanges;
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
}
// tslint:disable-next-line:member-ordering
YMSubscription.fromObject = function (obj) {
    if (obj == null)
        return new YMSubscription(YMSubscription.subscriptionsTypes.none, new Array());
    return new YMSubscription(obj.subscriptionType, obj.subscriptionDateRanges);
};
YMSubscription.subscriptionsTypes = {
    none: 'none',
    annual: 'anual',
    monthly: 'monthly'
};
exports.default = YMSubscription;
//# sourceMappingURL=YMSubscription.js.map