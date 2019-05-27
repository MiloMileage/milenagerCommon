import { YMSubscriptionProductIos } from './YMSubscriptionProductIos';
export default class YMSubscriptionProduct {
    introductoryPrice: number;
    localizedSymbol: string;
    freeMonths: number;
    peneltyMonths: number;
    periodType: string;
    price: number;
    peneltyMonthPrice: number;
    iosSubscription: YMSubscriptionProductIos;
    lateChargeMonths: number;
    static PeriodTypes: {
        YEAR: string;
        MONTH: string;
    };
    constructor(introductoryPrice: number, localizedSymbol: string, freeMonths: number, peneltyMonths: number, periodType: string, price: number, peneltyMonthPrice: number, iosSubscription: YMSubscriptionProductIos, lateChargeMonths: number);
    isAnnual(): boolean;
    isMonthly(): boolean;
    static fromIos: (subscription: YMSubscriptionProductIos) => YMSubscriptionProduct;
}
