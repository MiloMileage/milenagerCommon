import YMLocation from './YMLocation'
import YMDriveNotes from './YMDriveNotes'
import { getUniqueDriveId } from './../store/common'

export default class YMDrive {
    // tslint:disable-next-line:variable-name
    obj_db_id: string
    driveId: string
    autoClassifiedRuleId: string
    reportIds: Array<string>
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
    isManual: boolean
    joinedFromIds: Array<string>
    lastUpdated: number
    startTimeTimestampUtc: number
    timestampOffsetInSeconds: number

    constructor (driveId: string, autoClassifiedRuleId: string, reportIds: Array<string>,
        vehicleId: string, drivePurposeId: string, miles: number, origin: YMLocation, dest: YMLocation,
        startTime: Date, endTime: Date, driveNotes: YMDriveNotes, isVisible: boolean = true, isDeleted: boolean = false,
        // tslint:disable-next-line:variable-name
        joinedFromIds: Array<string> = [], obj_db_id: string, lastUpdated: number,
        startTimeTimestampUtc: number, endTimeTimestampUtc: number, timestampOffsetInSeconds: number, routeLocations: Array<YMLocation> = [], isManual: boolean = false) {
        this.driveId = driveId
        this.autoClassifiedRuleId = autoClassifiedRuleId
        this.reportIds = reportIds
        this.vehicleId = vehicleId
        this.drivePurposeId = drivePurposeId
        this.miles = miles
        this.origin = YMLocation.fromObject(origin)
        this.dest = YMLocation.fromObject(dest)
        this.startTime = startTime
        this.endTime = endTime
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
    }

    public static fromObject = function(obj: any) {
        if(obj == null) return new YMDrive('', '', [], '', '', 0,
            YMLocation.fromObject(undefined), YMLocation.fromObject(undefined), new Date, new Date,
            YMDriveNotes.fromObject(undefined), false, false, [], '', 0, 0, 0, 0, [], false)
        // tslint:disable-next-line:max-line-length
        return new YMDrive(obj.driveId, obj.autoClassifiedRuleId, obj.reportIds, obj.vehicleId,
                obj.drivePurposeId, obj.miles, obj.origin, obj.dest, obj.startTime, obj.endTime,
                    obj.driveNotes, obj.isVisible, obj.isDeleted, obj.joinedFromIds, obj.obj_db_id,
                    new Date().getTime(), obj.startTimeTimestampUtc, obj.endTimeTimestampUtc, obj.timestampOffsetInSeconds, obj.routeLocations, obj.isManual)
    }
}
