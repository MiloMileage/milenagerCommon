import * as Moment from 'moment'

export default class YMUserUsageHistory {
    didHaveSubscription: boolean
    firstDriveDate: Date
    subscriptionEndTime: Date
    
    constructor (didHaveSubscription: boolean,
        firstDriveDate: Date,
        subscriptionEndTime: Date) {
        this.didHaveSubscription = didHaveSubscription
        this.firstDriveDate = firstDriveDate
        this.subscriptionEndTime = subscriptionEndTime
    }

    monthsToPayFor() {
        let startDate = Moment()
        if (this.didHaveSubscription) {
            startDate = Moment(this.subscriptionEndTime)
        } else {
            startDate = Moment(this.firstDriveDate)
        }

        return Math.floor(Moment().diff(Moment(startDate), 'days') / 30)
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMUserUsageHistory(false, new Date(), new Date())
        
        return new YMUserUsageHistory(obj.didHaveSubscription, obj.firstDriveDate, obj.subscriptionEndTime)
    }
}
