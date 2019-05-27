"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMSubscriptionProduct {
    // tslint:disable-next-line:max-line-length
    constructor(introductoryPrice, localizedSymbol, freeMonths, peneltyMonths, periodType, price, peneltyMonthPrice, iosSubscription) {
        this.introductoryPrice = introductoryPrice;
        this.localizedSymbol = localizedSymbol;
        this.freeMonths = freeMonths;
        this.peneltyMonths = peneltyMonths;
        this.periodType = periodType;
        this.price = price;
        this.peneltyMonthPrice = peneltyMonthPrice;
        this.iosSubscription = iosSubscription;
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
    const freeMonths = periodType === YMSubscriptionProduct.PeriodTypes.YEAR ? 3 : 1;
    const price = parseFloat(subscription.price);
    const peneltyMonths = Math.max(0, parseInt(subscription.productId.substring(subscription.productId.length - 1)) - freeMonths);
    const peneltyMonthPrice = (introductoryPrice - price) / peneltyMonths;
    return new YMSubscriptionProduct(introductoryPrice, localizedSymbol, freeMonths, peneltyMonths, periodType, price, peneltyMonthPrice, subscription);
};
exports.default = YMSubscriptionProduct;
//# sourceMappingURL=YMSubscriptionProduct.js.map