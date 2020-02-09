import YMLocation from './YMLocation';
import YMDriveNotes from './YMDriveNotes';
import YMUserSettings from './YMUserSettings';
import YMPurpose from './YMPurpose';
import YMGlobalUserSettings from './YMGlobalUserSettings';
export default class YMDrive {
    obj_db_id: string;
    driveId: string;
    vehicleId: string;
    drivePurposeId: string;
    miles: number;
    origin: YMLocation;
    dest: YMLocation;
    routeLocations: Array<YMLocation>;
    endTimeTimestampUtc: number;
    driveNotes: YMDriveNotes;
    isVisible: boolean;
    isDeleted: boolean;
    isClassified: boolean;
    isAutoWorkHours: boolean;
    isAutoLocation: boolean;
    isManual: boolean;
    joinedFromIds: Array<string>;
    lastUpdated: number;
    startTimeTimestampUtc: number;
    timestampOffsetInSeconds: number;
    deletionReason: string;
    signalSource: string;
    didApplyDefaults: boolean;
    constructor(driveId: string, vehicleId: string, drivePurposeId: string, miles: number, origin: YMLocation, dest: YMLocation, driveNotes: YMDriveNotes, isVisible: boolean, isDeleted: boolean, joinedFromIds: Array<string>, obj_db_id: string, lastUpdated: number, startTimeTimestampUtc: number, endTimeTimestampUtc: number, timestampOffsetInSeconds: number, routeLocations?: Array<YMLocation>, isManual?: boolean, deletionReason?: string, isAutoWorkHours?: boolean, isAutoLocation?: boolean, signalSource?: string, didApplyDefaults?: boolean);
    startTime: () => Date;
    endTime: () => Date;
    getStartTimeLocal: () => Date;
    getEndTimeLocal: () => Date;
    startTimeInUtcEnv: () => Date;
    endTimeInUtcEnv: () => Date;
    setPurposeId: (purposeId: string) => void;
    getVehicleName: (userSettings: YMUserSettings) => string;
    getPurpose: (userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings) => YMPurpose;
    getValue: (userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings) => number;
    static fromObject: (obj: any) => YMDrive;
    static getUniqueDriveArray: (drives: YMDrive[]) => YMDrive[];
    static smartConcatDrivesArray: (drives1: YMDrive[], drives2: YMDrive[]) => YMDrive[];
}
