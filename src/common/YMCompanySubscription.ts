import * as Moment from 'moment'
import YMSubscription from './YMSubscription'

export enum YMCompanySubscriptionStatus {
    TRIAL = "TRIAL",
    ACTIVE = "ACTIVE",
    CANCELED = "CANCELED"
}

export enum YMCompanySubscriptionType {
    NONE = 'NONE',
    MONTHLY = "MONTHLY",
}

export default class YMCompanySubscription {
    status: YMCompanySubscriptionStatus
    subscriptionType: YMCompanySubscriptionType
    expiresAt: Date
    stripe_transaction_id: string

    constructor (status: YMCompanySubscriptionStatus, subscriptionType: YMCompanySubscriptionType, expiresAt: Date, stripe_transaction_id: string) {
        this.status = status
        this.subscriptionType = subscriptionType
        this.expiresAt = expiresAt
        this.stripe_transaction_id = stripe_transaction_id
    }

    isUnderSubscription() {
        return Moment(this.expiresAt).isAfter(Moment())
    }

    isCanceledAndUnderSubscription() {
        return this.status === YMCompanySubscriptionStatus.CANCELED && Moment(this.expiresAt).isAfter(Moment())
    }

    daysTillExpire() {
        return Moment(this.expiresAt).diff(Moment(), 'days')
    }

    isTrial() {
        return this.status === YMCompanySubscriptionStatus.TRIAL && this.subscriptionType == YMCompanySubscriptionType.NONE
    }

    static createTrialSubscription(days: number) {
        return new YMCompanySubscription(YMCompanySubscriptionStatus.TRIAL, YMCompanySubscriptionType.NONE, Moment().startOf('day').add(days, 'day').toDate(), undefined)
    }

    static fromObject = function(obj: any) {
        if(obj == null) return YMCompanySubscription.createTrialSubscription(7)
        
        return new YMCompanySubscription(
            obj.status,
            obj.subscriptionType,
            obj.expiresAt,
            obj.stripe_transaction_id,
        )
    }
}