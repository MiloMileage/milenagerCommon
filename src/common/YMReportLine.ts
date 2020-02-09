import YMDateRange from './YMDateRange'
import YMDrive from './YMDrive'
import YMPurpose from './YMPurpose'
import YMUserSettings from './YMUserSettings'
import YMGlobalUserSettings from './YMGlobalUserSettings'
import YMSavedLocation from './YMSavedLocation'
import * as Common from './../components/common'
import YMRate from './YMRate'

export default class YMReportLine {
    when: Date
    purpose: string
    rate: number
    fromTo: string
    fromToPersonalized: string
    vehicle: string
    distanceInMiles: number
    value: number
    parking: number
    tolls: number
    
    constructor (when: Date,
            purpose: string,
            rate: number,
            fromTo: string,
            fromToPersonalized: string,
            vehicle: string,
            distanceInMiles: number,
            value: number,
            parking: number,
            tolls: number) {
        this.when = when
        this.purpose = purpose
        this.rate = rate
        this.fromTo = fromTo
        this.fromToPersonalized = fromToPersonalized
        this.vehicle = vehicle
        this.distanceInMiles = distanceInMiles
        this.value = value
        this.parking = parking
        this.tolls = tolls
    }

    static fromDrive(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings, savedLocations : { [ind: string]: YMSavedLocation }) {
        const originPersonal = Common.getPersonalNameIfExist(savedLocations, drive.origin, drive.origin.address.name)
        const destPersonal = Common.getPersonalNameIfExist(savedLocations, drive.dest, drive.dest.address.name)
        const purposes =  YMPurpose.mergePuprosesArrays(globalSettings.purposes, userSettings.purposes, true)
        
        // If drive is unclassified its purpose id is -1 and the purpose will be the default purpose
        const purpose = YMPurpose.fromObject(purposes.filter(x => x.purposeId === drive.drivePurposeId)[0])

        return new YMReportLine(drive.startTime(),
                                YMReportLine.getPurposeString(purpose, drive),
                                YMRate.getRateForPurposeId(purpose.purposeId, userSettings, globalSettings),
                                `${drive.origin.address.name} -> ${drive.dest.address.name}`,
                                `${originPersonal} -> ${destPersonal}`,
                                drive.getVehicleName(userSettings),
                                Common.milesToMetric(drive.miles, userSettings.personalSettings.isMetricSystem),
                                Common.roundNumber(drive.getValue(userSettings, globalSettings)),
                                Common.roundNumber(drive.driveNotes.parkingMoney),
                                Common.roundNumber(drive.driveNotes.tollMoney))
    }

    static getPurposeString(purpose: YMPurpose, drive: YMDrive) {
        if (drive.isAutoLocation) {
            return purpose.purposeId === YMPurpose.defaultPuposesIds.business ? 'Business to Business' : 'Personal to Personal'
        }

        if (drive.isAutoWorkHours) {
            return 'Outside working hours'
        }

        return purpose.name
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMReportLine(new Date(), '', 0, '', '', '', 0, 0, 0, 0)
        
        return new YMReportLine(obj.when, obj.purpose, obj.rate, obj.fromTo, obj.fromToPersonalized, obj.vehicle, obj.distanceInMiles, obj.value, obj.parking, obj.tolls)
    }
}
