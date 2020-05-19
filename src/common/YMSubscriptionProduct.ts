import {YMSubscriptionProductIos} from './YMSubscriptionProductIos'
import {YMSubscriptionProductAndroid} from './YMSubscriptionProductAndroid'
import * as Moment from 'moment'

export default class YMSubscriptionProduct {
    introductoryPrice: number
    localizedSymbol: string
    freeMonths: number
    introMonths: number
    periodType: string
    price: number
    iosSubscription: YMSubscriptionProductIos
    androidSubscription: YMSubscriptionProductAndroid
    productId: string

    static PeriodTypes = {
        YEAR: 'YEAR',
        MONTH: 'MONTH',
    }

    // tslint:disable-next-line:max-line-length
    constructor (introductoryPrice: number, localizedSymbol: string, freeMonths: number, periodType: string, price: number, iosSubscription: YMSubscriptionProductIos, androidSubscription: YMSubscriptionProductAndroid, productId: string, introMonths: number) {
        this.introductoryPrice = introductoryPrice
        this.localizedSymbol = localizedSymbol
        this.freeMonths = freeMonths
        this.periodType = periodType
        this.price = price
        this.iosSubscription = iosSubscription
        this.androidSubscription = androidSubscription
        this.productId = productId
        this.introMonths = introMonths
    }

    isAnnual() {
        return this.periodType === YMSubscriptionProduct.PeriodTypes.YEAR
    }

    isMonthly() {
        return this.periodType === YMSubscriptionProduct.PeriodTypes.MONTH
    }

    // tslint:disable-next-line:member-ordering
    static fromIos = function(subscription: YMSubscriptionProductIos) {
        const introductoryPrice = parseFloat(subscription.introductoryPrice.substring(1))
        const numberOfIntoMonths = Number(subscription.introductoryPriceNumberOfPeriodsIOS)
        const localizedSymbol = subscription.localizedPrice.substring(0,1)
        const periodType = subscription.subscriptionPeriodUnitIOS
        const freeMonths = introductoryPrice > 0 ? 0 : parseInt(subscription.introductoryPriceNumberOfPeriodsIOS)
        const price = parseFloat(subscription.price)

        return new YMSubscriptionProduct(introductoryPrice, localizedSymbol, freeMonths, periodType, price, subscription, undefined, subscription.productId, numberOfIntoMonths)
    }

    // tslint:disable-next-line:member-ordering
    static fromAndroid = function(subscription: YMSubscriptionProductAndroid) {
        const introductoryPrice = Number(subscription.introductoryPrice.substring(1))
        const localizedSymbol = subscription.localizedPrice.substring(0,1)
        const periodType = subscription.subscriptionPeriodAndroid === "P1Y" ? YMSubscriptionProduct.PeriodTypes.YEAR : YMSubscriptionProduct.PeriodTypes.MONTH
        const numberOfIntoMonths = Number(subscription.introductoryPriceCyclesAndroid)
        const numberOfFreeDays = Moment.duration(subscription.freeTrialPeriodAndroid).asDays()
        const freeMonths = Math.ceil(numberOfFreeDays / 30)
        const price = Number(subscription.price)

        return new YMSubscriptionProduct(introductoryPrice, localizedSymbol, freeMonths, periodType, price, undefined, subscription, subscription.productId, numberOfIntoMonths)
    }
}
