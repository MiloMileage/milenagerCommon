import YMDrive from './YMDrive';
import YMPurpose from './YMPurpose';
import YMUserSettings from './YMUserSettings';
import YMGlobalUserSettings from './YMGlobalUserSettings';
import YMSavedLocation from './YMSavedLocation';
export default class YMReportLine {
    when: Date;
    purpose: string;
    rate: number;
    fromTo: string;
    fromToPersonalized: string;
    vehicle: string;
    distanceInMiles: number;
    value: number;
    parking: number;
    tolls: number;
    constructor(when: Date, purpose: string, rate: number, fromTo: string, fromToPersonalized: string, vehicle: string, distanceInMiles: number, value: number, parking: number, tolls: number);
    static fromDrive(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings, savedLocations: {
        [ind: string]: YMSavedLocation;
    }): YMReportLine;
    static getPurposeString(purpose: YMPurpose, drive: YMDrive): string;
    static fromObject: (obj: any) => YMReportLine;
}
