import YMVehicle from './YMVehicle';
import YMPurpose from './YMPurpose';
import YMNotificationSetting from './YMNotificationSetting';
import YMPersonalSettings from './YMPersonalSettings';
import YMAutoLocationRule from './YMAutoLocationRule';
import YMRate from './YMRate';
import YMWorkingHour from './YMWorkingHour';
import YMCustomClassification from './YMCustomClassification';
export declare enum YMCountry {
    US = "US",
    CA = "CA",
    AU = "AU",
    UK = "UK",
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
    constructor(vehicles?: Array<YMVehicle>, personalRates?: Array<YMRate>, purposes?: Array<YMPurpose>, notificationSettings?: Array<YMNotificationSetting>, personalSettings?: YMPersonalSettings, autoRules?: Array<YMAutoLocationRule>, workingHours?: Array<YMWorkingHour>, isWorkingHoursEnabled?: boolean, isAutoRulesEnabled?: boolean, isCustomClassificationEnabled?: boolean, customClassifications?: any[], isLocationClassificationEnabled?: boolean, country?: YMCountry);
    static fromObject(obj: any): YMUserSettings;
    isDriveDetectionEnabled(): boolean;
    getPrimaryVehicle(): string;
    getPurposeCategory(purposeId: string): string;
}
