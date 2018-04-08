import YMDrive from './YMDrive';
import YMSavedLocation from './YMSavedLocation';
import YMUserSettings from './YMUserSettings';
import YMRateIRS from './YMRateIRS';
import YMDateRange from './YMDateRange';
export default class YMUserData {
    drives: Array<YMDrive>;
    savedLocations: Map<string, YMSavedLocation>;
    rates: Map<string, YMRateIRS>;
    userSettings: YMUserSettings;
    globalSettings: YMUserSettings;
    fcmToken: string;
    dateRange: YMDateRange;
    loading: boolean;
    constructor(drives?: Array<YMDrive>, savedLocations?: Map<string, YMSavedLocation>, rates?: Map<string, YMRateIRS>, userSettings?: YMUserSettings, globalSettings?: YMUserSettings, dateRange?: YMDateRange, loading?: boolean);
    static fromObject(obj: any): YMUserData;
}
