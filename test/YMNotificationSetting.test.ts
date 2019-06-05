import YMNotificationSetting from '../src/common/YMNotificationSetting'

test('create from undefined', () => {
    const notificationSettings = YMNotificationSetting.fromObject(undefined)

    expect(notificationSettings.description).toEqual('')
    expect(notificationSettings.notificationId).toEqual('')
    expect(notificationSettings.notificationType).toEqual('')
    expect(notificationSettings.title).toEqual('')
    expect(notificationSettings.enabled).toBeFalsy
    expect(notificationSettings.isActive).toBeFalsy
    expect(notificationSettings.isEnabledByDefault).toBeFalsy
});

const notificationSettingsObj = {
    'notificationId': '1',
    'notificationType': '2',
    'title': '3',
    'description': '4',
    'enabled': true,
    'isEnabledByDefault': true,
    'isActive': true
}

test('create from object', () => {
    const notificationSettings = YMNotificationSetting.fromObject(notificationSettingsObj)

    expect(notificationSettings.description).toEqual('4')
    expect(notificationSettings.notificationId).toEqual('1')
    expect(notificationSettings.notificationType).toEqual('2')
    expect(notificationSettings.title).toEqual('3')
    expect(notificationSettings.enabled).toBeTruthy
    expect(notificationSettings.isActive).toBeTruthy
    expect(notificationSettings.isEnabledByDefault).toBeTruthy
});