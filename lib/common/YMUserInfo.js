"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YMOsType;
(function (YMOsType) {
    YMOsType[YMOsType["ios"] = 0] = "ios";
    YMOsType[YMOsType["android"] = 1] = "android";
    YMOsType[YMOsType["unknown"] = 2] = "unknown";
})(YMOsType = exports.YMOsType || (exports.YMOsType = {}));
class YMUserInfo {
    constructor(displayName, creationDate, lastSignInDate, os, email, secondaryEmails, applePrivateEmail) {
        this.displayName = displayName;
        this.creationDate = creationDate;
        this.lastSignInDate = lastSignInDate;
        this.os = os;
        this.email = email;
        this.secondaryEmails = secondaryEmails == null ? [] : secondaryEmails;
        this.applePrivateEmail = applePrivateEmail;
    }
}
YMUserInfo.fromObject = function (obj) {
    if (obj == null)
        return new YMUserInfo('', new Date(), new Date(), YMOsType.unknown, '', [], undefined);
    return new YMUserInfo(obj.displayName, obj.creationDate, obj.lastSignInDate, obj.os, obj.email, obj.secondaryEmails, obj.applePrivateEmail);
};
exports.default = YMUserInfo;
//# sourceMappingURL=YMUserInfo.js.map