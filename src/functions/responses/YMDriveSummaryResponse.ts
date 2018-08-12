import YMDateRange from './../../common/YMDateRange'
import YMDrive from './../../common/YMDrive'
import YMPurpose from './../../common/YMPurpose'
import YMRate from './../../common/YMRate'
import YMUserSettings from './../../common/YMUserSettings'
import YMGlobalUserSettings from './../../common/YMGlobalUserSettings'

export default class YMDriveSummaryResponse {
    drivesCount: { [purposeId: string]: number }
    earned: number
    potential: number
    loggedMiles: number
    totalMiles: number
    dateRange: YMDateRange
    parkingMoney: number
    tollMoney: number

    constructor (
        drivesCount: { [purposeId: string]: number },
        earned: number,
        potential: number,
        loggedMiles: number,
        totalMiles: number,
        dateRange: YMDateRange,
        parkingMoney: number,
        tollsMoney: number) {
        this.drivesCount = drivesCount
        this.earned = earned
        this.potential = potential
        this.loggedMiles = loggedMiles
        this.totalMiles = totalMiles
        this.dateRange = dateRange
        this.parkingMoney = parkingMoney
        this.tollMoney = tollsMoney
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

    addDriveValue(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings) {
        if (drive.drivePurposeId !== YMPurpose.defaultPuposesIds.undetermined) {
            this.earned += drive.miles * YMRate.getRateForPurposeId(drive.drivePurposeId, userSettings, globalSettings, drive)
            this.loggedMiles += drive.miles
        } else {
            this.potential += drive.miles * YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.business, userSettings, globalSettings, drive)
        }

        this.totalMiles += drive.miles
        this.parkingMoney += drive.driveNotes.parkingMoney
        this.tollMoney += drive.driveNotes.tollMoney

        if (this.drivesCount[drive.drivePurposeId] === undefined) {
            this.drivesCount[drive.drivePurposeId] = 1
        } else {
            this.drivesCount[drive.drivePurposeId] += 1
        }
    }

    reduceDriveValue(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings) {
        if (drive.drivePurposeId !== YMPurpose.defaultPuposesIds.undetermined) {
            this.earned -= drive.miles * YMRate.getRateForPurposeId(drive.drivePurposeId, userSettings, globalSettings, drive)
            this.loggedMiles -= drive.miles
        } else {
            this.potential -= drive.miles * YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.business, userSettings, globalSettings, drive)
        }

        this.totalMiles -= drive.miles
        this.parkingMoney -= drive.driveNotes.parkingMoney
        this.tollMoney -= drive.driveNotes.tollMoney

        this.drivesCount[drive.drivePurposeId] -= 1
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMDriveSummaryResponse({}, 0, 0, 0, 0, YMDateRange.fromObject({}), 0, 0)

        return new YMDriveSummaryResponse(obj.drivesCount, obj.earned, obj.potential, obj.loggedMiles, obj.totalMiles, obj.dateRange, obj.parkingMoney, obj.tollMoney)
    }
}