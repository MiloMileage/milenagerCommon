import * as Moment from 'moment'

export default class YMUserUsageHistory {
    didHaveSubscription: boolean
    firstDriveDate: Date
    subscriptionEndTime: Date
    numberOfTrialDays: number
    
    constructor (didHaveSubscription: boolean,
        firstDriveDate: Date,
        subscriptionEndTime: Date,
        numberOfTrialDays: number) {
        this.didHaveSubscription = didHaveSubscription
        this.firstDriveDate = firstDriveDate
        this.subscriptionEndTime = subscriptionEndTime
        this.numberOfTrialDays = numberOfTrialDays
    }

    daysUsingTheApp() {
        return Moment().diff(Moment(this.firstDriveDate), 'days')
    }

    isInTrial() {
        return this.daysUsingTheApp() < this.numberOfTrialDays
    }

    monthsToPayFor() {
        let startDate = Moment()
        if (this.didHaveSubscription) {
            // Currently, there is a loophole which allows a subscriber that returns to not pay a panelty
            return 0
        } else {
            startDate = Moment(this.firstDriveDate)
        }

        return Math.min(12, Moment().diff(Moment(startDate), 'month'))
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMUserUsageHistory(false, new Date(), new Date(), 30)
        
        return new YMUserUsageHistory(obj.didHaveSubscription, obj.firstDriveDate, obj.subscriptionEndTime, obj.numberOfTrialDays)
    }
}
