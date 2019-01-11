import YMDateRange from './YMDateRange'

export default class YMSubscriptionDateRange {
    dateRange: YMDateRange
    appStoreReceipt: any

    constructor (dateRange: YMDateRange, appStoreReceipt: any) {
        this.dateRange = dateRange
        this.appStoreReceipt = appStoreReceipt
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMSubscriptionDateRange(YMDateRange.fromObject(undefined), {})

        return new YMSubscriptionDateRange(obj.dateRange, obj.appStoreReceipt)
    }
}