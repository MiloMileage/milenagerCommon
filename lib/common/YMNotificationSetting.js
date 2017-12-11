"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMNotificationSetting {
    constructor(notificationId = '0', notificationType = 'mail', title = 'title', description = 'description', enabled = true, isEnabledByDefault = true, isActive = true) {
        this.notificationId = notificationId;
        this.notificationType = notificationType; // Mail \ Phone
        this.title = title;
        this.description = description;
        this.enabled = enabled;
        this.isEnabledByDefault = isEnabledByDefault;
        this.isActive = isActive;
    }
}
// tslint:disable-next-line:member-ordering
YMNotificationSetting.fromObject = function (obj) {
    // tslint:disable-next-line:max-line-length
    return new YMNotificationSetting(obj.notificationId, obj.notificationType, obj.title, obj.description, obj.enabled, obj.isEnabledByDefault, obj.isActive);
};
exports.default = YMNotificationSetting;
//# sourceMappingURL=YMNotificationSetting.js.map