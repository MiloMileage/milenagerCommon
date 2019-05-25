"use strict";
exports.__esModule = true;
var YMNotificationSetting = /** @class */ (function () {
    function YMNotificationSetting(notificationId, notificationType, title, description, enabled, isEnabledByDefault, isActive) {
        if (notificationId === void 0) { notificationId = '0'; }
        if (notificationType === void 0) { notificationType = 'mail'; }
        if (title === void 0) { title = 'title'; }
        if (description === void 0) { description = 'description'; }
        if (enabled === void 0) { enabled = true; }
        if (isEnabledByDefault === void 0) { isEnabledByDefault = true; }
        if (isActive === void 0) { isActive = true; }
        this.notificationId = notificationId;
        this.notificationType = notificationType; // Mail \ Phone
        this.title = title;
        this.description = description;
        this.enabled = enabled;
        this.isEnabledByDefault = isEnabledByDefault;
        this.isActive = isActive;
    }
    // tslint:disable-next-line:member-ordering
    YMNotificationSetting.fromObject = function (obj) {
        if (obj == null)
            return new YMNotificationSetting('', '', '', '', false, false, false);
        return new YMNotificationSetting(obj.notificationId, obj.notificationType, obj.title, obj.description, obj.enabled, obj.isEnabledByDefault, obj.isActive);
    };
    return YMNotificationSetting;
}());
exports["default"] = YMNotificationSetting;
