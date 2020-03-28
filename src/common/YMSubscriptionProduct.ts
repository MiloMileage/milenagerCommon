import {YMSubscriptionProductIos} from './YMSubscriptionProductIos'
import {YMSubscriptionProductAndroid} from './YMSubscriptionProductAndroid'
import * as Moment from 'moment'

export default class YMSubscriptionProduct {
    introductoryPrice: number
    localizedSymbol: string
    freeMonths: number
    peneltyMonths: number
    periodType: string
    price: number
    peneltyMonthPrice: number
    iosSubscription: YMSubscriptionProductIos
    androidSubscription: YMSubscriptionProductAndroid
    lateChargeMonths: number

    static PeriodTypes = {
        YEAR: 'YEAR',
        MONTH: 'MONTH',
    }

    // tslint:disable-next-line:max-line-length
    constructor (introductoryPrice: number, localizedSymbol: string, freeMonths: number, peneltyMonths: number, periodType: string, price: number, peneltyMonthPrice: number, iosSubscription: YMSubscriptionProductIos, androidSubscription: YMSubscriptionProductAndroid, lateChargeMonths: number) {
        this.introductoryPrice = introductoryPrice
        this.localizedSymbol = localizedSymbol
        this.freeMonths = freeMonths
        this.peneltyMonths = peneltyMonths
        this.periodType = periodType
        this.price = price
        this.peneltyMonthPrice = peneltyMonthPrice
        this.iosSubscription = iosSubscription
        this.androidSubscription = androidSubscription
        this.lateChargeMonths = lateChargeMonths
    }

    isAnnual() {
        return this.periodType === YMSubscriptionProduct.PeriodTypes.YEAR
    }

    isMonthly() {
        return this.periodType === YMSubscriptionProduct.PeriodTypes.MONTH
    }

    // tslint:disable-next-line:member-ordering
    static fromIos = function(subscription: YMSubscriptionProductIos) {
        const monthsFromId = parseInt(subscription.productId.substring(subscription.productId.length - 2).replace('_', ''))
        const introductoryPrice = parseFloat(subscription.introductoryPrice.substring(1))
        const localizedSymbol = subscription.localizedPrice.substring(0,1)
        const periodType = subscription.subscriptionPeriodUnitIOS
        const freeMonths = parseInt(subscription.introductoryPriceNumberOfPeriodsIOS)
        const price = parseFloat(subscription.price)
        const peneltyMonths = Math.max(0, monthsFromId - freeMonths)
        const peneltyMonthPrice = Math.max((introductoryPrice - price) / peneltyMonths, 0)
        const lateChargeMonths = Math.max(0, freeMonths - monthsFromId)

        return new YMSubscriptionProduct(introductoryPrice, localizedSymbol, freeMonths, peneltyMonths, periodType, price, peneltyMonthPrice, subscription, undefined, lateChargeMonths)
    }

    // tslint:disable-next-line:member-ordering
    static fromAndroid = function(subscription: YMSubscriptionProductAndroid) {
        const monthsFromId = parseInt(subscription.productId.substring(subscription.productId.length - 2).replace('_', ''))
        const introductoryPrice = 0
        const localizedSymbol = subscription.localizedPrice.substring(0,1)
        const periodType = subscription.subscriptionPeriodAndroid === "P1Y" ? YMSubscriptionProduct.PeriodTypes.YEAR : YMSubscriptionProduct.PeriodTypes.MONTH
        const numberOfFreeDays = Moment.duration(subscription.freeTrialPeriodAndroid).asDays()
        const freeMonths = Math.ceil(numberOfFreeDays / 30)
        const price = subscription.price
        const peneltyMonths = Math.max(0, monthsFromId - freeMonths)
        const peneltyMonthPrice = Math.max((introductoryPrice - price) / peneltyMonths, 0)
        const lateChargeMonths = Math.max(0, freeMonths - monthsFromId)

        return new YMSubscriptionProduct(introductoryPrice, localizedSymbol, freeMonths, peneltyMonths, periodType, price, peneltyMonthPrice, undefined, subscription, lateChargeMonths)
    }
}
