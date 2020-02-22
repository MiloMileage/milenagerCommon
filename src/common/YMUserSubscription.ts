import * as Moment from 'moment'
import YMSubscription from './YMSubscription'

export enum YMSubscriptionStatus {
    NONE = "NONE",
    ACTIVE = "ACTIVE",
    CANCELED = "CANCELED",
    GRACE_PERIOD = "GRACE_PERIOD",
}

export default class YMUserSubscription {
    status: YMSubscriptionStatus
    subscriptionType: string
    promoCode: string
    expiresAt: Date
    apple_original_transaction_id: string
    google_original_transaction_id: string

    constructor (subscriptionType: string, status: YMSubscriptionStatus, promoCode: string, expiresAt: Date, apple_original_transaction_id: string, google_original_transaction_id: string) {
        this.status = status
        this.subscriptionType = subscriptionType
        this.promoCode = promoCode
        this.expiresAt = expiresAt
        this.apple_original_transaction_id = apple_original_transaction_id
        this.google_original_transaction_id = google_original_transaction_id
    }

    isUnderSubscription() {
        return this.status === YMSubscriptionStatus.ACTIVE && Moment(this.expiresAt).isAfter(Moment())
    }

    isDummy() {
        return this.status === YMSubscriptionStatus.NONE && this.subscriptionType === YMSubscription.subscriptionsTypes.none
    }

    static createDummyUserSubscription() {
        return new YMUserSubscription(YMSubscription.subscriptionsTypes.none, YMSubscriptionStatus.NONE, undefined, undefined, undefined, undefined)
    }

    static fromObject = function(obj: any) {
        if(obj == null) return YMUserSubscription.createDummyUserSubscription()
        
        return new YMUserSubscription(
            obj.subscriptionType,
            obj.status,
            obj.promoCode,
            obj.expiresAt,
            obj.apple_original_transaction_id,
            obj.google_original_transaction_id
        )
    }
}