import YMRate from '../src/common/YMRate'
import YMPurpose from '../src/common/YMPurpose'
import YMUserSettings from '../src/common/YMUserSettings'
import YMGlobalUserSettings from '../src/common/YMGlobalUserSettings'
import YMDrive from '../src/common/YMDrive';

const rateObj = {
    'name': 'name',
    'deductable': 2,
    'visible': true,
    'rateId': '0'
}

const purposeObjOriginal =  {
    'purposeId': YMPurpose.defaultPuposesIds.business,
    'rateId': '0',
    'name': 'name',
    'category': YMPurpose.categories.personal,
    'visible': true,
    'iconName': 'icon',
    'order' : 0
}

test('Create from object', () => {
    const rate = YMRate.fromObject(rateObj)

    expect(rate.name).toEqual('name')
    expect(rate.rateId).toEqual('0')
    expect(rate.deductable).toBe(2)
    expect(rate.visible).toBeTruthy()
})

test('Create from undefined', () => {
    const rate = YMRate.fromObject(undefined)

    expect(rate.name).toEqual('')
    expect(rate.rateId).toEqual('')
    expect(rate.deductable).toBe(0)
    expect(rate.visible).toBeFalsy()
})

test('getRateForPurposeId test', () => {
    expect(YMRate.getRateForPurposeId('0', null, null, null)).toBe(0)

    let userSettings = YMUserSettings.fromObject(undefined)
    userSettings.purposes.push(YMPurpose.fromObject(purposeObjOriginal))
    userSettings.personalRates.push(YMRate.fromObject(rateObj))

    expect(YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.undetermined, userSettings, YMGlobalUserSettings.fromObject(undefined), null)).toBe(2)

    userSettings = YMUserSettings.fromObject(undefined)
    let globalSettings = YMGlobalUserSettings.fromObject(undefined)
    globalSettings.purposes.push(YMPurpose.fromObject(purposeObjOriginal))
    
    expect(YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.undetermined, userSettings, globalSettings, null)).toBe(0)
    
    userSettings.personalRates.push(YMRate.fromObject(rateObj))
    expect(YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.undetermined, userSettings, globalSettings, null)).toBe(2)
    
    userSettings = YMUserSettings.fromObject(undefined)
    globalSettings = YMGlobalUserSettings.fromObject(undefined)
    const purpose = YMPurpose.fromObject(purposeObjOriginal)
    purpose.rateId = 'irs_business'
    globalSettings.purposes.push(purpose)
    globalSettings.irsRates[new Date().getFullYear()] = {'business' : 10}

    expect(YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.business, userSettings, globalSettings, null)).toBe(10)

    const drive = YMDrive.fromObject(undefined)
    drive.startTimeTimestampUtc = new Date().getTime() / 1000
    expect(YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.business, userSettings, globalSettings, drive)).toBe(10)

    drive.startTimeTimestampUtc = new Date().getTime()
    expect(YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.business, userSettings, globalSettings, drive)).toBe(0)

    drive.startTimeTimestampUtc = new Date().getTime() / 1000
    purpose.rateId = 'irs_notexist'
    expect(YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.business, userSettings, globalSettings, drive)).toBe(0)

    userSettings = YMUserSettings.fromObject(undefined)
    globalSettings = YMGlobalUserSettings.fromObject(undefined)
    expect(YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.undetermined, userSettings, globalSettings, null)).toBe(0)
})
