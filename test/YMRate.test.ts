import YMRate from '../src/common/YMRate'
import YMPurpose from '../src/common/YMPurpose'
import YMUserSettings, {YMCountry} from '../src/common/YMUserSettings'
import YMGlobalUserSettings from '../src/common/YMGlobalUserSettings'
import YMDrive from '../src/common/YMDrive';
import YMVehicle, {YMVehicleType} from '../src/common/YMVehicle';
import * as moment from 'moment';

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

    // Check that if the rate for the year doesn't exist it will take the last year exist (max 5 yeas back)
    drive.startTimeTimestampUtc = moment().add(28, 'years').toDate().getTime() / 1000 
    expect(YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.business, userSettings, globalSettings, drive)).toBe(10)

    drive.startTimeTimestampUtc = new Date().getTime() / 1000
    purpose.rateId = 'irs_notexist'
    expect(YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.business, userSettings, globalSettings, drive)).toBe(0)

    userSettings = YMUserSettings.fromObject(undefined)
    globalSettings = YMGlobalUserSettings.fromObject(undefined)
    expect(YMRate.getRateForPurposeId(YMPurpose.defaultPuposesIds.undetermined, userSettings, globalSettings, null)).toBe(0)
})

test('getRateForPurposeId US test', () => { 
    const userSettings = YMUserSettings.fromObject(undefined)
    const purposeId = '0'
    const purposeRateType = 'business'
    const purpose = new YMPurpose(purposeId, `irs_${purposeRateType}`, `${purposeRateType} irs`, YMPurpose.categories.business, '', true, 0)
    userSettings.purposes.push(purpose)
    userSettings.country = YMCountry.US

    const drive = YMDrive.fromObject(undefined)
    drive.startTimeTimestampUtc = moment().add(-2, 'year').add(10, 'days').toDate().getTime()


    const deductable = 0.324
    const deductableForCurrentYear = 0.564
    const globalSettings = YMGlobalUserSettings.fromObject(undefined)
    globalSettings.irsRates[drive.getStartTimeLocal().getFullYear()] = {[purposeRateType]: deductable}
    globalSettings.irsRates[new Date().getFullYear()] = {[purposeRateType]: deductableForCurrentYear}

    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, drive)).toBe(deductable)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, drive, 10000)).toBe(deductable)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings)).toBe(deductableForCurrentYear)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, undefined, 10000)).toBe(deductableForCurrentYear)
})

test('getRateForPurposeId UK test', () => { 
    const purposeId = '0'
    const purposeRateType = 'business'
    const purpose = new YMPurpose(purposeId, `doesn't matter`, `${purposeRateType} uk`, YMPurpose.categories.business, '', true, 0)
    
    const vehicleId = '1'
    const car = new YMVehicle(vehicleId, '', '', 0, '', '', [], true, YMVehicleType.car)

    const vehicleId2 = '2'
    const motorcycle = new YMVehicle(vehicleId2, '', '', 0, '', '', [], true, YMVehicleType.motorcycle)

    const vehicleId3 = '3'
    const bicycle = new YMVehicle(vehicleId3, '', '', 0, '', '', [], true, YMVehicleType.bicycle)

    const userSettings = YMUserSettings.fromObject(undefined)
    userSettings.country = YMCountry.UK
    userSettings.purposes.push(purpose)
    userSettings.vehicles.push(car)
    userSettings.vehicles.push(motorcycle)
    userSettings.vehicles.push(bicycle)

    const drive = YMDrive.fromObject(undefined)
    drive.startTimeTimestampUtc = moment().add(-2, 'year').add(10, 'days').toDate().getTime()
    drive.vehicleId = vehicleId

    const driveMotorcycle = YMDrive.fromObject(undefined)
    driveMotorcycle.startTimeTimestampUtc = moment().add(-2, 'year').add(10, 'days').toDate().getTime()
    driveMotorcycle.vehicleId = vehicleId2

    const driveBicycle = YMDrive.fromObject(undefined)
    driveBicycle.startTimeTimestampUtc = moment().add(-2, 'year').add(10, 'days').toDate().getTime()
    driveBicycle.vehicleId = vehicleId3

    const deductable = 0.324
    const deductableOver = 0.1
    const deductableOver2 = 0.01
    const deductableForCurrentYear = 0.564
    const deductableForCurrentYearOver = 0.2
    const deductableForCurrentYearOver2 = 0.02
    const overMileage = 1000
    const overMileage2 = 2000
    const globalSettings = YMGlobalUserSettings.fromObject(undefined)
    globalSettings.ukRates[drive.getStartTimeLocal().getFullYear()] = {[purposeRateType]: new YMRate('', deductable, '', true, [
        {fromInMiles: 0, deductable: {
            [YMVehicleType.car]: deductable,
            [YMVehicleType.motorcycle]: deductable + 1,
            [YMVehicleType.bicycle]: deductable + 2,
        }},
        {fromInMiles: overMileage, deductable: {
            [YMVehicleType.car]: deductableOver,
            [YMVehicleType.motorcycle]: deductableOver + 1,
            [YMVehicleType.bicycle]: deductableOver + 2,
        }},
        {fromInMiles: overMileage2, deductable: {
            [YMVehicleType.car]: deductableOver2,
            [YMVehicleType.motorcycle]: deductableOver2 + 1,
            [YMVehicleType.bicycle]: deductableOver2 + 2,
        }
    }])}

    globalSettings.ukRates[new Date().getFullYear()] = {[purposeRateType]: new YMRate('', deductableForCurrentYear, '', true, [
        {fromInMiles: overMileage, deductable: {
            [YMVehicleType.car]: deductableForCurrentYearOver,
            [YMVehicleType.motorcycle]: deductableForCurrentYearOver + 1,
            [YMVehicleType.bicycle]: deductableForCurrentYearOver + 2,
        }},
        {fromInMiles: overMileage2, deductable: {
            [YMVehicleType.car]: deductableForCurrentYearOver2,
            [YMVehicleType.motorcycle]: deductableForCurrentYearOver2 + 1,
            [YMVehicleType.bicycle]: deductableForCurrentYearOver2 + 2,
        }
    }])}

    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, drive, overMileage - 1)).toBe(deductable)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, drive, overMileage + 1)).toBe(deductableOver)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, drive, overMileage2 + 1)).toBe(deductableOver2)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, undefined, overMileage - 1)).toBe(deductableForCurrentYear)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, undefined, overMileage + 1)).toBe(deductableForCurrentYearOver)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, undefined, overMileage2 + 1)).toBe(deductableForCurrentYearOver2)

    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveMotorcycle, overMileage - 1)).toBe(deductable + 1)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveMotorcycle, overMileage + 1)).toBe(deductableOver + 1)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveMotorcycle, overMileage2 + 1)).toBe(deductableOver2 + 1)

    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveBicycle, overMileage - 1)).toBe(deductable + 2)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveBicycle, overMileage + 1)).toBe(deductableOver + 2)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveBicycle, overMileage2 + 1)).toBe(deductableOver2 + 2)
})

test('getRateForPurposeId AU test', () => { 
    const purposeId = '0'
    const purposeRateType = YMRate.BUSINESS
    const purpose = new YMPurpose(purposeId, `doesnt matter`, `${purposeRateType} au`, YMPurpose.categories.business, '', true, 0)
    
    const vehicleId = '1'
    const car = new YMVehicle(vehicleId, '', '', 0, '', '', [], true, YMVehicleType.car)

    const vehicleId2 = '2'
    const motorcycle = new YMVehicle(vehicleId2, '', '', 0, '', '', [], true, YMVehicleType.motorcycle)

    const vehicleId3 = '3'
    const bicycle = new YMVehicle(vehicleId3, '', '', 0, '', '', [], true, YMVehicleType.bicycle)

    const userSettings = YMUserSettings.fromObject(undefined)
    userSettings.country = YMCountry.AU
    userSettings.purposes.push(purpose)
    userSettings.vehicles.push(car)
    userSettings.vehicles.push(motorcycle)
    userSettings.vehicles.push(bicycle)

    const drive = YMDrive.fromObject(undefined)
    drive.startTimeTimestampUtc = moment().add(-2, 'year').add(10, 'days').toDate().getTime()
    drive.vehicleId = vehicleId

    const driveMotorcycle = YMDrive.fromObject(undefined)
    driveMotorcycle.startTimeTimestampUtc = moment().add(-2, 'year').add(10, 'days').toDate().getTime()
    driveMotorcycle.vehicleId = vehicleId2

    const driveBicycle = YMDrive.fromObject(undefined)
    driveBicycle.startTimeTimestampUtc = moment().add(-2, 'year').add(10, 'days').toDate().getTime()
    driveBicycle.vehicleId = vehicleId3

    const deductable = 0.324
    const deductableOver = 0.1
    const deductableOver2 = 0.01
    const deductableForCurrentYear = 0.564
    const deductableForCurrentYearOver = 0.2
    const deductableForCurrentYearOver2 = 0.02
    const overMileage = 1000
    const overMileage2 = 2000
    const globalSettings = YMGlobalUserSettings.fromObject(undefined)
    globalSettings.auRates[drive.getStartTimeLocal().getFullYear()] = {[purposeRateType]: new YMRate('', deductable, '', true, [
        {fromInMiles: 0, deductable: {
            [YMVehicleType.car]: deductable,
            [YMVehicleType.motorcycle]: deductable + 1,
            [YMVehicleType.bicycle]: deductable + 2,
        }},
        {fromInMiles: overMileage, deductable: {
            [YMVehicleType.car]: deductableOver,
            [YMVehicleType.motorcycle]: deductableOver + 1,
            [YMVehicleType.bicycle]: deductableOver + 2,
        }},
        {fromInMiles: overMileage2, deductable: {
            [YMVehicleType.car]: deductableOver2,
            [YMVehicleType.motorcycle]: deductableOver2 + 1,
            [YMVehicleType.bicycle]: deductableOver2 + 2,
        }
    }])}

    globalSettings.auRates[new Date().getFullYear()] = {[purposeRateType]: new YMRate('', deductableForCurrentYear, '', true, [
        {fromInMiles: overMileage, deductable: {
            [YMVehicleType.car]: deductableForCurrentYearOver,
            [YMVehicleType.motorcycle]: deductableForCurrentYearOver + 1,
            [YMVehicleType.bicycle]: deductableForCurrentYearOver + 2,
        }},
        {fromInMiles: overMileage2, deductable: {
            [YMVehicleType.car]: deductableForCurrentYearOver2,
            [YMVehicleType.motorcycle]: deductableForCurrentYearOver2 + 1,
            [YMVehicleType.bicycle]: deductableForCurrentYearOver2 + 2,
        }
    }])}

    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, drive, overMileage - 1)).toBe(deductable)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, drive, overMileage + 1)).toBe(deductableOver)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, drive, overMileage2 + 1)).toBe(deductableOver2)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, undefined, overMileage - 1)).toBe(deductableForCurrentYear)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, undefined, overMileage + 1)).toBe(deductableForCurrentYearOver)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, undefined, overMileage2 + 1)).toBe(deductableForCurrentYearOver2)

    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveMotorcycle, overMileage - 1)).toBe(deductable)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveMotorcycle, overMileage + 1)).toBe(deductableOver)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveMotorcycle, overMileage2 + 1)).toBe(deductableOver2)

    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveBicycle, overMileage - 1)).toBe(deductable)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveBicycle, overMileage + 1)).toBe(deductableOver)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveBicycle, overMileage2 + 1)).toBe(deductableOver2)
})

test('getRateForPurposeId CA test', () => { 
    const purposeId = '0'
    const purposeRateType = YMRate.BUSINESS
    const purpose = new YMPurpose(purposeId, `doesnt matter`, `${purposeRateType} ca`, YMPurpose.categories.business, '', true, 0)
    
    const vehicleId = '1'
    const car = new YMVehicle(vehicleId, '', '', 0, '', '', [], true, YMVehicleType.car)

    const vehicleId2 = '2'
    const motorcycle = new YMVehicle(vehicleId2, '', '', 0, '', '', [], true, YMVehicleType.motorcycle)

    const vehicleId3 = '3'
    const bicycle = new YMVehicle(vehicleId3, '', '', 0, '', '', [], true, YMVehicleType.bicycle)

    const userSettings = YMUserSettings.fromObject(undefined)
    userSettings.country = YMCountry.CA
    userSettings.purposes.push(purpose)
    userSettings.vehicles.push(car)
    userSettings.vehicles.push(motorcycle)
    userSettings.vehicles.push(bicycle)

    const drive = YMDrive.fromObject(undefined)
    drive.startTimeTimestampUtc = moment().add(-2, 'year').add(10, 'days').toDate().getTime()
    drive.vehicleId = vehicleId

    const driveMotorcycle = YMDrive.fromObject(undefined)
    driveMotorcycle.startTimeTimestampUtc = moment().add(-2, 'year').add(10, 'days').toDate().getTime()
    driveMotorcycle.vehicleId = vehicleId2

    const driveBicycle = YMDrive.fromObject(undefined)
    driveBicycle.startTimeTimestampUtc = moment().add(-2, 'year').add(10, 'days').toDate().getTime()
    driveBicycle.vehicleId = vehicleId3

    const deductable = 0.324
    const deductableOver = 0.1
    const deductableOver2 = 0.01
    const deductableForCurrentYear = 0.564
    const deductableForCurrentYearOver = 0.2
    const deductableForCurrentYearOver2 = 0.02
    const overMileage = 1000
    const overMileage2 = 2000
    const globalSettings = YMGlobalUserSettings.fromObject(undefined)
    globalSettings.caRates[drive.getStartTimeLocal().getFullYear()] = {[purposeRateType]: new YMRate('', deductable, '', true, [
        {fromInMiles: 0, deductable: {
            [YMVehicleType.car]: deductable,
            [YMVehicleType.motorcycle]: deductable + 1,
            [YMVehicleType.bicycle]: deductable + 2,
        }},
        {fromInMiles: overMileage, deductable: {
            [YMVehicleType.car]: deductableOver,
            [YMVehicleType.motorcycle]: deductableOver + 1,
            [YMVehicleType.bicycle]: deductableOver + 2,
        }},
        {fromInMiles: overMileage2, deductable: {
            [YMVehicleType.car]: deductableOver2,
            [YMVehicleType.motorcycle]: deductableOver2 + 1,
            [YMVehicleType.bicycle]: deductableOver2 + 2,
        }
    }])}

    globalSettings.caRates[new Date().getFullYear()] = {[purposeRateType]: new YMRate('', deductableForCurrentYear, '', true, [
        {fromInMiles: overMileage, deductable: {
            [YMVehicleType.car]: deductableForCurrentYearOver,
            [YMVehicleType.motorcycle]: deductableForCurrentYearOver + 1,
            [YMVehicleType.bicycle]: deductableForCurrentYearOver + 2,
        }},
        {fromInMiles: overMileage2, deductable: {
            [YMVehicleType.car]: deductableForCurrentYearOver2,
            [YMVehicleType.motorcycle]: deductableForCurrentYearOver2 + 1,
            [YMVehicleType.bicycle]: deductableForCurrentYearOver2 + 2,
        }
    }])}

    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, drive, overMileage - 1)).toBe(deductable)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, drive, overMileage + 1)).toBe(deductableOver)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, drive, overMileage2 + 1)).toBe(deductableOver2)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, undefined, overMileage - 1)).toBe(deductableForCurrentYear)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, undefined, overMileage + 1)).toBe(deductableForCurrentYearOver)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, undefined, overMileage2 + 1)).toBe(deductableForCurrentYearOver2)

    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveMotorcycle, overMileage - 1)).toBe(deductable)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveMotorcycle, overMileage + 1)).toBe(deductableOver)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveMotorcycle, overMileage2 + 1)).toBe(deductableOver2)

    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveBicycle, overMileage - 1)).toBe(deductable)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveBicycle, overMileage + 1)).toBe(deductableOver)
    expect(YMRate.getRateForPurposeId(purposeId, userSettings, globalSettings, driveBicycle, overMileage2 + 1)).toBe(deductableOver2)
})