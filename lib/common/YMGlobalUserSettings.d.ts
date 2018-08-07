import YMPurpose from './YMPurpose';
import YMNotificationSetting from './YMNotificationSetting';
import YMWorkingHour from './YMWorkingHour';
export default class YMGlobalUserSettings {
    purposes: Array<YMPurpose>;
    notificationSettings: Array<YMNotificationSetting>;
    workingHours: Array<YMWorkingHour>;
    irsRates: Map<string, Map<string, number>>;
    constructor(purposes: Array<YMPurpose>, notificationSettings: Array<YMNotificationSetting>, workingHours: Array<YMWorkingHour>, irsRates: Map<string, Map<string, number>>);
    static fromObject(obj: any): YMGlobalUserSettings;
}
