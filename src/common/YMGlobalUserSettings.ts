import YMVehicle from './YMVehicle'
import YMPurpose from './YMPurpose'
import YMNotificationSetting from './YMNotificationSetting'
import YMPersonalSettings from './YMPersonalSettings'
import YMAutoLocationRule from './YMAutoLocationRule'
import YMRate from './YMRate'
import YMWorkingHour from './YMWorkingHour'
import YMTutorialView from './YMTutorialView'

export default class YMGlobalUserSettings {
    purposes: Array<YMPurpose>
    notificationSettings: Array<YMNotificationSetting>
    workingHours: Array<YMWorkingHour>
    irsRates: Map<string, Map<string, number>>
    tutorialViews: Array<YMTutorialView>

    constructor (purposes: Array<YMPurpose> = [],
        notificationSettings: Array<YMNotificationSetting> = [],
        workingHours: Array<YMWorkingHour> = [],
        irsRates: Map<string, Map<string, number>>,
        tutorialViews: Array<YMTutorialView> = []) {
        this.purposes = purposes.map(x => YMPurpose.fromObject(x))
        this.notificationSettings = notificationSettings.map(x => YMNotificationSetting.fromObject(x))
        this.workingHours = workingHours.map(x => YMWorkingHour.fromObject(x))
        this.irsRates = irsRates
        this.tutorialViews = tutorialViews.map(x => YMTutorialView.fromObject(x))
    }

    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if(obj == null) return new YMGlobalUserSettings([], [], [], new Map<string, Map<string, number>>(), [])

        return new YMGlobalUserSettings(obj.purposes, obj.notificationSettings, obj.workingHours, obj.irsRates, obj.tutorialViews)
    }
}