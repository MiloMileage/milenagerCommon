import {AppleReceiptResponse} from './YMAppleReceiptResponse'
import * as Moment from 'moment'

export default class YMSubscription {
    subscriptionType: string
    isSetToRenew: boolean
    renewalDate: Date
    latestPaidDate: Date
    receipt: any
    isIos: boolean

    constructor (subscriptionType: string, isSetToRenew: boolean, renewalDate: Date, latestPaidDate: Date, receipt: any, isIos: boolean) {
        this.subscriptionType = subscriptionType
        this.isSetToRenew = isSetToRenew
        this.renewalDate = renewalDate
        this.latestPaidDate = latestPaidDate
        this.receipt = receipt
        this.isIos = isIos
    }

    isUnderSubscription() {
        return Moment(this.latestPaidDate).isAfter(Moment())
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

    // tslint:disable-next-line:member-ordering
    static fromIosReceipt = function(obj: any) {
        const appleReceipt: AppleReceiptResponse = obj;

        const latestPaidDate = YMSubscription.getLatestPaidDate(appleReceipt)
        const isSetToRenew = appleReceipt.pending_renewal_info[0].auto_renew_status === '1'
        const subscriptionType = !isSetToRenew ? YMSubscription.subscriptionsTypes.none : appleReceipt.pending_renewal_info[0].auto_renew_product_id.indexOf('annualy') === -1 ? YMSubscription.subscriptionsTypes.monthly : YMSubscription.subscriptionsTypes.annual
        const receipt = appleReceipt
        const renewalDate = isSetToRenew ? Moment(latestPaidDate).add(1, subscriptionType === YMSubscription.subscriptionsTypes.monthly ? 'month' : 'year').toDate() : null
    
        return new YMSubscription(subscriptionType, isSetToRenew, renewalDate, latestPaidDate, receipt, true)
    }

    static getLatestPaidDate(appleReceipt: AppleReceiptResponse) {
        let latestDate = null

        appleReceipt.latest_receipt_info.forEach(rec => {
            const currDate = new Date(parseInt(rec.expires_date_ms))

            if (latestDate == null || Moment(latestDate).isBefore(Moment(currDate))) {
                latestDate = currDate
            }
        })

        return latestDate
    }

    static createDummySubscription() {
        return new YMSubscription(YMSubscription.subscriptionsTypes.none, null, null, null, null, true)
    }

    static subscriptionsTypes = {
        none: 'none',
        annual: 'anual',
        monthly: 'monthly'
    }
}