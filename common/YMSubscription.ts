export default class YMSubscription {
    subscriptionId: string
    subscriptionType: string
    startDate: Date
    endDate: Date

    constructor (subscriptionId = 'id', subscriptionType = 'annual', startDate = new Date(), endDate = new Date()) {
        this.subscriptionId = subscriptionId // personal subscription id
        this.subscriptionType = subscriptionType // annual \ monthly
        this.startDate = startDate
        this.endDate = endDate
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        // tslint:disable-next-line:max-line-length
        return new YMSubscription(obj.subscriptionId, obj.subscriptionType, obj.startDate, obj.endDate)
    }
}