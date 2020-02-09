import YMGlobalUserSettings from '../src/common/YMGlobalUserSettings'
import YMUserSettings from '../src/common/YMUserSettings'
import YMDrive from '../src/common/YMDrive'
import * as objectJsons from './ObjectJsons'
import YMSavedLocation from '../src/common/YMSavedLocation'

export const getGlobalUserSettings = () => {
    return YMGlobalUserSettings.fromObject(JSON.parse(objectJsons.globalUserSettings))
}

export const getUserSettings = () => {
    return YMUserSettings.fromObject(JSON.parse(objectJsons.userSettings))
}

export const getDrive = (miles: number, purposeId: string) => {
    const drive = YMDrive.fromObject(JSON.parse(objectJsons.driveWith15Miles))
    drive.miles = miles
    drive.drivePurposeId = purposeId
    return drive
}

export const getSavedLocations = () => {
    const result: { [ind: string]: YMSavedLocation } = JSON.parse(objectJsons.savedLocations)
    return result
}