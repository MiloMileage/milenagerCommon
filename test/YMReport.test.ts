import YMAddress from '../src/common/YMAddress'
import YMDrive from '../src/common/YMDrive'
import YMReport from '../src/common/YMReport'
import YMDateRange from '../src/common/YMDateRange'
import * as objectHelper from './ObjectHelper'
import YMRate from '../src/common/YMRate'


test('Create Report with 1 drive', () => {
    const userSettings = objectHelper.getUserSettings()
    const globalSettings = objectHelper.getGlobalUserSettings()

    const report = new YMReport(
        'ReportName',
        new Date(),
        'myName',
        'myProject',
        'customDetails',
        'details',
        userSettings,
        globalSettings,
        false,
        new YMDateRange(2019, 0, 1, 2020, 1, 0, 0),
        [],
        [],
        [],
        'reportId',
        'csvLink',
        'pdfLink',
        false,
        0.5,
        0.1,
        0.2,
        0.3
    )

    expect(report.getBusinessMiles()).toBe(0)
    expect(report.getPersonalMiles()).toBe(0)

    report.addDriveValue(objectHelper.getDrive(20, '0'), objectHelper.getSavedLocations())
    expect(report.getBusinessMiles()).toBe(20)
    expect(report.getPersonalMiles()).toBe(0)

    report.addDriveValue(objectHelper.getDrive(10, '1'), objectHelper.getSavedLocations())
    expect(report.getBusinessMiles()).toBe(20)
    expect(report.getPersonalMiles()).toBe(10)

    report.addDriveValue(objectHelper.getDrive(10, '0'), objectHelper.getSavedLocations())
    expect(report.getBusinessMiles()).toBe(30)
    expect(report.getPersonalMiles()).toBe(10)

    expect(report.getBusinessValue()).toBe(report.getBusinessMiles() * YMRate.getRateForPurposeId('0', userSettings, globalSettings, objectHelper.getDrive(20, '0')))
    expect(report.getBusinessTotalValue()).toBe(report.getBusinessMiles() * YMRate.getRateForPurposeId('0', userSettings, globalSettings, objectHelper.getDrive(20, '0')))
});