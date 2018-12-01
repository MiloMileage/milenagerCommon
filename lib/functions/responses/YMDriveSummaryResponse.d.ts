import YMDateRange from './../../common/YMDateRange';
import YMDrive from './../../common/YMDrive';
import YMDriveWeight from './YMDriveWeight';
import YMUserSettings from './../../common/YMUserSettings';
import YMGlobalUserSettings from './../../common/YMGlobalUserSettings';
export default class YMDriveSummaryResponse {
    drivesCount: {
        [purposeId: string]: number;
    };
    earned: number;
    potential: number;
    loggedMiles: number;
    totalMiles: number;
    dateRange: YMDateRange;
    parkingMoney: number;
    tollMoney: number;
    driveWeights: {
        [driveId: string]: YMDriveWeight;
    };
    lastUpdated: number;
    constructor(drivesCount: {
        [purposeId: string]: number;
    }, earned: number, potential: number, loggedMiles: number, totalMiles: number, dateRange: YMDateRange, parkingMoney: number, tollsMoney: number, driveWeights: {
        [driveId: string]: YMDriveWeight;
    }, lastUpdated: number);
    getKey(): string;
    getClassifiedDrivesCount(): number;
    getTotalDrivesCount(): number;
    reduceDriveWeight(driveWeight: YMDriveWeight): void;
    reduceDriveWeightFromDriveId(driveId: string): void;
    addDriveValue(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings): void;
    reduceDriveValue(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings): void;
    static getMonthlyIdFromDateRange(dateRange: YMDateRange): string;
    static getMonthlyId(month: number, year: number, timezoneOffsetInMinutes: number): string;
    static fromObject: (obj: any) => YMDriveSummaryResponse;
}
