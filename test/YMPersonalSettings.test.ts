import YMPersonalSettings from '../src/common/YMPersonalSettings'
import * as Moment from 'moment'

const personalSettingsObj = {
    'isMetricSystem': false,
    'monitoringLevel': '1',
    'monitorFromTimestamp': 1000
}

test('create from undefined', () => {
    const personalSettings = YMPersonalSettings.fromObject(undefined)

    expect(personalSettings.isMetricSystem).toBeFalsy
    expect(personalSettings.monitoringLevel).toEqual('1')
    expect(personalSettings.monitorFromTimestamp / 100).toBeCloseTo(Moment.utc().add(-1, 'day').toDate().getTime() / 100, 0)
});

test('create from object', () => {
    const personalSettings = YMPersonalSettings.fromObject(personalSettingsObj)

    expect(personalSettings.isMetricSystem).toBeFalsy
    expect(personalSettings.monitoringLevel).toEqual('1')
    expect(personalSettings.monitorFromTimestamp).toBe(1000)
});

test('isDriveDetectionEnabled()', () => {
    const personalSettings = YMPersonalSettings.fromObject(personalSettingsObj)

    expect(personalSettings.isDriveDetectionEnabled()).toBeTruthy

    personalSettings.monitorFromTimestamp = Moment.utc().add(10, 'day').toDate().getTime()

    expect(personalSettings.isDriveDetectionEnabled()).toBeFalsy
});

test('flipMetric()', () => {
    const personalSettings = YMPersonalSettings.fromObject(personalSettingsObj)

    expect(personalSettings.isMetricSystem).toBeFalsy

    const personalSettings2 = YMPersonalSettings.flipMetric(personalSettings)

    expect(personalSettings2.isMetricSystem).toBeTruthy
});