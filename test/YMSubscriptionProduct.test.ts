import YMSubscriptionProduct from '../src/common/YMSubscriptionProduct'
import {YMSubscriptionProductIos} from '../src/common/YMSubscriptionProductIos'
import {YMSubscriptionProductAndroid} from '../src/common/YMSubscriptionProductAndroid'

test('Create from annual ios subscription response', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪239.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"YEAR\",\"productId\":\"ios.thisismilo.milo_subscription_annualy_3_5\",\"price\":\"181.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Annual Subscription\",\"subscriptionPeriodUnitIOS\":\"YEAR\",\"localizedPrice\":\"₪181.90\",\"currency\":\"ILS\"}";

    const subscriptionProductIos: YMSubscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromIos(subscriptionProductIos);

    expect(subscriptionProduct.freeMonths).toBe(1)
    expect(subscriptionProduct.introductoryPrice).toBe(239.90)
    expect(subscriptionProduct.isAnnual()).toBe(true)
    expect(subscriptionProduct.isMonthly()).toBe(false)
    expect(subscriptionProduct.localizedSymbol).toEqual('₪')
    expect(subscriptionProduct.price).toBe(181.9)
});

test('Create from monthly ios subscription response', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪137.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"MONTH\",\"productId\":\"ios.thisismilo.milo_subscription_mon_1_5\",\"price\":\"21.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Monthly Subscription\",\"subscriptionPeriodUnitIOS\":\"MONTH\",\"localizedPrice\":\"₪21.90\",\"currency\":\"ILS\"}";

    const subscriptionProductIos: YMSubscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromIos(subscriptionProductIos);

    expect(subscriptionProduct.freeMonths).toBe(1)
    expect(subscriptionProduct.peneltyMonths).toBe(4)
    expect(subscriptionProduct.introductoryPrice).toBe(137.90)
    expect(subscriptionProduct.isAnnual()).toBe(false)
    expect(subscriptionProduct.isMonthly()).toBe(true)
    expect(subscriptionProduct.localizedSymbol).toEqual('₪')
    expect(subscriptionProduct.price).toBe(21.9)
    expect(subscriptionProduct.peneltyMonthPrice).toBe(29)
    expect(subscriptionProduct.lateChargeMonths).toBe(0)
});

test('Late charge months 0', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪137.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"MONTH\",\"productId\":\"ios.thisismilo.milo_subscription_mon_1_1\",\"price\":\"21.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Monthly Subscription\",\"subscriptionPeriodUnitIOS\":\"MONTH\",\"localizedPrice\":\"₪21.90\",\"currency\":\"ILS\"}";

    const subscriptionProductIos: YMSubscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromIos(subscriptionProductIos);

    expect(subscriptionProduct.lateChargeMonths).toBe(0)
});

test('Late charge months 1', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪137.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"MONTH\",\"productId\":\"ios.thisismilo.milo_subscription_mon_1_0\",\"price\":\"21.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Monthly Subscription\",\"subscriptionPeriodUnitIOS\":\"MONTH\",\"localizedPrice\":\"₪21.90\",\"currency\":\"ILS\"}";

    const subscriptionProductIos: YMSubscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromIos(subscriptionProductIos);

    expect(subscriptionProduct.lateChargeMonths).toBe(1)
});

test('Late charge months 0 yearly', () => {
    const json = "{\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"₪239.90\",\"subscriptionPeriodNumberIOS\":\"1\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"introductoryPriceSubscriptionPeriodIOS\":\"YEAR\",\"productId\":\"ios.thisismilo.milo_subscription_annualy_3_8\",\"price\":\"181.9\",\"introductoryPricePaymentModeIOS\":\"PAYUPFRONT\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"title\":\"Milo Annual Subscription\",\"subscriptionPeriodUnitIOS\":\"YEAR\",\"localizedPrice\":\"₪181.90\",\"currency\":\"ILS\"}";

    const subscriptionProductIos: YMSubscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromIos(subscriptionProductIos);

    expect(subscriptionProduct.lateChargeMonths).toBe(0)
});

test('Create from annual Android subscription response', () => {
    const json = "{\"originalPrice\":49.9900016784668,\"iconUrl\":\"\",\"introductoryPricePeriodAndroid\":\"\",\"introductoryPriceCyclesAndroid\":\"\",\"subscriptionPeriodAndroid\":\"P1Y\",\"introductoryPrice\":\"\",\"localizedPrice\":\"$49.99\",\"currency\":\"USD\",\"freeTrialPeriodAndroid\":\"P12W6D\",\"description\":\"Subscription to use Milo - Mileage Tracker\",\"title\":\"Milo Annual Subscription (Milo - Unlimited Mileage Tracker)\",\"type\":\"subs\",\"price\":49.9900016784668,\"productId\":\"android.thisismilo.milo_subscription_annualy_3_0\"}";

    const subscriptionProductAndroid: YMSubscriptionProductAndroid = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromAndroid(subscriptionProductAndroid);

    expect(subscriptionProduct.freeMonths).toBe(3)
    expect(subscriptionProduct.peneltyMonths).toBe(0)
    expect(subscriptionProduct.introductoryPrice).toBe(0)
    expect(subscriptionProduct.isAnnual()).toBe(true)
    expect(subscriptionProduct.isMonthly()).toBe(false)
    expect(subscriptionProduct.localizedSymbol).toEqual('$')
    expect(subscriptionProduct.price).toBeCloseTo(49.99, 2)
    expect(subscriptionProduct.peneltyMonthPrice).toBe(0)
    expect(subscriptionProduct.lateChargeMonths).toBe(3)
});

test('Create from monthly Android subscription response', () => {
    const json = "{\"originalPrice\":5.989999771118164,\"iconUrl\":\"\",\"introductoryPricePeriodAndroid\":\"\",\"introductoryPriceCyclesAndroid\":\"\",\"subscriptionPeriodAndroid\":\"P1M\",\"introductoryPrice\":\"\",\"localizedPrice\":\"$5.99\",\"currency\":\"USD\",\"freeTrialPeriodAndroid\":\"P4W2D\",\"description\":\"Subscription to use Milo - Mileage Tracker\",\"title\":\"Milo Monthly Subscription (Milo - Unlimited Mileage Tracker)\",\"type\":\"subs\",\"price\":5.989999771118164,\"productId\":\"android.thisismilo.milo_subscription_mon_1_0\"}";

    const subscriptionProductAndroid: YMSubscriptionProductAndroid = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromAndroid(subscriptionProductAndroid);

    expect(subscriptionProduct.freeMonths).toBe(1)
    expect(subscriptionProduct.peneltyMonths).toBe(0)
    expect(subscriptionProduct.introductoryPrice).toBe(0)
    expect(subscriptionProduct.isAnnual()).toBe(false)
    expect(subscriptionProduct.isMonthly()).toBe(true)
    expect(subscriptionProduct.localizedSymbol).toEqual('$')
    expect(subscriptionProduct.price).toBeCloseTo(5.99, 2)
    expect(subscriptionProduct.peneltyMonthPrice).toBe(0)
    expect(subscriptionProduct.lateChargeMonths).toBe(1)
});
