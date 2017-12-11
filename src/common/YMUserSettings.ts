import YMVehicle from './YMVehicle'
import YMPurpose from './YMPurpose'
import YMNotificationSetting from './YMNotificationSetting'
import YMPersonalSettings from './YMPersonalSettings'
import YMAutoLocationRule from './YMAutoLocationRule'
import YMRate from './YMRate'
import YMWorkingHour from './YMWorkingHour'

export default class YMUserSettings {
    vehicles: Array<YMVehicle>
    personalRates: Array<YMRate>
    purposes: Array<YMPurpose>
    notificationSettings: Array<YMNotificationSetting>
    personalSettings: YMPersonalSettings
    autoRules: Array<YMAutoLocationRule>
    workingHours: Array<YMWorkingHour>
    isWorkingHoursEnabled: boolean
    isAutoRulesEnabled: boolean

    constructor (vehicles: Array<YMVehicle> = [], personalRates: Array<YMRate> = [], purposes: Array<YMPurpose> = [],
        notificationSettings: Array<YMNotificationSetting> = [], personalSettings: YMPersonalSettings = new YMPersonalSettings(true, '0'),
        autoRules: Array<YMAutoLocationRule> = [], workingHours: Array<YMWorkingHour> = [],
        isWorkingHoursEnabled: boolean = false, isAutoRulesEnabled: boolean = false) {
        this.vehicles = vehicles.map(x => YMVehicle.fromObject(x))
        this.personalRates = personalRates.map(x => YMRate.fromObject(x))
        this.purposes = purposes.map(x => YMPurpose.fromObject(purposes))
        this.notificationSettings = notificationSettings.map(x => YMNotificationSetting.fromObject(x))
        this.personalSettings = YMPersonalSettings.fromObject(personalSettings)
        this.autoRules = autoRules.map(x => YMAutoLocationRule.fromObject(x))
        this.workingHours = workingHours.map(x => YMWorkingHour.fromObject(x))
        this.isWorkingHoursEnabled = isWorkingHoursEnabled
        this.isAutoRulesEnabled = isAutoRulesEnabled
    }

    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        return new YMUserSettings(obj.vehicles, obj.personalRates, obj.purposes, obj.notificationSettings,
                                    obj.personalSettings, obj.autoRules, obj.workingHours, obj.isWorkingHoursEnabled,
                                        obj.isAutoRulesEnabled)
    }
}