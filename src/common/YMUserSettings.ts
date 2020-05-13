import YMVehicle from './YMVehicle'
import YMPurpose from './YMPurpose'
import YMNotificationSetting from './YMNotificationSetting'
import YMPersonalSettings from './YMPersonalSettings'
import YMAutoLocationRule from './YMAutoLocationRule'
import YMRate from './YMRate'
import YMWorkingHour from './YMWorkingHour'
import YMCustomClassification from './YMCustomClassification'

export enum YMCountry {
    US = 'US',
    CA = 'CA',
    AU = 'AU',
    UK = 'UK',
    CUSTOME = 'CUSTOME'
}

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
    isLocationClassificationEnabled: boolean
    isCustomClassificationEnabled: boolean
    customClassifications: Array<YMCustomClassification>
    country: YMCountry

    constructor (vehicles: Array<YMVehicle> = [], personalRates: Array<YMRate> = [], purposes: Array<YMPurpose> = [],
        notificationSettings: Array<YMNotificationSetting> = [], personalSettings: YMPersonalSettings = new YMPersonalSettings(false, '1', undefined),
        autoRules: Array<YMAutoLocationRule> = [], workingHours: Array<YMWorkingHour> = [],
        isWorkingHoursEnabled: boolean = false, isAutoRulesEnabled: boolean = true, isCustomClassificationEnabled: boolean = false, customClassifications = [], isLocationClassificationEnabled: boolean = false, country: YMCountry = YMCountry.CUSTOME) {
        this.vehicles = vehicles.map(x => YMVehicle.fromObject(x))
        this.personalRates = personalRates.map(x => YMRate.fromObject(x))
        this.purposes = purposes.map(x => YMPurpose.fromObject(x))
        this.notificationSettings = notificationSettings.map(x => YMNotificationSetting.fromObject(x))
        this.personalSettings = YMPersonalSettings.fromObject(personalSettings)
        this.autoRules = autoRules.map(x => YMAutoLocationRule.fromObject(x))
        this.workingHours = workingHours.map(x => YMWorkingHour.fromObject(x))
        this.isWorkingHoursEnabled = isWorkingHoursEnabled
        this.isAutoRulesEnabled = isAutoRulesEnabled
        this.isCustomClassificationEnabled = isCustomClassificationEnabled
        this.customClassifications = customClassifications
        this.isLocationClassificationEnabled = isLocationClassificationEnabled
        this.country = country ? country : YMCountry.US
    }

    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if(obj == null) return new YMUserSettings([], [], [], [], YMPersonalSettings.fromObject(undefined),
        [], [], false, false, false, [], false, undefined)

        return new YMUserSettings(obj.vehicles, obj.personalRates, obj.purposes, obj.notificationSettings,
                                    obj.personalSettings, obj.autoRules, obj.workingHours, obj.isWorkingHoursEnabled,
                                        obj.isAutoRulesEnabled, obj.isCustomClassificationEnabled, obj.customClassifications, obj.isLocationClassificationEnabled, obj.country)
    }

    isDriveDetectionEnabled() {
        return this.personalSettings.isDriveDetectionEnabled()
    }

    getPrimaryVehicle() {
        const primaryVehicle = this.vehicles.filter(x => x.visible).sort((x, y) => y.primaryTime - x.primaryTime)[0]
        return primaryVehicle === undefined ? '0' : primaryVehicle.vehicleId
    }

    getPurposeCategory(purposeId: string) {
        const purpose: YMPurpose = this.purposes.filter(x => x.purposeId === purposeId)[0]

        if (purpose == null) {
            return ''
        }

        return purpose.category
    }
}