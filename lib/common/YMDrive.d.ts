import YMLocation from './YMLocation';
import YMDriveNotes from './YMDriveNotes';
export default class YMDrive {
    obj_db_id: string;
    driveId: string;
    autoClassifiedRuleId: string;
    reportIds: Array<string>;
    vehicleId: string;
    drivePurposeId: string;
    miles: number;
    origin: YMLocation;
    dest: YMLocation;
    routeLocations: Array<YMLocation>;
    startTime: Date;
    endTime: Date;
    endTimeTimestampUtc: number;
    driveNotes: YMDriveNotes;
    isVisible: boolean;
    isDeleted: boolean;
    joinedFromIds: Array<string>;
    lastUpdated: number;
    startTimeTimestampUtc: number;
    timestampOffsetInSeconds: number;
    constructor(driveId: string, autoClassifiedRuleId: string, reportIds: Array<string>, vehicleId: string, drivePurposeId: string, miles: number, origin: YMLocation, dest: YMLocation, startTime: Date, endTime: Date, driveNotes: YMDriveNotes, isVisible: boolean, isDeleted: boolean, joinedFromIds: Array<string>, obj_db_id: string, lastUpdated: number, startTimeTimestampUtc: number, endTimeTimestampUtc: number, timestampOffsetInSeconds: number, routeLocations?: Array<YMLocation>);
    static fromObject: (obj: any) => YMDrive;
    static joinDrives: (drives: YMDrive[], dbKey: string) => YMDrive;
}
