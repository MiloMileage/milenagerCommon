import YMDrive from './YMDrive'
import YMSavedLocation from './YMSavedLocation'
import YMUserSettings from './YMUserSettings'
import YMRateIRS from './YMRateIRS'

export default class YMUserData {
    drives: Array<YMDrive>
    savedLocations: Map<string, YMSavedLocation>
    rates: Map<string, YMRateIRS>
    userSettings: YMUserSettings
    globalSettings: YMUserSettings
    // selectedDrivesIds: Array<string>
    // filterSearch: string
    // dateRange: YMDateRange
    // isLoading: boolean

    constructor (drives: Array<YMDrive> = [], savedLocations: Map<string, YMSavedLocation> = new Map<string, YMSavedLocation>(),
            rates: Map<string, YMRateIRS> = new Map<string, YMRateIRS>(),
            userSettings: YMUserSettings = new YMUserSettings(),
            globalSettings: YMUserSettings = new YMUserSettings()) {
        this.drives = drives.map(x => YMDrive.fromObject(x))

        for (const key in savedLocations) {
            savedLocations[key] = YMSavedLocation.fromObject(savedLocations[key])
        }
        this.savedLocations = savedLocations

        for (const key in rates) {
            rates[key] = YMRateIRS.fromObject(rates[key])
        }
        this.rates = rates

        this.userSettings = YMUserSettings.fromObject(userSettings)
        this.globalSettings = YMUserSettings.fromObject(globalSettings)
    }

    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if(obj == null) return new YMUserData([], new Map<string, YMSavedLocation>(), new Map<string, YMRateIRS>(),
        YMUserSettings.fromObject(undefined), YMUserSettings.fromObject(undefined))

        return new YMUserData(obj.drives, obj.savedLocations, obj.rates, obj.userSettings, obj.globalSettings)
    }
}