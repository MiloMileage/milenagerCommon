"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
class YMSubscriptionProduct {
    // tslint:disable-next-line:max-line-length
    constructor(introductoryPrice, localizedSymbol, freeMonths, peneltyMonths, periodType, price, peneltyMonthPrice, iosSubscription, androidSubscription, lateChargeMonths) {
        this.introductoryPrice = introductoryPrice;
        this.localizedSymbol = localizedSymbol;
        this.freeMonths = freeMonths;
        this.peneltyMonths = peneltyMonths;
        this.periodType = periodType;
        this.price = price;
        this.peneltyMonthPrice = peneltyMonthPrice;
        this.iosSubscription = iosSubscription;
        this.androidSubscription = androidSubscription;
        this.lateChargeMonths = lateChargeMonths;
    }
    isAnnual() {
        return this.periodType === YMSubscriptionProduct.PeriodTypes.YEAR;
    }
    isMonthly() {
        return this.periodType === YMSubscriptionProduct.PeriodTypes.MONTH;
    }
}
YMSubscriptionProduct.PeriodTypes = {
    YEAR: 'YEAR',
    MONTH: 'MONTH',
};
// tslint:disable-next-line:member-ordering
YMSubscriptionProduct.fromIos = function (subscription) {
    const monthsFromId = parseInt(subscription.productId.substring(subscription.productId.length - 2).replace('_', ''));
    const introductoryPrice = parseFloat(subscription.introductoryPrice.substring(1));
    const localizedSymbol = subscription.localizedPrice.substring(0, 1);
    const periodType = subscription.subscriptionPeriodUnitIOS;
    const freeMonths = parseInt(subscription.introductoryPriceNumberOfPeriodsIOS);
    const price = parseFloat(subscription.price);
    const peneltyMonths = Math.max(0, monthsFromId - freeMonths);
    const peneltyMonthPrice = Math.max((introductoryPrice - price) / peneltyMonths, 0);
    const lateChargeMonths = Math.max(0, freeMonths - monthsFromId);
    return new YMSubscriptionProduct(introductoryPrice, localizedSymbol, freeMonths, peneltyMonths, periodType, price, peneltyMonthPrice, subscription, undefined, lateChargeMonths);
};
// tslint:disable-next-line:member-ordering
YMSubscriptionProduct.fromAndroid = function (subscription) {
    const monthsFromId = parseInt(subscription.productId.substring(subscription.productId.length - 2).replace('_', ''));
    const introductoryPrice = 0;
    const localizedSymbol = subscription.localizedPrice.substring(0, 1);
    const periodType = subscription.subscriptionPeriodAndroid === "P1Y" ? YMSubscriptionProduct.PeriodTypes.YEAR : YMSubscriptionProduct.PeriodTypes.MONTH;
    const numberOfFreeDays = Moment.duration(subscription.freeTrialPeriodAndroid).asDays();
    const freeMonths = Math.ceil(numberOfFreeDays / 30);
    const price = subscription.price;
    const peneltyMonths = Math.max(0, monthsFromId - freeMonths);
    const peneltyMonthPrice = Math.max((introductoryPrice - price) / peneltyMonths, 0);
    const lateChargeMonths = Math.max(0, freeMonths - monthsFromId);
    return new YMSubscriptionProduct(introductoryPrice, localizedSymbol, freeMonths, peneltyMonths, periodType, price, peneltyMonthPrice, undefined, subscription, lateChargeMonths);
};
exports.default = YMSubscriptionProduct;
//# sourceMappingURL=YMSubscriptionProduct.js.map