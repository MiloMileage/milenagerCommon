import YMPurpose from './YMPurpose'
import YMNotificationSetting from './YMNotificationSetting'
import YMWorkingHour from './YMWorkingHour'
import YMTutorialContainer from './YMTutorialContainer'
import YMRate from './YMRate'

export default class YMGlobalUserSettings {
    purposes: Array<YMPurpose>
    notificationSettings: Array<YMNotificationSetting>
    workingHours: Array<YMWorkingHour>
    irsRates: { [ind: string]: { [ind: string]: number } }
    caRates: { [ind: string]: { [ind: string]: YMRate } }
    auRates: { [ind: string]: { [ind: string]: YMRate } }
    ukRates: { [ind: string]: { [ind: string]: YMRate } }
    tutorialContainers: { [ind: string]: Array<YMTutorialContainer> }

    constructor (purposes: Array<YMPurpose> = [],
        notificationSettings: Array<YMNotificationSetting> = [],
        workingHours: Array<YMWorkingHour> = [],
        irsRates: { [ind: string]: { [ind: string]: number } },
        tutorialContainers: { [ind: string]: Array<YMTutorialContainer> },
        caRates: { [ind: string]: { [ind: string]: YMRate } },
        auRates: { [ind: string]: { [ind: string]: YMRate } },
        ukRates: { [ind: string]: { [ind: string]: YMRate } },) {
        this.purposes = purposes.map(x => YMPurpose.fromObject(x))
        this.notificationSettings = notificationSettings.map(x => YMNotificationSetting.fromObject(x))
        this.workingHours = workingHours.map(x => YMWorkingHour.fromObject(x))
        this.irsRates = irsRates
        this.tutorialContainers = tutorialContainers
        this.caRates = caRates
        this.auRates = auRates
        this.ukRates = ukRates
    }

    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if(obj == null) return new YMGlobalUserSettings([], [], [], {}, {}, {}, {}, {})

        return new YMGlobalUserSettings(
            obj.purposes,
            obj.notificationSettings,
            obj.workingHours,
            obj.irsRates,
            obj.tutorialContainers,
            obj.caRates,
            obj.auRates,
            obj.ukRates)
    }
}