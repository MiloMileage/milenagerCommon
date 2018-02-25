export default class YMNotificationSetting {
    notificationId: string
    notificationType: string
    title: string
    description: string
    enabled: boolean
    isEnabledByDefault: boolean
    isActive: boolean

    constructor (notificationId = '0', notificationType = 'mail', title = 'title', description = 'description'
            , enabled = true, isEnabledByDefault = true, isActive = true) {
        this.notificationId = notificationId
        this.notificationType = notificationType // Mail \ Phone
        this.title = title
        this.description = description
        this.enabled = enabled
        this.isEnabledByDefault = isEnabledByDefault
        this.isActive = isActive
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMNotificationSetting('', '', '', '', false, false, false)

        return new YMNotificationSetting(obj.notificationId, obj.notificationType, obj.title, obj.description, obj.enabled,
                        obj.isEnabledByDefault, obj.isActive)
    }
}