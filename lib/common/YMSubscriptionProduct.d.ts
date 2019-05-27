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
    static PeriodTypes: {
        YEAR: string;
        MONTH: string;
    };
    constructor(introductoryPrice: number, localizedSymbol: string, freeMonths: number, peneltyMonths: number, periodType: string, price: number, peneltyMonthPrice: number, iosSubscription: YMSubscriptionProductIos);
    isAnnual(): boolean;
    isMonthly(): boolean;
    static fromIos: (subscription: YMSubscriptionProductIos) => YMSubscriptionProduct;
}
