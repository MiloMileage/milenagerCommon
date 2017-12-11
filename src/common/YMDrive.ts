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
    startTime: Date
    endTime: Date
    driveNotes: YMDriveNotes
    isVisible: boolean
    isDeleted: boolean
    joinedFromIds: Array<string>
    lastUpdated: number

    constructor (driveId: string, autoClassifiedRuleId: string = '', reportIds: Array<string> = [],
        vehicleId: string, drivePurposeId: string, miles: number, origin: YMLocation, dest: YMLocation,
        startTime: Date, endTime: Date, driveNotes: YMDriveNotes, isVisible: boolean = true, isDeleted: boolean = false,
        // tslint:disable-next-line:variable-name
        joinedFromIds: Array<string> = [], obj_db_id: string, lastUpdated: number) {
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
    }

    public static fromObject = function(obj: any) {
        // tslint:disable-next-line:max-line-length
        return new YMDrive(obj.driveId, obj.autoClassifiedRuleId, obj.reportIds, obj.vehicleId,
                obj.drivePurposeId, obj.miles, obj.origin, obj.dest, obj.startTime, obj.endTime,
                    obj.driveNotes, obj.isVisible, obj.isDeleted, obj.joinedFromIds, obj.obj_db_id,
                    new Date().getTime())
    }

    public static joinDrives = function(drives: Array<YMDrive>, dbKey: string) {
        // TODO support more than 2 drives join

        let firstDrive = drives[0]
        let secondDrive = drives[1]

        if (new Date(firstDrive.startTime).getTime() > new Date(secondDrive.startTime).getTime()) {
            const tempDrive = firstDrive
            firstDrive = secondDrive
            secondDrive = tempDrive
        }

        return new YMDrive(
            getUniqueDriveId(),
            '',
            [],
            firstDrive.vehicleId === secondDrive.vehicleId ? firstDrive.vehicleId : '', // TODO set default vehicle
            firstDrive.drivePurposeId === secondDrive.drivePurposeId ? firstDrive.drivePurposeId : '',
            firstDrive.miles + secondDrive.miles,
            firstDrive.origin,
            secondDrive.dest,
            firstDrive.startTime,
            secondDrive.endTime,
            new YMDriveNotes(
                '', // TODO - think how to combine joined drive notes
                firstDrive.driveNotes.parkingMoney + secondDrive.driveNotes.parkingMoney,
                firstDrive.driveNotes.tollMoney + secondDrive.driveNotes.tollMoney
            ),
            true,
            false,
            [firstDrive.driveId, secondDrive.driveId],
            dbKey,
            new Date().getTime()
        )
    }
}
