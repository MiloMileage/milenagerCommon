import YMLocation from './YMLocation'
import YMDriveNotes from './YMDriveNotes'
import YMUserSettings from './YMUserSettings'
import YMPurpose from './YMPurpose'
import YMRate from './YMRate'
import YMGlobalUserSettings from './YMGlobalUserSettings'
import { getUniqueDriveId } from './../store/common'

export default class YMDrive {
    // tslint:disable-next-line:variable-name
    obj_db_id: string
    driveId: string
    vehicleId: string
    drivePurposeId: string
    miles: number
    origin: YMLocation
    dest: YMLocation
    routeLocations: Array<YMLocation>
    startTime: Date
    endTime: Date
    endTimeTimestampUtc: number
    driveNotes: YMDriveNotes
    isVisible: boolean
    isDeleted: boolean
    isClassified: boolean
    isAutoWorkHours: boolean
    isAutoLocation: boolean
    isManual: boolean
    joinedFromIds: Array<string>
    lastUpdated: number
    startTimeTimestampUtc: number
    timestampOffsetInSeconds: number
    deletionReason: string

    constructor (driveId: string,
        vehicleId: string, drivePurposeId: string, miles: number, origin: YMLocation, dest: YMLocation,
        startTime: Date, endTime: Date, driveNotes: YMDriveNotes, isVisible: boolean = true, isDeleted: boolean = false,
        // tslint:disable-next-line:variable-name
        joinedFromIds: Array<string> = [], obj_db_id: string, lastUpdated: number,
        startTimeTimestampUtc: number, endTimeTimestampUtc: number, timestampOffsetInSeconds: number, routeLocations: Array<YMLocation> = [], isManual: boolean = false, deletionReason: string = '', isAutoWorkHours: boolean = false, isAutoLocation: boolean = false) {
        this.driveId = driveId
        this.vehicleId = vehicleId
        this.drivePurposeId = drivePurposeId
        this.miles = miles
        this.origin = YMLocation.fromObject(origin)
        this.dest = YMLocation.fromObject(dest)
        this.startTime = new Date(startTime)
        this.endTime = new Date(endTime)
        this.driveNotes = YMDriveNotes.fromObject(driveNotes)
        this.isVisible = isVisible
        this.isDeleted = isDeleted
        this.joinedFromIds = joinedFromIds
        this.obj_db_id = obj_db_id
        this.lastUpdated = lastUpdated
        this.startTimeTimestampUtc = startTimeTimestampUtc
        this.endTimeTimestampUtc = endTimeTimestampUtc
        this.timestampOffsetInSeconds = timestampOffsetInSeconds
        this.routeLocations = routeLocations
        this.isManual = isManual
        this.isClassified = drivePurposeId !== YMPurpose.defaultPuposesIds.undetermined
        this.deletionReason = deletionReason
        this.isAutoWorkHours = isAutoWorkHours
        this.isAutoLocation = isAutoLocation
    }

    public setPurposeId = (purposeId: string) => {
        this.drivePurposeId = purposeId
        this.isClassified = this.drivePurposeId !== YMPurpose.defaultPuposesIds.undetermined
    }

    public getVehicleName = (userSettings: YMUserSettings) => {
        const vehicle = userSettings.vehicles.filter(v => v.vehicleId === this.vehicleId)[0]

        return vehicle === undefined ? '' : vehicle.nickName
    }

    public getPurpose = (userSettings: YMUserSettings) => {
        return userSettings.purposes.filter(p => p.purposeId === this.drivePurposeId)[0]
    }

    public getValue = (userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings) => {
        return this.drivePurposeId === YMPurpose.defaultPuposesIds.undetermined ? 0 : YMRate.getRateForPurposeId(this.drivePurposeId, userSettings, globalSettings, this) * this.miles
    }

    public static fromObject = function(obj: any) {
        if(obj == null) return new YMDrive('', '', '', 0,
            YMLocation.fromObject(undefined), YMLocation.fromObject(undefined), new Date, new Date,
            YMDriveNotes.fromObject(undefined), false, false, [], '', 0, 0, 0, 0, [], false, '', false, false)
        // tslint:disable-next-line:max-line-length
        return new YMDrive(obj.driveId, obj.vehicleId,
                obj.drivePurposeId, obj.miles, obj.origin, obj.dest, obj.startTime, obj.endTime,
                    obj.driveNotes, obj.isVisible, obj.isDeleted, obj.joinedFromIds, obj.obj_db_id,
                    new Date().getTime(), obj.startTimeTimestampUtc, obj.endTimeTimestampUtc, obj.timestampOffsetInSeconds, obj.routeLocations, obj.isManual, obj.deletionReason, obj.isAutoWorkHours, obj.isAutoLocation)
    }

    public static getUniqueDriveArray = (drives: Array<YMDrive>) => {
        const set = new Set<string>()
        const uniqueDrives = new Array<YMDrive>()
        drives.forEach(d => {
            if (!set.has(d.driveId)) {
                uniqueDrives.push(d)
                set.add(d.driveId)
            }
        })

        return uniqueDrives
    }
}
