import YMPurpose from './YMPurpose';
import YMNotificationSetting from './YMNotificationSetting';
import YMWorkingHour from './YMWorkingHour';
import YMTutorialContainer from './YMTutorialContainer';
import YMRate from './YMRate';
import YMExpenseCategory from './YMExpenseCategory';
import YMIncomeSorce from './YMIncomeSource';
export default class YMGlobalUserSettings {
    purposes: Array<YMPurpose>;
    notificationSettings: Array<YMNotificationSetting>;
    workingHours: Array<YMWorkingHour>;
    irsRates: {
        [ind: string]: {
            [ind: string]: number;
        };
    };
    caRates: {
        [ind: string]: {
            [ind: string]: YMRate;
        };
    };
    auRates: {
        [ind: string]: {
            [ind: string]: YMRate;
        };
    };
    ukRates: {
        [ind: string]: {
            [ind: string]: YMRate;
        };
    };
    tutorialContainers: {
        [ind: string]: Array<YMTutorialContainer>;
    };
    expenseCategories: Array<YMExpenseCategory>;
    incomeSources: Array<YMIncomeSorce>;
    constructor(purposes: Array<YMPurpose>, notificationSettings: Array<YMNotificationSetting>, workingHours: Array<YMWorkingHour>, irsRates: {
        [ind: string]: {
            [ind: string]: number;
        };
    }, tutorialContainers: {
        [ind: string]: Array<YMTutorialContainer>;
    }, caRates: {
        [ind: string]: {
            [ind: string]: YMRate;
        };
    }, auRates: {
        [ind: string]: {
            [ind: string]: YMRate;
        };
    }, ukRates: {
        [ind: string]: {
            [ind: string]: YMRate;
        };
    }, expenseCategories?: Array<YMExpenseCategory>, incomeSources?: Array<YMIncomeSorce>);
    static fromObject(obj: any): YMGlobalUserSettings;
}
