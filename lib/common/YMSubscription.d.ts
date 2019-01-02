import YMSubscriptionDateRange from './YMSubscriptionDateRange';
export default class YMSubscription {
    subscriptionType: string;
    subscriptionDateRanges: Array<YMSubscriptionDateRange>;
    constructor(subscriptionType: string, subscriptionDateRanges: Array<YMSubscriptionDateRange>);
    isNone(): boolean;
    isAnnual(): boolean;
    isMonthly(): boolean;
    static fromObject: (obj: any) => YMSubscription;
    static subscriptionsTypes: {
        none: string;
        annual: string;
        monthly: string;
    };
}
