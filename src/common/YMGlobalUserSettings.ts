import YMPurpose from './YMPurpose'
import YMNotificationSetting from './YMNotificationSetting'
import YMWorkingHour from './YMWorkingHour'
import YMTutorialContainer from './YMTutorialContainer'
import YMRate from './YMRate'
import YMExpenseCategory from './YMExpenseCategory'
import YMIncomeSorce from './YMIncomeSource'

export default class YMGlobalUserSettings {
    purposes: Array<YMPurpose>
    notificationSettings: Array<YMNotificationSetting>
    workingHours: Array<YMWorkingHour>
    irsRates: { [ind: string]: { [ind: string]: number } }
    caRates: { [ind: string]: { [ind: string]: YMRate } }
    auRates: { [ind: string]: { [ind: string]: YMRate } }
    ukRates: { [ind: string]: { [ind: string]: YMRate } }
    tutorialContainers: { [ind: string]: Array<YMTutorialContainer> }
    expenseCategories: Array<YMExpenseCategory>
    incomeSources: Array<YMIncomeSorce>

    constructor (purposes: Array<YMPurpose> = [],
        notificationSettings: Array<YMNotificationSetting> = [],
        workingHours: Array<YMWorkingHour> = [],
        irsRates: { [ind: string]: { [ind: string]: number } },
        tutorialContainers: { [ind: string]: Array<YMTutorialContainer> },
        caRates: { [ind: string]: { [ind: string]: YMRate } },
        auRates: { [ind: string]: { [ind: string]: YMRate } },
        ukRates: { [ind: string]: { [ind: string]: YMRate } },
        expenseCategories: Array<YMExpenseCategory> = [],
        incomeSources: Array<YMIncomeSorce> = []) {
        this.purposes = purposes.map(x => YMPurpose.fromObject(x))
        this.notificationSettings = notificationSettings.map(x => YMNotificationSetting.fromObject(x))
        this.workingHours = workingHours.map(x => YMWorkingHour.fromObject(x))
        this.irsRates = irsRates
        this.tutorialContainers = tutorialContainers
        this.caRates = caRates
        for (const year in this.caRates){
            for (const businessType in this.caRates[year]) {
                this.caRates[year][businessType] = YMRate.fromObject(this.caRates[year][businessType])
            }
        }

        this.auRates = auRates
        for (const year in this.auRates){
            for (const businessType in this.auRates[year]) {
                this.auRates[year][businessType] = YMRate.fromObject(this.auRates[year][businessType])
            }
        }

        this.ukRates = ukRates
        for (const year in this.ukRates){
            for (const businessType in this.ukRates[year]) {
                this.ukRates[year][businessType] = YMRate.fromObject(this.ukRates[year][businessType])
            }
        }

        this.expenseCategories = expenseCategories
        this.incomeSources = incomeSources
    }

    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if(obj == null) return new YMGlobalUserSettings([], [], [], {}, {}, {}, {}, {}, [], [])

        return new YMGlobalUserSettings(
            obj.purposes,
            obj.notificationSettings,
            obj.workingHours,
            obj.irsRates,
            obj.tutorialContainers,
            obj.caRates,
            obj.auRates,
            obj.ukRates,
            obj.expenseCategories,
            obj.incomeSources)
    }
}