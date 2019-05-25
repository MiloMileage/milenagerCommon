"use strict";
exports.__esModule = true;
var YMSubscription = /** @class */ (function () {
    function YMSubscription(subscriptionType, subscriptionDateRanges) {
        this.subscriptionType = subscriptionType;
        this.subscriptionDateRanges = subscriptionDateRanges;
    }
    YMSubscription.prototype.isNone = function () {
        return this.subscriptionType === YMSubscription.subscriptionsTypes.none;
    };
    YMSubscription.prototype.isAnnual = function () {
        return this.subscriptionType === YMSubscription.subscriptionsTypes.annual;
    };
    YMSubscription.prototype.isMonthly = function () {
        return this.subscriptionType === YMSubscription.subscriptionsTypes.monthly;
    };
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
    return YMSubscription;
}());
exports["default"] = YMSubscription;
