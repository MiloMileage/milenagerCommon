import YMDateRange from './YMDateRange'
import YMDrive from './YMDrive'
import YMPurpose from './YMPurpose'
import YMUserSettings from './YMUserSettings'
import YMGlobalUserSettings from './YMGlobalUserSettings'
import YMRate from './YMRate'
import * as Moment from 'moment'

export default class YMReportLine {
    when: YMDateRange
    purpose: string
    fromTo: string
    vehicle: string
    distanceInMiles: number
    value: number
    parking: number
    tolls: number
    
    constructor (when: YMDateRange,
            purpose: string,
            fromTo: string,
            vehicle: string,
            distanceInMiles: number,
            value: number,
            parking: number,
            tolls: number) {
        this.when = when
        this.purpose = purpose
        this.fromTo = fromTo
        this.vehicle = vehicle
        this.distanceInMiles = distanceInMiles
        this.value = value
        this.parking = parking
        this.tolls = tolls
    }

    static fromDrive(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings) {
        return new YMReportLine(new YMDateRange(drive.startTime, drive.endTime),
                                YMReportLine.getPurposeString(drive.drivePurposeId),
                                `${drive.origin.address.name} -> ${drive.dest.address.name}`,
                                drive.getVehicleName(userSettings),
                                drive.miles,
                                drive.getValue(userSettings, globalSettings),
                                drive.driveNotes.parkingMoney,
                                drive.driveNotes.tollMoney)
    }

    static getPurposeString(purposeId: string) {
        switch (purposeId) {
            case YMPurpose.defaultPuposesIds.business:
                return 'Business to Business'

            case YMPurpose.defaultPuposesIds.charity:
                return 'Charity'

            case YMPurpose.defaultPuposesIds.medical:
                return 'Medical'

            case YMPurpose.defaultPuposesIds.moving:
                return 'Moving'

            case YMPurpose.defaultPuposesIds.personal:
                return 'Personal to Personal'
            
            default:
                return ''
        }
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMReportLine(new YMDateRange(undefined, undefined), '', '', '', 0, 0, 0, 0)
        
        return new YMReportLine(obj.when, obj.purpose, obj.fromTo, obj.vehicle, obj.distanceInMiles, obj.value, obj.parking, obj.tolls)
    }
}
