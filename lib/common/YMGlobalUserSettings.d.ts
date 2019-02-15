import YMPurpose from './YMPurpose';
import YMNotificationSetting from './YMNotificationSetting';
import YMWorkingHour from './YMWorkingHour';
import YMTutorialContainer from './YMTutorialContainer';
export default class YMGlobalUserSettings {
    purposes: Array<YMPurpose>;
    notificationSettings: Array<YMNotificationSetting>;
    workingHours: Array<YMWorkingHour>;
    irsRates: Map<string, Map<string, number>>;
    tutorialContainers: Map<string, Array<YMTutorialContainer>>;
    constructor(purposes: Array<YMPurpose>, notificationSettings: Array<YMNotificationSetting>, workingHours: Array<YMWorkingHour>, irsRates: Map<string, Map<string, number>>, tutorialContainers: Map<string, Array<YMTutorialContainer>>);
    static fromObject(obj: any): YMGlobalUserSettings;
}
