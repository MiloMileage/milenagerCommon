import YMPurpose from './YMPurpose'
import YMUserSettings from './YMUserSettings'
import YMGlobalUserSettings from './YMGlobalUserSettings'
import YMDrive from './YMDrive'

export default class YMRate {
    name: string
    deductable: number
    visible: boolean
    rateId: string

    constructor (name: string, deductable: number, rateId: string = new Date().getTime().toString(), visible: boolean = true) {
        this.name = name
        this.deductable = deductable
        this.visible = visible
        this.rateId = rateId
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMRate('', 0, '', false)

        return new YMRate(obj.name, obj.deductable, obj.rateId, obj.visible)
    }

      // tslint:disable-next-line:max-line-length
    static getRateForPurposeId = (purposeId: string, userSettings: YMUserSettings, gloablSettings: YMGlobalUserSettings, drive?: YMDrive) => {
        if (userSettings === null) {
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

        // find rate
        if (purpose.rateId.startsWith('irs_')) {
            return Number(gloablSettings.irsRates[(drive === undefined ? new Date() : drive.startTime()).getFullYear()][purpose.rateId.substring(4)])
        }

        const rate = userSettings.personalRates.filter(x => x.rateId === purpose.rateId)[0]

        return rate === undefined ? 0 : rate.deductable
    }
}