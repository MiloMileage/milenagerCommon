import YMPurpose from './YMPurpose';
import YMNotificationSetting from './YMNotificationSetting';
import YMWorkingHour from './YMWorkingHour';
import YMTutorialView from './YMTutorialView';
export default class YMGlobalUserSettings {
    purposes: Array<YMPurpose>;
    notificationSettings: Array<YMNotificationSetting>;
    workingHours: Array<YMWorkingHour>;
    irsRates: Map<string, Map<string, number>>;
    tutorialViews: Array<YMTutorialView>;
    constructor(purposes: Array<YMPurpose>, notificationSettings: Array<YMNotificationSetting>, workingHours: Array<YMWorkingHour>, irsRates: Map<string, Map<string, number>>, tutorialViews?: Array<YMTutorialView>);
    static fromObject(obj: any): YMGlobalUserSettings;
}
