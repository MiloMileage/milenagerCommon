import YMSubscriptionDateRange from './YMSubscriptionDateRange'

export default class YMSubscription {
    subscriptionType: string
    subscriptionDateRanges: Array<YMSubscriptionDateRange>

    constructor (subscriptionType: string, subscriptionDateRanges: Array<YMSubscriptionDateRange>) {
        this.subscriptionType = subscriptionType
        this.subscriptionDateRanges = subscriptionDateRanges
    }

    isNone() {
        return this.subscriptionType === YMSubscription.subscriptionsTypes.none
    }

    isAnnual() {
        return this.subscriptionType === YMSubscription.subscriptionsTypes.annual
    }

    isMonthly() {
        return this.subscriptionType === YMSubscription.subscriptionsTypes.monthly
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMSubscription(YMSubscription.subscriptionsTypes.none, new Array<YMSubscriptionDateRange>())

        return new YMSubscription(obj.subscriptionType, obj.subscriptionDateRanges)
    }

    static subscriptionsTypes = {
        none: 'none',
        annual: 'anual',
        monthly: 'monthly'
    }
}