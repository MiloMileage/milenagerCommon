import YMDateRange from './YMDateRange';
export default class YMSubscriptionDateRange {
    dateRange: YMDateRange;
    appStoreReceipt: any;
    constructor(dateRange: YMDateRange, appStoreReceipt: any);
    static fromObject: (obj: any) => YMSubscriptionDateRange;
    static subscriptionsTypes: {
        none: string;
        annual: string;
        monthly: string;
    };
}
