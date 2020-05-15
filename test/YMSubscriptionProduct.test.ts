import YMSubscriptionProduct from '../src/common/YMSubscriptionProduct'
import {YMSubscriptionProductIos} from '../src/common/YMSubscriptionProductIos'
import {YMSubscriptionProductAndroid} from '../src/common/YMSubscriptionProductAndroid'

test('Create from annual (3 free) Android subscription response', () => {
    const json = "{\"originalPrice\":\"49.99\",\"originalJson\":\"\",\"iconUrl\":\"\",\"introductoryPricePeriodAndroid\":\"\",\"introductoryPriceCyclesAndroid\":\"\",\"subscriptionPeriodAndroid\":\"P1Y\",\"introductoryPrice\":\"\",\"localizedPrice\":\"$49.99\",\"currency\":\"USD\",\"freeTrialPeriodAndroid\":\"P12W6D\",\"description\":\"Subscription to use Milo - Mileage Tracker\",\"title\":\"Milo Annual Subscription (Mileage tracker by Milo)\",\"type\":\"subs\",\"price\":\"49.99\",\"productId\":\"android.thisismilo.milo_subscription_annualy_3_0\"}"

    const subscriptionProductAndroid: YMSubscriptionProductAndroid = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromAndroid(subscriptionProductAndroid);

    expect(subscriptionProduct.freeMonths).toBe(3)
    expect(subscriptionProduct.introductoryPrice).toBe(0)
    expect(subscriptionProduct.isAnnual()).toBe(true)
    expect(subscriptionProduct.isMonthly()).toBe(false)
    expect(subscriptionProduct.localizedSymbol).toEqual('$')
    expect(subscriptionProduct.price).toBeCloseTo(49.99, 2)
});

test('Create from annual (6 free) Android subscription response', () => {
    const json = "{\"originalPrice\":\"49.99\",\"originalJson\":\"\",\"iconUrl\":\"\",\"introductoryPricePeriodAndroid\":\"\",\"introductoryPriceCyclesAndroid\":\"\",\"subscriptionPeriodAndroid\":\"P1Y\",\"introductoryPrice\":\"\",\"localizedPrice\":\"$49.99\",\"currency\":\"USD\",\"freeTrialPeriodAndroid\":\"P25W5D\",\"description\":\"Subscription to use Milo - Mileage Tracker\",\"title\":\"Milo Annual Subscription (Mileage tracker by Milo)\",\"type\":\"subs\",\"price\":\"49.99\",\"productId\":\"android.thisismilo.milo_subscription_annualy_3_1\"}"

    const subscriptionProductAndroid: YMSubscriptionProductAndroid = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromAndroid(subscriptionProductAndroid);

    expect(subscriptionProduct.freeMonths).toBe(6)
    expect(subscriptionProduct.introductoryPrice).toBe(0)
    expect(subscriptionProduct.isAnnual()).toBe(true)
    expect(subscriptionProduct.isMonthly()).toBe(false)
    expect(subscriptionProduct.localizedSymbol).toEqual('$')
    expect(subscriptionProduct.price).toBeCloseTo(49.99, 2)
});

test('Create from monthly (1 free) Android subscription response', () => {
    const json = "{\"originalPrice\":\"5.99\",\"originalJson\":\"\",\"iconUrl\":\"\",\"introductoryPricePeriodAndroid\":\"\",\"introductoryPriceCyclesAndroid\":\"\",\"subscriptionPeriodAndroid\":\"P1M\",\"introductoryPrice\":\"\",\"localizedPrice\":\"$5.99\",\"currency\":\"USD\",\"freeTrialPeriodAndroid\":\"P4W2D\",\"description\":\"Subscription to use Milo - Mileage Tracker\",\"title\":\"Milo Monthly Subscription (Mileage tracker by Milo)\",\"type\":\"subs\",\"price\":\"5.99\",\"productId\":\"android.thisismilo.milo_subscription_mon_1_0\"}"

    const subscriptionProductAndroid: YMSubscriptionProductAndroid = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromAndroid(subscriptionProductAndroid);

    expect(subscriptionProduct.freeMonths).toBe(1)
    expect(subscriptionProduct.introductoryPrice).toBe(0)
    expect(subscriptionProduct.isAnnual()).toBe(false)
    expect(subscriptionProduct.isMonthly()).toBe(true)
    expect(subscriptionProduct.localizedSymbol).toEqual('$')
    expect(subscriptionProduct.price).toBeCloseTo(5.99, 2)
});

test('Create from monthly (2 free) Android subscription response', () => {
    const json = "{\"originalPrice\":\"5.99\",\"originalJson\":\"\",\"iconUrl\":\"\",\"introductoryPricePeriodAndroid\":\"\",\"introductoryPriceCyclesAndroid\":\"\",\"subscriptionPeriodAndroid\":\"P1M\",\"introductoryPrice\":\"\",\"localizedPrice\":\"$5.99\",\"currency\":\"USD\",\"freeTrialPeriodAndroid\":\"P8W4D\",\"description\":\"Subscription to use Milo - Mileage Tracker\",\"title\":\"Milo Monthly Subscription (Mileage tracker by Milo)\",\"type\":\"subs\",\"price\":\"5.99\",\"productId\":\"android.thisismilo.milo_subscription_mon_1_1\"}"

    const subscriptionProductAndroid: YMSubscriptionProductAndroid = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromAndroid(subscriptionProductAndroid);

    expect(subscriptionProduct.freeMonths).toBe(2)
    expect(subscriptionProduct.introductoryPrice).toBe(0)
    expect(subscriptionProduct.isAnnual()).toBe(false)
    expect(subscriptionProduct.isMonthly()).toBe(true)
    expect(subscriptionProduct.localizedSymbol).toEqual('$')
    expect(subscriptionProduct.price).toBeCloseTo(5.99, 2)
});

test('Create from annual (3 free) iOS subscription response', () => {
    const json = "{\"productId\":\"ios.thisismilo.milo_subscription_annualy_3_0\",\"subscriptionPeriodUnitIOS\":\"YEAR\",\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"$0.00\",\"title\":\"Milo Annual Subscription\",\"introductoryPriceSubscriptionPeriodIOS\":\"MONTH\",\"introductoryPriceNumberOfPeriodsIOS\":\"3\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"localizedPrice\":\"$49.99\",\"introductoryPricePaymentModeIOS\":\"FREETRIAL\",\"price\":\"49.99\",\"currency\":\"USD\",\"subscriptionPeriodNumberIOS\":\"1\"}"

    const subscriptionProductIos: YMSubscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromIos(subscriptionProductIos);

    expect(subscriptionProduct.freeMonths).toBe(3)
    expect(subscriptionProduct.introductoryPrice).toBe(0)
    expect(subscriptionProduct.isAnnual()).toBe(true)
    expect(subscriptionProduct.isMonthly()).toBe(false)
    expect(subscriptionProduct.localizedSymbol).toEqual('$')
    expect(subscriptionProduct.price).toBeCloseTo(49.99, 2)
});

test('Create from annual (6 free) iOS subscription response', () => {
    const json = "{\"productId\":\"ios.thisismilo.milo_subscription_annualy_3_1\",\"subscriptionPeriodUnitIOS\":\"YEAR\",\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"$0.00\",\"title\":\"Milo Annual Subscription\",\"introductoryPriceSubscriptionPeriodIOS\":\"MONTH\",\"introductoryPriceNumberOfPeriodsIOS\":\"6\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"localizedPrice\":\"$49.99\",\"introductoryPricePaymentModeIOS\":\"FREETRIAL\",\"price\":\"49.99\",\"currency\":\"USD\",\"subscriptionPeriodNumberIOS\":\"1\"}"

    const subscriptionProductIos: YMSubscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromIos(subscriptionProductIos);

    expect(subscriptionProduct.freeMonths).toBe(6)
    expect(subscriptionProduct.introductoryPrice).toBe(0)
    expect(subscriptionProduct.isAnnual()).toBe(true)
    expect(subscriptionProduct.isMonthly()).toBe(false)
    expect(subscriptionProduct.localizedSymbol).toEqual('$')
    expect(subscriptionProduct.price).toBeCloseTo(49.99, 2)
});

test('Create from monthly (1 free) iOS subscription response', () => {
    const json = "{\"productId\":\"ios.thisismilo.milo_subscription_mon_1_0\",\"subscriptionPeriodUnitIOS\":\"MONTH\",\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"$0.00\",\"title\":\"Milo Monthly Subscription\",\"introductoryPriceSubscriptionPeriodIOS\":\"MONTH\",\"introductoryPriceNumberOfPeriodsIOS\":\"1\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"localizedPrice\":\"$5.99\",\"introductoryPricePaymentModeIOS\":\"FREETRIAL\",\"price\":\"5.99\",\"currency\":\"USD\",\"subscriptionPeriodNumberIOS\":\"1\"}"

    const subscriptionProductIos: YMSubscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromIos(subscriptionProductIos);

    expect(subscriptionProduct.freeMonths).toBe(1)
    expect(subscriptionProduct.introductoryPrice).toBe(0)
    expect(subscriptionProduct.isAnnual()).toBe(false)
    expect(subscriptionProduct.isMonthly()).toBe(true)
    expect(subscriptionProduct.localizedSymbol).toEqual('$')
    expect(subscriptionProduct.price).toBeCloseTo(5.99, 2)
});

test('Create from monthly (1 free) iOS subscription response', () => {
    const json = "{\"productId\":\"ios.thisismilo.milo_subscription_mon_1_1\",\"subscriptionPeriodUnitIOS\":\"MONTH\",\"description\":\"Subscription for Unlimited Mileage Reports\",\"introductoryPrice\":\"$0.00\",\"title\":\"Milo Monthly Subscription\",\"introductoryPriceSubscriptionPeriodIOS\":\"MONTH\",\"introductoryPriceNumberOfPeriodsIOS\":\"2\",\"discounts\":[],\"type\":\"Do not use this. It returned sub only before\",\"localizedPrice\":\"$5.99\",\"introductoryPricePaymentModeIOS\":\"FREETRIAL\",\"price\":\"5.99\",\"currency\":\"USD\",\"subscriptionPeriodNumberIOS\":\"1\"}"

    const subscriptionProductIos: YMSubscriptionProductIos = JSON.parse(json);
    const subscriptionProduct = YMSubscriptionProduct.fromIos(subscriptionProductIos);

    expect(subscriptionProduct.freeMonths).toBe(2)
    expect(subscriptionProduct.introductoryPrice).toBe(0)
    expect(subscriptionProduct.isAnnual()).toBe(false)
    expect(subscriptionProduct.isMonthly()).toBe(true)
    expect(subscriptionProduct.localizedSymbol).toEqual('$')
    expect(subscriptionProduct.price).toBeCloseTo(5.99, 2)
});