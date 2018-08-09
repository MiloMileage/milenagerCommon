import YMDateRange from './../../common/YMDateRange';
import YMDrive from './../../common/YMDrive';
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
    constructor(drivesCount: {
        [purposeId: string]: number;
    }, earned: number, potential: number, loggedMiles: number, totalMiles: number, dateRange: YMDateRange, parkingMoney: number, tollsMoney: number);
    addDriveValue(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings): void;
    reduceDriveValue(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings): void;
    static fromObject: (obj: any) => YMDriveSummaryResponse;
}
