import YMDateRange from './YMDateRange';
import YMDrive from './YMDrive';
import YMUserSettings from './YMUserSettings';
import YMGlobalUserSettings from './YMGlobalUserSettings';
import YMSavedLocation from './YMSavedLocation';
export default class YMReportLine {
    when: YMDateRange;
    purpose: string;
    fromTo: string;
    fromToPersonalized: string;
    vehicle: string;
    distanceInMiles: number;
    value: number;
    parking: number;
    tolls: number;
    constructor(when: YMDateRange, purpose: string, fromTo: string, fromToPersonalized: string, vehicle: string, distanceInMiles: number, value: number, parking: number, tolls: number);
    static fromDrive(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings, savedLocations: {
        [ind: string]: YMSavedLocation;
    }): YMReportLine;
    static getPurposeString(purposeId: string): "" | "Business to Business" | "Charity" | "Medical" | "Moving" | "Personal to Personal";
    static fromObject: (obj: any) => YMReportLine;
}
