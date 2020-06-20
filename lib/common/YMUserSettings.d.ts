import YMVehicle from './YMVehicle';
import YMPurpose from './YMPurpose';
import YMNotificationSetting from './YMNotificationSetting';
import YMPersonalSettings from './YMPersonalSettings';
import YMAutoLocationRule from './YMAutoLocationRule';
import YMRate from './YMRate';
import YMWorkingHour from './YMWorkingHour';
import YMCustomClassification from './YMCustomClassification';
import YMExpenseCategory from './YMExpenseCategory';
import YMIncomeSorce from './YMIncomeSource';
export declare enum YMCountry {
    US = "US",
    CA = "CA",
    AU = "AU",
    UK = "UK",
    UNKNOWN = "UNKNOWN",
    CUSTOME = "CUSTOME"
}
export default class YMUserSettings {
    vehicles: Array<YMVehicle>;
    personalRates: Array<YMRate>;
    purposes: Array<YMPurpose>;
    notificationSettings: Array<YMNotificationSetting>;
    personalSettings: YMPersonalSettings;
    autoRules: Array<YMAutoLocationRule>;
    workingHours: Array<YMWorkingHour>;
    isWorkingHoursEnabled: boolean;
    isAutoRulesEnabled: boolean;
    isLocationClassificationEnabled: boolean;
    isCustomClassificationEnabled: boolean;
    customClassifications: Array<YMCustomClassification>;
    country: YMCountry;
    expenseCategories: Array<YMExpenseCategory>;
    incomeSources: Array<YMIncomeSorce>;
    constructor(vehicles?: Array<YMVehicle>, personalRates?: Array<YMRate>, purposes?: Array<YMPurpose>, notificationSettings?: Array<YMNotificationSetting>, personalSettings?: YMPersonalSettings, autoRules?: Array<YMAutoLocationRule>, workingHours?: Array<YMWorkingHour>, isWorkingHoursEnabled?: boolean, isAutoRulesEnabled?: boolean, isCustomClassificationEnabled?: boolean, customClassifications?: any[], isLocationClassificationEnabled?: boolean, country?: YMCountry, expenseCategories?: Array<YMExpenseCategory>, incomeSources?: Array<YMIncomeSorce>);
    static fromObject(obj: any): YMUserSettings;
    isDriveDetectionEnabled(): boolean;
    getPrimaryVehicle(): string;
    getPurposeCategory(purposeId: string): string;
}
