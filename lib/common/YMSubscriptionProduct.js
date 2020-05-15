"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
class YMSubscriptionProduct {
    // tslint:disable-next-line:max-line-length
    constructor(introductoryPrice, localizedSymbol, freeMonths, periodType, price, iosSubscription, androidSubscription, productId) {
        this.introductoryPrice = introductoryPrice;
        this.localizedSymbol = localizedSymbol;
        this.freeMonths = freeMonths;
        this.periodType = periodType;
        this.price = price;
        this.iosSubscription = iosSubscription;
        this.androidSubscription = androidSubscription;
        this.productId = productId;
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
    const introductoryPrice = parseFloat(subscription.introductoryPrice.substring(1));
    const localizedSymbol = subscription.localizedPrice.substring(0, 1);
    const periodType = subscription.subscriptionPeriodUnitIOS;
    const freeMonths = parseInt(subscription.introductoryPriceNumberOfPeriodsIOS);
    const price = parseFloat(subscription.price);
    return new YMSubscriptionProduct(introductoryPrice, localizedSymbol, freeMonths, periodType, price, subscription, undefined, subscription.productId);
};
// tslint:disable-next-line:member-ordering
YMSubscriptionProduct.fromAndroid = function (subscription) {
    const introductoryPrice = Number(subscription.introductoryPrice);
    const localizedSymbol = subscription.localizedPrice.substring(0, 1);
    const periodType = subscription.subscriptionPeriodAndroid === "P1Y" ? YMSubscriptionProduct.PeriodTypes.YEAR : YMSubscriptionProduct.PeriodTypes.MONTH;
    const numberOfFreeDays = Moment.duration(subscription.freeTrialPeriodAndroid).asDays();
    const freeMonths = Math.ceil(numberOfFreeDays / 30);
    const price = Number(subscription.price);
    return new YMSubscriptionProduct(introductoryPrice, localizedSymbol, freeMonths, periodType, price, undefined, subscription, subscription.productId);
};
exports.default = YMSubscriptionProduct;
//# sourceMappingURL=YMSubscriptionProduct.js.map