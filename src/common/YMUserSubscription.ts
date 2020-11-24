import * as Moment from 'moment'
import YMSubscription from './YMSubscription'
import YMCompanySubscription from './YMCompanySubscription'

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
    google_original_purchase_token: string
    stripe_subscription_id: string

    constructor (subscriptionType: string, status: YMSubscriptionStatus, promoCode: string, expiresAt: Date, apple_original_transaction_id: string, google_original_purchase_token: string, stripe_subscription_id: string) {
        this.status = status
        this.subscriptionType = subscriptionType
        this.promoCode = promoCode
        this.expiresAt = expiresAt
        this.apple_original_transaction_id = apple_original_transaction_id
        this.google_original_purchase_token = google_original_purchase_token
        this.stripe_subscription_id = stripe_subscription_id
    }

    isUnderSubscription(companySubscription: YMCompanySubscription) {
        if (companySubscription != null && companySubscription.isUnderSubscription() && !companySubscription.isCanceledAndUnderSubscription()) {
            return true
        }

        return Moment(this.expiresAt).isAfter(Moment())
    }

    isCanceledAndUnderSubscription(companySubscription: YMCompanySubscription) {
        if (companySubscription != null && companySubscription.isUnderSubscription() && !companySubscription.isCanceledAndUnderSubscription()) {
            return false
        }

        return this.status === YMSubscriptionStatus.CANCELED && Moment(this.expiresAt).isAfter(Moment())
    }

    daysTillExpire() {
        return Moment(this.expiresAt).diff(Moment(), 'days')
    }

    isDummy() {
        return this.status === YMSubscriptionStatus.NONE && this.subscriptionType === YMSubscription.subscriptionsTypes.none
    }

    static createDummyUserSubscription() {
        return new YMUserSubscription(YMSubscription.subscriptionsTypes.none, YMSubscriptionStatus.NONE, undefined, undefined, undefined, undefined, undefined)
    }

    static fromObject = function(obj: any) {
        if(obj == null) return YMUserSubscription.createDummyUserSubscription()
        
        return new YMUserSubscription(
            obj.subscriptionType,
            obj.status,
            obj.promoCode,
            obj.expiresAt,
            obj.apple_original_transaction_id,
            obj.google_original_purchase_token,
            obj.stripe_subscription_id
        )
    }
}