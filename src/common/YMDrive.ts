import YMLocation from './YMLocation'
import YMDriveNotes from './YMDriveNotes'
import YMUserSettings from './YMUserSettings'
import YMPurpose from './YMPurpose'
import YMRate from './YMRate'
import YMGlobalUserSettings from './YMGlobalUserSettings'

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
    signalSource: string
    didApplyDefaults: boolean

    constructor (driveId: string,
        vehicleId: string, drivePurposeId: string, miles: number, origin: YMLocation, dest: YMLocation,
        driveNotes: YMDriveNotes, isVisible: boolean = true, isDeleted: boolean = false,
        // tslint:disable-next-line:variable-name
        joinedFromIds: Array<string> = [], obj_db_id: string, lastUpdated: number,
        startTimeTimestampUtc: number, endTimeTimestampUtc: number, timestampOffsetInSeconds: number, routeLocations: Array<YMLocation> = [], isManual: boolean = false, deletionReason: string = '', isAutoWorkHours: boolean = false, isAutoLocation: boolean = false, signalSource: string = 'unknown', didApplyDefaults: boolean = false) {
        this.driveId = driveId
        this.vehicleId = vehicleId
        this.drivePurposeId = drivePurposeId
        this.miles = miles
        this.origin = YMLocation.fromObject(origin)
        this.dest = YMLocation.fromObject(dest)
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
        this.signalSource = signalSource
        this.didApplyDefaults = didApplyDefaults
    }

    public startTime = () => {
        return new Date().getTimezoneOffset() === 0 ? this.startTimeInUtcEnv() : new Date(this.startTimeTimestampUtc * 1000)
    }

    public endTime = () => {
        return new Date().getTimezoneOffset() === 0 ? this.endTimeInUtcEnv() : new Date(this.endTimeTimestampUtc * 1000)
    }

    public getStartTimeLocal = () => {
        return new Date((this.startTimeTimestampUtc + (new Date().getTimezoneOffset() * 60 + this.timestampOffsetInSeconds)) * 1000)
    }

    public getEndTimeLocal = () => {
        return new Date((this.endTimeTimestampUtc + (new Date().getTimezoneOffset() * 60 + this.timestampOffsetInSeconds)) * 1000)
    }

    public startTimeInUtcEnv = () => {
        const d = new Date(this.startTimeTimestampUtc * 1000)
        d.setTime(d.getTime() + (this.timestampOffsetInSeconds === undefined ? new Date().getTimezoneOffset() : this.timestampOffsetInSeconds) *1000)

        return d
    }

    public endTimeInUtcEnv = () => {
        const d = new Date(this.endTimeTimestampUtc * 1000)
        d.setTime(d.getTime() + (this.timestampOffsetInSeconds === undefined ? new Date().getTimezoneOffset() : this.timestampOffsetInSeconds) *1000)

        return d
    }

    public setPurposeId = (purposeId: string) => {
        this.drivePurposeId = purposeId
        this.isClassified = this.drivePurposeId !== YMPurpose.defaultPuposesIds.undetermined
    }

    public getVehicle = (userSettings: YMUserSettings) => {
        return userSettings.vehicles.filter(v => v.vehicleId === this.vehicleId)[0]
    }

    public getVehicleName = (userSettings: YMUserSettings) => {
        const vehicle = this.getVehicle(userSettings)
        
        return vehicle === undefined ? '' : vehicle.nickName
    }

    public getPurpose = (userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings) => {
        const purposeFromUserSettings = userSettings.purposes.filter(p => p.purposeId === this.drivePurposeId)
        if (purposeFromUserSettings.length > 0) {
            return purposeFromUserSettings[0]
        }

        return globalSettings.purposes.filter(p => p.purposeId === this.drivePurposeId)[0]
    }

    public getValue = (userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings) => {
        return this.drivePurposeId === YMPurpose.defaultPuposesIds.undetermined ? 0 : YMRate.getRateForPurposeId(this.drivePurposeId, userSettings, globalSettings, this) * this.miles
    }

    public static fromObject = function(obj: any) {
        if(obj == null) return new YMDrive('', '', '', 0,
            YMLocation.fromObject(undefined), YMLocation.fromObject(undefined),
            YMDriveNotes.fromObject(undefined), false, false, [], '', 0, 0, 0, 0, [], false, '', false, false)
        // tslint:disable-next-line:max-line-length
        return new YMDrive(obj.driveId, obj.vehicleId,
                obj.drivePurposeId, obj.miles, obj.origin, obj.dest,
                    obj.driveNotes, obj.isVisible, obj.isDeleted, obj.joinedFromIds, obj.obj_db_id,
                    obj.lastUpdated, obj.startTimeTimestampUtc, obj.endTimeTimestampUtc, obj.timestampOffsetInSeconds, obj.routeLocations, obj.isManual, obj.deletionReason, obj.isAutoWorkHours, obj.isAutoLocation, obj.signalSource, obj.didApplyDefaults)
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

    public static smartConcatDrivesArray = (drives1: Array<YMDrive>, drives2: Array<YMDrive>) => {
        const drives = new Array<YMDrive>()

        let i = 0
        let j = 0

        while (i < drives1.length || j < drives2.length) {
            if (i >= drives1.length) {
                drives.push(drives2[j])
                j++

                continue
            }

            if (j >= drives2.length) {
                drives.push(drives1[i])
                i++
                
                continue
            }
            
            const drive1 = drives1[i]
            const drive2 = drives2[j]

            if (drive1.startTimeTimestampUtc > drive2.startTimeTimestampUtc) {
                drives.push(drive1)
                i++

                continue
            }

            drives.push(drive2)
            j++            
        }

        return drives
    }
}
