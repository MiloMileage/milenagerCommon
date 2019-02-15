import YMPurpose from './YMPurpose';
import YMNotificationSetting from './YMNotificationSetting';
import YMWorkingHour from './YMWorkingHour';
import YMTutorialContainer from './YMTutorialContainer';
export default class YMGlobalUserSettings {
    purposes: Array<YMPurpose>;
    notificationSettings: Array<YMNotificationSetting>;
    workingHours: Array<YMWorkingHour>;
    irsRates: {
        [ind: string]: {
            [ind: string]: number;
        };
    };
    tutorialContainers: {
        [ind: string]: Array<YMTutorialContainer>;
    };
    constructor(purposes: Array<YMPurpose>, notificationSettings: Array<YMNotificationSetting>, workingHours: Array<YMWorkingHour>, irsRates: {
        [ind: string]: {
            [ind: string]: number;
        };
    }, tutorialContainers: {
        [ind: string]: Array<YMTutorialContainer>;
    });
    static fromObject(obj: any): YMGlobalUserSettings;
}
