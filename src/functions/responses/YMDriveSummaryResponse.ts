import YMDateRange from './../../common/YMDateRange'
import YMDrive from './../../common/YMDrive'
import YMDriveWeight from './YMDriveWeight'
import YMPurpose from './../../common/YMPurpose'
import YMRate from './../../common/YMRate'
import YMUserSettings from './../../common/YMUserSettings'
import YMGlobalUserSettings from './../../common/YMGlobalUserSettings'
import * as Moment from 'moment'

export default class YMDriveSummaryResponse {
    drivesCount: { [purposeId: string]: number }
    earned: number
    potential: number
    loggedMiles: number
    totalMiles: number
    dateRange: YMDateRange
    parkingMoney: number
    tollMoney: number
    driveWeights: { [driveId: string]: YMDriveWeight }
    lastUpdated: number

    constructor (
        drivesCount: { [purposeId: string]: number },
        earned: number,
        potential: number,
        loggedMiles: number,
        totalMiles: number,
        dateRange: YMDateRange,
        parkingMoney: number,
        tollsMoney: number,
        driveWeights: { [driveId: string]: YMDriveWeight },
        lastUpdated: number) {
        this.drivesCount = drivesCount
        this.earned = earned
        this.potential = potential
        this.loggedMiles = loggedMiles
        this.totalMiles = totalMiles
        this.dateRange = YMDateRange.fromObject(dateRange)
        this.parkingMoney = parkingMoney
        this.tollMoney = tollsMoney
        this.driveWeights = driveWeights
        this.lastUpdated = lastUpdated
    }

    getKey() {
        return YMDriveSummaryResponse.getMonthlyIdFromDateRange(this.dateRange)
    }

    getClassifiedDrivesCount() {
        return Object.keys(this.drivesCount).map(key =>
            YMPurpose.defaultPuposesIds.undetermined === key ? 0 : this.drivesCount[key])
            .reduce((total, num) => total + num, 0)
    }

    getTotalDrivesCount() {
        return Object.keys(this.drivesCount).map(key =>
            this.drivesCount[key])
            .reduce((total, num) => total + num, 0)
    }

    reduceDriveWeight(driveWeight: YMDriveWeight) {
        this.earned -= driveWeight.earned
        this.potential -= driveWeight.potential
        if (this.drivesCount[driveWeight.drivesPurposeId] !== undefined) {
            this.drivesCount[driveWeight.drivesPurposeId] -= 1
        }
        this.loggedMiles -= driveWeight.loggedMiles
        this.parkingMoney -= driveWeight.parkingMoney
        this.tollMoney -= driveWeight.tollMoney
        this.totalMiles -= driveWeight.totalMiles
        this.driveWeights[driveWeight.driveId] = undefined
    }

    reduceDriveWeightFromDriveId(driveId: string) {
        const driveWeight = this.driveWeights[driveId]
        if (driveWeight !== undefined) {
            this.reduceDriveWeight(driveWeight)
        }
    }

    addDriveValue(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings) {
        const driveWeight = YMDriveWeight.fromObject(undefined)
        
        if (drive.drivePurposeId !== YMPurpose.defaultPuposesIds.undetermined) {
            driveWeight.earned = drive.miles * YMRate.getRateForPurposeId(drive.drivePurposeId, userSettings, globalSettings, drive)
            this.earned += driveWeight.earned

            driveWeight.loggedMiles = drive.miles
            this.loggedMiles += drive.miles
            
            driveWeight.parkingMoney = drive.drivePurposeId === YMPurpose.defaultPuposesIds.personal ? 0 : drive.driveNotes.parkingMoney
            driveWeight.tollMoney = drive.drivePurposeId === YMPurpose.defaultPuposesIds.personal ? 0 : drive.driveNotes.tollMoney
            this.parkingMoney += driveWeight.parkingMoney
            this.tollMoney += driveWeight.tollMoney
        } else {
            driveWeight.potential = drive.miles * YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.business, userSettings, globalSettings, drive)
            this.potential += driveWeight.potential
        }

        driveWeight.totalMiles = drive.miles
        this.totalMiles += driveWeight.totalMiles

        if (this.drivesCount[drive.drivePurposeId] === undefined) {
            this.drivesCount[drive.drivePurposeId] = 1
        } else {
            this.drivesCount[drive.drivePurposeId] += 1
        }

        driveWeight.drivesPurposeId = drive.drivePurposeId
        driveWeight.driveId = drive.driveId

        this.driveWeights[driveWeight.driveId] = driveWeight
        this.lastUpdated = drive.lastUpdated
    }

    reduceDriveValue(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings) {
        this.reduceDriveWeightFromDriveId(drive.driveId)
    }

    static getMonthlyIdFromDateRange(dateRange: YMDateRange) {
        if (dateRange.isMonthRange()) {
            return YMDriveSummaryResponse.getMonthlyId(dateRange.startDateMonth, dateRange.startDateYear)
        }
        
        return undefined
    }

    static getMonthlyId(month: number, year: number) {
        return `${year}_${month}_v2`
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMDriveSummaryResponse({}, 0, 0, 0, 0, YMDateRange.fromObject({}), 0, 0, {}, 0)

        return new YMDriveSummaryResponse(obj.drivesCount, obj.earned, obj.potential, obj.loggedMiles, obj.totalMiles, obj.dateRange, obj.parkingMoney, obj.tollMoney, obj.driveWeights, obj.lastUpdated)
    }
}