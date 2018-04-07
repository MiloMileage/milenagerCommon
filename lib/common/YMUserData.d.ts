import YMDrive from './YMDrive';
import YMSavedLocation from './YMSavedLocation';
import YMUserSettings from './YMUserSettings';
import YMRateIRS from './YMRateIRS';
export default class YMUserData {
    drives: Array<YMDrive>;
    savedLocations: Map<string, YMSavedLocation>;
    rates: Map<string, YMRateIRS>;
    userSettings: YMUserSettings;
    globalSettings: YMUserSettings;
    constructor(drives?: Array<YMDrive>, savedLocations?: Map<string, YMSavedLocation>, rates?: Map<string, YMRateIRS>, userSettings?: YMUserSettings, globalSettings?: YMUserSettings);
    static fromObject(obj: any): YMUserData;
}
