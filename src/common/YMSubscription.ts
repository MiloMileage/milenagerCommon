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
        if(obj == null) return new YMSubscription('', '', new Date, new Date)

        return new YMSubscription(obj.subscriptionId, obj.subscriptionType, obj.startDate, obj.endDate)
    }
}