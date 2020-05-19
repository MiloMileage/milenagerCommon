import { YMSubscriptionProductIos } from './YMSubscriptionProductIos';
import { YMSubscriptionProductAndroid } from './YMSubscriptionProductAndroid';
export default class YMSubscriptionProduct {
    introductoryPrice: number;
    localizedSymbol: string;
    freeMonths: number;
    introMonths: number;
    periodType: string;
    price: number;
    iosSubscription: YMSubscriptionProductIos;
    androidSubscription: YMSubscriptionProductAndroid;
    productId: string;
    static PeriodTypes: {
        YEAR: string;
        MONTH: string;
    };
    constructor(introductoryPrice: number, localizedSymbol: string, freeMonths: number, periodType: string, price: number, iosSubscription: YMSubscriptionProductIos, androidSubscription: YMSubscriptionProductAndroid, productId: string, introMonths: number);
    isAnnual(): boolean;
    isMonthly(): boolean;
    static fromIos: (subscription: YMSubscriptionProductIos) => YMSubscriptionProduct;
    static fromAndroid: (subscription: YMSubscriptionProductAndroid) => YMSubscriptionProduct;
}
