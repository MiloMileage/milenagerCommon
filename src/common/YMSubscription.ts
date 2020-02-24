import {AppleReceiptResponse} from './YMAppleReceiptResponse'
import * as Moment from 'moment'

export default class YMSubscription {
    subscriptionType: string
    isSetToRenew: boolean
    renewalDate: Date
    latestPaidDate: Date
    receipt: any
    isIos: boolean
    userId: string
    originalTransactionId: string

    constructor (subscriptionType: string, isSetToRenew: boolean, renewalDate: Date, latestPaidDate: Date, receipt: any, isIos: boolean, userId: string, originalTransactionId: string) {
        this.subscriptionType = subscriptionType
        this.isSetToRenew = isSetToRenew
        this.renewalDate = renewalDate
        this.latestPaidDate = latestPaidDate
        this.receipt = receipt
        this.isIos = isIos
        this.userId = userId
        this.originalTransactionId = originalTransactionId
    }

    isUnderSubscription() {
        return Moment(this.renewalDate).isAfter(Moment())
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

    isDummy() {
        return this.receipt == null
    }

    static getLatestPaidDate(appleReceipt: AppleReceiptResponse) {
        return new Date(parseInt(appleReceipt.receipt.expiration_date_ms))
    }

    static createDummySubscription(userId: string) {
        return new YMSubscription(YMSubscription.subscriptionsTypes.none, null, null, null, null, true, userId, undefined)
    }

    static subscriptionsTypes = {
        none: 'none',
        annual: 'anual',
        monthly: 'monthly'
    }
}