import { YMSubscriptionProductIos } from './YMSubscriptionProductIos';
import { YMSubscriptionProductAndroid } from './YMSubscriptionProductAndroid';
export default class YMSubscriptionProduct {
    introductoryPrice: number;
    localizedSymbol: string;
    freeMonths: number;
    peneltyMonths: number;
    periodType: string;
    price: number;
    peneltyMonthPrice: number;
    iosSubscription: YMSubscriptionProductIos;
    androidSubscription: YMSubscriptionProductAndroid;
    lateChargeMonths: number;
    productId: string;
    static PeriodTypes: {
        YEAR: string;
        MONTH: string;
    };
    constructor(introductoryPrice: number, localizedSymbol: string, freeMonths: number, peneltyMonths: number, periodType: string, price: number, peneltyMonthPrice: number, iosSubscription: YMSubscriptionProductIos, androidSubscription: YMSubscriptionProductAndroid, lateChargeMonths: number, productId: string);
    isAnnual(): boolean;
    isMonthly(): boolean;
    static fromIos: (subscription: YMSubscriptionProductIos) => YMSubscriptionProduct;
    static fromAndroid: (subscription: YMSubscriptionProductAndroid) => YMSubscriptionProduct;
}
