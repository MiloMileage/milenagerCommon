import YMPurpose from './YMPurpose'
import YMUserSettings, {YMCountry} from './YMUserSettings'
import YMGlobalUserSettings from './YMGlobalUserSettings'
import YMDrive from './YMDrive'
import {YMVehicleType} from './YMVehicle'
import * as moment from 'moment'

export default class YMRate {
    name: string
    deductable: number
    visible: boolean
    rateId: string
    deductables: Array<{fromInMiles: number, deductable: { [vehicleType: string]: number }}>

    constructor (name: string, deductable: number, rateId: string, visible: boolean, deductables: Array<{fromInMiles: number, deductable: { [ind: string]: number }}>) {
        this.name = name
        this.deductable = deductable
        this.visible = visible
        this.rateId = rateId
        this.deductables = deductables ? deductables : []
        this.deductables.sort((d1, d2) => d1.fromInMiles - d2.fromInMiles)
    }

    getRateFromMileage(mileage: number, vehicleType: YMVehicleType = YMVehicleType.car) {
        if (this.deductables === undefined || this.deductables.length === 0 || mileage === undefined) {
            return this.deductable
        }

        let curr = this.deductable
        for(const decutible of this.deductables) {
            if (mileage < decutible.fromInMiles){
                return curr
            }

            if (vehicleType in decutible.deductable) {
                curr = decutible.deductable[vehicleType]
            } else if(YMVehicleType.car in decutible.deductable) {
                curr = decutible.deductable[YMVehicleType.car]
            } else {
                curr = this.deductable
            }
        }

        return curr
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMRate('', 0, '', false, undefined)

        return new YMRate(obj.name, obj.deductable, obj.rateId, obj.visible, obj.deductables)
    }

    static IRS = 'irs_'
    static CA = 'ca__'
    static AU = 'au__'
    static UK = 'uk__'
    static BUSINESS = 'business'
    static CHARITY = 'charity'
    static moving = 'moving'
    static medical = 'medical'

    static GetRates = (drive: YMDrive, rates: { [ind: string]: { [ind: string]: YMRate } }) => {
        const currYear = new Date()
        let driveYear = drive ? drive.getStartTimeLocal() : currYear
        let caRates = rates[(drive == null ? currYear : driveYear).getFullYear()]
        while (caRates === undefined && moment(currYear).isAfter(moment().add(-5, 'years'))) {
            caRates = rates[currYear.getFullYear()]
            driveYear = moment(driveYear).add(-1, 'year').toDate()
        }

        return caRates
    }

    static translateRate = (rateId: string, userSettings: YMUserSettings, gloablSettings: YMGlobalUserSettings, drive?: YMDrive, milesDroveYtd?: number) => {
        // find rate for US
        if (rateId.startsWith(YMRate.IRS)) {
            const currYear = new Date()
            let driveYear = drive ? drive.getStartTimeLocal() : currYear
            let rates = gloablSettings.irsRates[(drive == null ? currYear : driveYear).getFullYear()]
            while (rates === undefined && moment(currYear).isAfter(moment().add(-5, 'years'))) {
                rates = gloablSettings.irsRates[currYear.getFullYear()]
                driveYear = moment(driveYear).add(-1, 'year').toDate()
            }

            return Number(rates === undefined ? 0 : rates[rateId.substring(4)] == undefined ? 0 : rates[rateId.substring(4)])
        }

        // find rate for CA
        if (rateId.startsWith(YMRate.CA)) {
            const caRates = YMRate.GetRates(drive, gloablSettings.caRates)
            if (caRates === undefined) {
                return 0
            }

            const caRate = caRates[rateId.substring(4)]

            return Number(caRate === undefined ? 0 : caRate.getRateFromMileage(milesDroveYtd, YMVehicleType.car))
        }

        // find rate for AU
        if (rateId.startsWith(YMRate.AU)) {
            const auRates = YMRate.GetRates(drive, gloablSettings.auRates)

            if (auRates === undefined) {
                return 0
            }

            const auRate = auRates[rateId.substring(4)]

            return Number(auRate === undefined ? 0 : auRate.getRateFromMileage(milesDroveYtd, YMVehicleType.car))
        }

        // find rate for UK
        if (rateId.startsWith(YMRate.UK)) {
            const ukRates = YMRate.GetRates(drive, gloablSettings.ukRates)

            if (ukRates === undefined) {
                return 0
            }

            const ukRate = ukRates[rateId.substring(4)]
            const vehicle = drive ? drive.getVehicle(userSettings) : undefined

            return Number(ukRate === undefined ? 0 : ukRate.getRateFromMileage(milesDroveYtd, vehicle ? vehicle.vehicleType : YMVehicleType.car))
        }

        // Handle custom case
        const rate = userSettings.personalRates.filter(x => x.rateId === rateId)[0]
        
        return rate === undefined ? 0 : rate.deductable
    }

      // tslint:disable-next-line:max-line-length
    static getRateForPurposeId = (purposeId: string, userSettings: YMUserSettings, gloablSettings: YMGlobalUserSettings, drive?: YMDrive, milesDroveYtd?: number) => {
        if (userSettings == null || gloablSettings == null) {
            return 0
        }

        const currPurposeId = purposeId === YMPurpose.defaultPuposesIds.undetermined ? YMPurpose.defaultPuposesIds.business : purposeId
        
        // find purpose first from user, then global
        let purpose = userSettings.purposes.filter(x => x.purposeId === currPurposeId)[0]

        if (purpose === undefined) {
            purpose = gloablSettings.purposes.filter(x => x.purposeId === currPurposeId)[0]
            if (purpose === undefined) {
                return 0
            }
        }

        const currRatePrefix = userSettings.country === YMCountry.US ? YMRate.IRS :
                                    userSettings.country === YMCountry.CA ? YMRate.CA :
                                    userSettings.country === YMCountry.AU ? YMRate.AU :
                                    userSettings.country === YMCountry.UK ? YMRate.UK : undefined

        if (currRatePrefix) {
            if (purpose.purposeId === YMPurpose.defaultPuposesIds.business || purpose.category === YMPurpose.categories.business) {
                return YMRate.translateRate(`${currRatePrefix}${YMRate.BUSINESS}`, userSettings, gloablSettings, drive, milesDroveYtd)
            } else if (purpose.purposeId === YMPurpose.defaultPuposesIds.charity) {
                return YMRate.translateRate(`${currRatePrefix}${YMRate.CHARITY}`, userSettings, gloablSettings, drive, milesDroveYtd)
            } else if (purpose.purposeId === YMPurpose.defaultPuposesIds.moving) {
                return YMRate.translateRate(`${currRatePrefix}${YMRate.moving}`, userSettings, gloablSettings, drive, milesDroveYtd)
            } else if (purpose.purposeId === YMPurpose.defaultPuposesIds.medical) {
                return YMRate.translateRate(`${currRatePrefix}${YMRate.medical}`, userSettings, gloablSettings, drive, milesDroveYtd)
            } else {
                return 0
            }
        }

        return YMRate.translateRate(purpose.rateId, userSettings, gloablSettings, drive, milesDroveYtd)
    }
}