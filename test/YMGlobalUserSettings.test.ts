import YMGlobalUserSettings from '../src/common/YMGlobalUserSettings'
import {YMVehicleType} from '../src/common/YMVehicle'
import YMRate from '../src/common/YMRate'

const globalSettingsJson = "{\"auRates\":{\"2020\":{\"business\":{\"deductable\":0.4225334609218686,\"deductables\":[{\"deductable\":{\"car\":0},\"fromInMiles\":3106.863683249034}],\"name\":\"au__business\",\"rateId\":\"au__business\",\"visible\":true}}},\"caRates\":{\"2020\":{\"business\":{\"deductable\":0.366609914623386,\"deductables\":[{\"deductable\":{\"car\":0.3293275504243976},\"fromInMiles\":3106.863683249034}],\"name\":\"ca__business\",\"rateId\":\"ca__business\",\"visible\":true}}},\"irsRates\":{\"2018\":{\"business\":0.545,\"charity\":0.14,\"medical\":0.18,\"moving\":0.18},\"2019\":{\"business\":0.58,\"charity\":0.14,\"medical\":0.2,\"moving\":0.2},\"2020\":{\"business\":0.575,\"charity\":0.14,\"medical\":0.17,\"moving\":0.17}},\"notificationSettings\":[{\"description\":\"New drive detected\",\"enabled\":true,\"isActive\":true,\"isEnabledByDefault\":true,\"notificationId\":\"0\",\"notificationType\":\"phone\",\"title\":\"Every Drive\"},{\"description\":\"Weekly drive summary\",\"enabled\":true,\"isActive\":true,\"isEnabledByDefault\":true,\"notificationId\":\"2\",\"notificationType\":\"mail\",\"title\":\"Weekly Email\"},{\"description\":\"Monthly drive summary\",\"enabled\":true,\"isActive\":true,\"isEnabledByDefault\":true,\"notificationId\":\"3\",\"notificationType\":\"mail\",\"title\":\"Monthly Email\"}],\"purposes\":[{\"category\":\"business\",\"iconName\":\"briefcase\",\"name\":\"Business\",\"order\":0,\"purposeId\":\"0\",\"rateId\":\"irs_business\",\"visible\":true},{\"category\":\"personal\",\"iconName\":\"handshake\",\"name\":\"Charity\",\"order\":9,\"purposeId\":\"1\",\"rateId\":\"irs_charity\",\"visible\":true},{\"category\":\"personal\",\"iconName\":\"truck\",\"name\":\"Moving\",\"order\":10,\"purposeId\":\"2\",\"rateId\":\"irs_moving\",\"visible\":true},{\"category\":\"personal\",\"iconName\":\"ambulance\",\"name\":\"Medical\",\"order\":11,\"purposeId\":\"3\",\"rateId\":\"irs_medical\",\"visible\":true},{\"category\":\"personal\",\"iconName\":\"home\",\"name\":\"Personal\",\"order\":1,\"purposeId\":\"4\",\"rateId\":\"-1\",\"visible\":true},{\"category\":\"business\",\"iconName\":\"route\",\"name\":\"Between Offices\",\"order\":2,\"purposeId\":\"5\",\"rateId\":\"irs_business\",\"visible\":true},{\"category\":\"business\",\"iconName\":\"user\",\"name\":\"Customer Visit\",\"order\":3,\"purposeId\":\"6\",\"rateId\":\"irs_business\",\"visible\":false},{\"category\":\"business\",\"iconName\":\"chalkboard-teacher\",\"name\":\"Meeting\",\"order\":4,\"purposeId\":\"7\",\"rateId\":\"irs_business\",\"visible\":true},{\"category\":\"business\",\"iconName\":\"shopping-bag\",\"name\":\"Errand\",\"order\":5,\"purposeId\":\"8\",\"rateId\":\"irs_business\",\"visible\":true},{\"category\":\"business\",\"iconName\":\"utensils\",\"name\":\"Meal\",\"order\":6,\"purposeId\":\"9\",\"rateId\":\"irs_business\",\"visible\":true},{\"category\":\"business\",\"iconName\":\"building\",\"name\":\"Temporary Site\",\"order\":7,\"purposeId\":\"10\",\"rateId\":\"irs_business\",\"visible\":true},{\"category\":\"business\",\"iconName\":\"plane\",\"name\":\"Business Travel\",\"order\":8,\"purposeId\":\"11\",\"rateId\":\"irs_business\",\"visible\":true}],\"tutorialContainers\":{\"First Steps\":[{\"name\":\"Welcome\",\"tutorialId\":\"onboarding\"},{\"name\":\"Classify Drives\",\"tutorialId\":\"classifyDrive\"}]},\"ukRates\":{\"2020\":{\"business\":{\"deductable\":0.45,\"deductables\":[{\"deductable\":{\"bicycle\":0.24,\"car\":0.45,\"motorcycle\":0.45},\"fromInMiles\":0},{\"deductable\":{\"bicycle\":0.24,\"car\":0.25,\"motorcycle\":0.45},\"fromInMiles\":10000}],\"name\":\"uk__business\",\"rateId\":\"uk__business\",\"visible\":true}}},\"workingHours\":[{\"dayOfWeek\":1,\"endTimeInMinutes\":1080,\"startTimeInMinutes\":540,\"workHourId\":\"1\"},{\"dayOfWeek\":2,\"endTimeInMinutes\":1080,\"startTimeInMinutes\":540,\"workHourId\":\"2\"},{\"dayOfWeek\":3,\"endTimeInMinutes\":1080,\"startTimeInMinutes\":540,\"workHourId\":\"3\"},{\"dayOfWeek\":4,\"endTimeInMinutes\":1080,\"startTimeInMinutes\":540,\"workHourId\":\"4\"},{\"dayOfWeek\":5,\"endTimeInMinutes\":1080,\"startTimeInMinutes\":540,\"workHourId\":\"5\"}]}"

test('Create from json UkRates', () => {
    const globalSettings = YMGlobalUserSettings.fromObject(JSON.parse(globalSettingsJson))

    expect(YMRate.GetRates(undefined, globalSettings.ukRates)[YMRate.BUSINESS].getRateFromMileage(10000 - 10, YMVehicleType.car)).toBe(0.45)
    expect(YMRate.GetRates(undefined, globalSettings.ukRates)[YMRate.BUSINESS].getRateFromMileage(10000 + 10, YMVehicleType.car)).toBe(0.25)
    expect(YMRate.GetRates(undefined, globalSettings.ukRates)[YMRate.BUSINESS].getRateFromMileage(10000 + 10, YMVehicleType.motorcycle)).toBe(0.45)
    expect(YMRate.GetRates(undefined, globalSettings.ukRates)[YMRate.BUSINESS].getRateFromMileage(10000 + 10, YMVehicleType.bicycle)).toBe(0.24)
    expect(YMRate.GetRates(undefined, globalSettings.ukRates)[YMRate.BUSINESS].getRateFromMileage(10000 - 10, YMVehicleType.bicycle)).toBe(0.24)
})

test('Create from json CaRates', () => {
    const globalSettings = YMGlobalUserSettings.fromObject(JSON.parse(globalSettingsJson))

    expect(YMRate.GetRates(undefined, globalSettings.caRates)[YMRate.BUSINESS].getRateFromMileage(0, YMVehicleType.car)).toBeCloseTo(0.3666, 2)
    expect(YMRate.GetRates(undefined, globalSettings.caRates)[YMRate.BUSINESS].getRateFromMileage(10000, YMVehicleType.car)).toBeCloseTo(0.3293, 2)
})

test('Create from json AuRates', () => {
    const globalSettings = YMGlobalUserSettings.fromObject(JSON.parse(globalSettingsJson))

    expect(YMRate.GetRates(undefined, globalSettings.auRates)[YMRate.BUSINESS].getRateFromMileage(0, YMVehicleType.car)).toBeCloseTo(0.4225, 2)
    expect(YMRate.GetRates(undefined, globalSettings.auRates)[YMRate.BUSINESS].getRateFromMileage(10000, YMVehicleType.car)).toBeCloseTo(0, 2)
})