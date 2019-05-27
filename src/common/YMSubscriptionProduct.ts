import {YMSubscriptionProductIos} from './YMSubscriptionProductIos'

export default class YMSubscriptionProduct {
    introductoryPrice: number
    localizedSymbol: string
    freeMonths: number
    peneltyMonths: number
    periodType: string
    price: number
    peneltyMonthPrice: number
    iosSubscription: YMSubscriptionProductIos
    lateChargeMonths: number

    static PeriodTypes = {
        YEAR: 'YEAR',
        MONTH: 'MONTH',
    }

    // tslint:disable-next-line:max-line-length
    constructor (introductoryPrice: number, localizedSymbol: string, freeMonths: number, peneltyMonths: number, periodType: string, price: number, peneltyMonthPrice: number, iosSubscription: YMSubscriptionProductIos, lateChargeMonths: number) {
        this.introductoryPrice = introductoryPrice
        this.localizedSymbol = localizedSymbol
        this.freeMonths = freeMonths
        this.peneltyMonths = peneltyMonths
        this.periodType = periodType
        this.price = price
        this.peneltyMonthPrice = peneltyMonthPrice
        this.iosSubscription = iosSubscription
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
        const freeMonths = periodType === YMSubscriptionProduct.PeriodTypes.YEAR ? 3 : 1
        const price = parseFloat(subscription.price)
        const peneltyMonths = Math.max(0, monthsFromId - freeMonths)
        const peneltyMonthPrice = (introductoryPrice - price) / peneltyMonths
        const lateChargeMonths = Math.max(0, freeMonths - monthsFromId)

        return new YMSubscriptionProduct(introductoryPrice, localizedSymbol, freeMonths, peneltyMonths, periodType, price, peneltyMonthPrice, subscription, lateChargeMonths)
    }
}
