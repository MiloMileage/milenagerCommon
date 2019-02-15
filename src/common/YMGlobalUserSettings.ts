import YMVehicle from './YMVehicle'
import YMPurpose from './YMPurpose'
import YMNotificationSetting from './YMNotificationSetting'
import YMPersonalSettings from './YMPersonalSettings'
import YMAutoLocationRule from './YMAutoLocationRule'
import YMRate from './YMRate'
import YMWorkingHour from './YMWorkingHour'
import YMTutorialContainer from './YMTutorialContainer'

export default class YMGlobalUserSettings {
    purposes: Array<YMPurpose>
    notificationSettings: Array<YMNotificationSetting>
    workingHours: Array<YMWorkingHour>
    irsRates: { [ind: string]: { [ind: string]: number } }
    tutorialContainers: { [ind: string]: Array<YMTutorialContainer> }

    constructor (purposes: Array<YMPurpose> = [],
        notificationSettings: Array<YMNotificationSetting> = [],
        workingHours: Array<YMWorkingHour> = [],
        irsRates: { [ind: string]: { [ind: string]: number } },
        tutorialContainers: { [ind: string]: Array<YMTutorialContainer> }) {
        this.purposes = purposes.map(x => YMPurpose.fromObject(x))
        this.notificationSettings = notificationSettings.map(x => YMNotificationSetting.fromObject(x))
        this.workingHours = workingHours.map(x => YMWorkingHour.fromObject(x))
        this.irsRates = irsRates
        this.tutorialContainers = tutorialContainers
    }

    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if(obj == null) return new YMGlobalUserSettings([], [], [], {}, {})

        return new YMGlobalUserSettings(obj.purposes, obj.notificationSettings, obj.workingHours, obj.irsRates, obj.tutorialContainers)
    }
}