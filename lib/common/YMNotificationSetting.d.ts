export default class YMNotificationSetting {
    notificationId: string;
    notificationType: string;
    title: string;
    description: string;
    enabled: boolean;
    isEnabledByDefault: boolean;
    isActive: boolean;
    constructor(notificationId?: string, notificationType?: string, title?: string, description?: string, enabled?: boolean, isEnabledByDefault?: boolean, isActive?: boolean);
    static fromObject: (obj: any) => YMNotificationSetting;
}
