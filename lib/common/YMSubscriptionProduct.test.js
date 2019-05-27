"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMSubscriptionProduct_1 = require("./YMSubscriptionProduct");
test('Create from annual ios subscription response', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪239.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"YEAR\",\"productId\":\"ios.thisismilo.milo_subscription_annualy_3_5\",\"price\":\"181.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Annual Subscription\",\"subscriptionPeriodUnitIOS\":\"YEAR\",\"localizedPrice\":\"₪181.90\",\"currency\":\"ILS\"}";
    const subscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct_1.default.fromIos(subscriptionProductIos);
    expect(subscriptionProduct.freeMonths).toBe(3);
    expect(subscriptionProduct.peneltyMonths).toBe(2);
    expect(subscriptionProduct.introductoryPrice).toBe(239.90);
    expect(subscriptionProduct.isAnnual()).toBe(true);
    expect(subscriptionProduct.isMonthly()).toBe(false);
    expect(subscriptionProduct.localizedSymbol).toEqual('₪');
    expect(subscriptionProduct.price).toBe(181.9);
    expect(subscriptionProduct.peneltyMonthPrice).toBe(29);
});
test('Create from monthly ios subscription response', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪137.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"MONTH\",\"productId\":\"ios.thisismilo.milo_subscription_mon_1_5\",\"price\":\"21.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Monthly Subscription\",\"subscriptionPeriodUnitIOS\":\"MONTH\",\"localizedPrice\":\"₪21.90\",\"currency\":\"ILS\"}";
    const subscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct_1.default.fromIos(subscriptionProductIos);
    expect(subscriptionProduct.freeMonths).toBe(1);
    expect(subscriptionProduct.peneltyMonths).toBe(4);
    expect(subscriptionProduct.introductoryPrice).toBe(137.90);
    expect(subscriptionProduct.isAnnual()).toBe(false);
    expect(subscriptionProduct.isMonthly()).toBe(true);
    expect(subscriptionProduct.localizedSymbol).toEqual('₪');
    expect(subscriptionProduct.price).toBe(21.9);
    expect(subscriptionProduct.peneltyMonthPrice).toBe(29);
    expect(subscriptionProduct.lateChargeMonths).toBe(0);
});
test('Late charge months 0', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪137.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"MONTH\",\"productId\":\"ios.thisismilo.milo_subscription_mon_1_1\",\"price\":\"21.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Monthly Subscription\",\"subscriptionPeriodUnitIOS\":\"MONTH\",\"localizedPrice\":\"₪21.90\",\"currency\":\"ILS\"}";
    const subscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct_1.default.fromIos(subscriptionProductIos);
    expect(subscriptionProduct.lateChargeMonths).toBe(0);
});
test('Late charge months 1', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪137.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"MONTH\",\"productId\":\"ios.thisismilo.milo_subscription_mon_1_0\",\"price\":\"21.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Monthly Subscription\",\"subscriptionPeriodUnitIOS\":\"MONTH\",\"localizedPrice\":\"₪21.90\",\"currency\":\"ILS\"}";
    const subscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct_1.default.fromIos(subscriptionProductIos);
    expect(subscriptionProduct.lateChargeMonths).toBe(1);
});
test('Late charge months 2', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪239.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"YEAR\",\"productId\":\"ios.thisismilo.milo_subscription_annualy_3_1\",\"price\":\"181.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Annual Subscription\",\"subscriptionPeriodUnitIOS\":\"YEAR\",\"localizedPrice\":\"₪181.90\",\"currency\":\"ILS\"}";
    const subscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct_1.default.fromIos(subscriptionProductIos);
    expect(subscriptionProduct.lateChargeMonths).toBe(2);
});
test('Late charge months 1 annually', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪239.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"YEAR\",\"productId\":\"ios.thisismilo.milo_subscription_annualy_3_2\",\"price\":\"181.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Annual Subscription\",\"subscriptionPeriodUnitIOS\":\"YEAR\",\"localizedPrice\":\"₪181.90\",\"currency\":\"ILS\"}";
    const subscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct_1.default.fromIos(subscriptionProductIos);
    expect(subscriptionProduct.lateChargeMonths).toBe(1);
});
test('Late charge months 3', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪239.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"YEAR\",\"productId\":\"ios.thisismilo.milo_subscription_annualy_3_0\",\"price\":\"181.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Annual Subscription\",\"subscriptionPeriodUnitIOS\":\"YEAR\",\"localizedPrice\":\"₪181.90\",\"currency\":\"ILS\"}";
    const subscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct_1.default.fromIos(subscriptionProductIos);
    expect(subscriptionProduct.lateChargeMonths).toBe(3);
});
test('Late charge months 0 yearly', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪239.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"YEAR\",\"productId\":\"ios.thisismilo.milo_subscription_annualy_3_8\",\"price\":\"181.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Annual Subscription\",\"subscriptionPeriodUnitIOS\":\"YEAR\",\"localizedPrice\":\"₪181.90\",\"currency\":\"ILS\"}";
    const subscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct_1.default.fromIos(subscriptionProductIos);
    expect(subscriptionProduct.lateChargeMonths).toBe(0);
});
//# sourceMappingURL=YMSubscriptionProduct.test.js.map