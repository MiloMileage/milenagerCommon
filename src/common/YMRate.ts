import YMPurpose from './YMPurpose'
import YMUserSettings, {YMCountry} from './YMUserSettings'
import YMGlobalUserSettings from './YMGlobalUserSettings'
import YMDrive from './YMDrive'
import {YMVehicleType} from './YMVehicle'

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
        if (this.deductables === undefined || this.deductables.length === 0) {
            return this.deductable
        }

        let curr = this.deductable
        for(let decutible of this.deductables) {
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

        // find rate for US
        if (purpose.rateId.startsWith('irs_')) {
            const rates = gloablSettings.irsRates[(drive == null ? new Date() : drive.startTime()).getFullYear()]

            return Number(rates === undefined ? 0 : rates[purpose.rateId.substring(4)] == undefined ? 0 : rates[purpose.rateId.substring(4)])
        }

        // find rate for CA
        if (purpose.rateId.startsWith('ca__')) {
            const caRates = gloablSettings.caRates[(drive == null ? new Date() : drive.startTime()).getFullYear()]
            if (caRates === undefined) {
                return 0
            }

            const caRate = caRates[purpose.rateId.substring(4)]

            return Number(caRate === undefined ? 0 : caRate.getRateFromMileage(milesDroveYtd, YMVehicleType.car))
        }

        // find rate for AU
        if (purpose.rateId.startsWith('au__')) {
            const auRates = gloablSettings.auRates[(drive == null ? new Date() : drive.startTime()).getFullYear()]
            if (auRates === undefined) {
                return 0
            }

            const auRate = auRates[purpose.rateId.substring(4)]

            return Number(auRate === undefined ? 0 : auRate.getRateFromMileage(milesDroveYtd, YMVehicleType.car))
        }

        // find rate for UK
        if (purpose.rateId.startsWith('uk__')) {
            const ukRates = gloablSettings.ukRates[(drive == null ? new Date() : drive.startTime()).getFullYear()]
            if (ukRates === undefined) {
                return 0
            }

            const ukRate = ukRates[purpose.rateId.substring(4)]
            const vehicle = drive ? drive.getVehicle(userSettings) : undefined

            return Number(ukRate === undefined ? 0 : ukRate.getRateFromMileage(milesDroveYtd, vehicle ? vehicle.vehicleType : YMVehicleType.car))
        }

        const rate = userSettings.personalRates.filter(x => x.rateId === purpose.rateId)[0]
        
        return rate === undefined ? 0 : rate.deductable
    }
}