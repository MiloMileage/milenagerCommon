"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YMCompanyRole;
(function (YMCompanyRole) {
    YMCompanyRole["ADMIN"] = "ADMIN";
    YMCompanyRole["APPROVER"] = "APPROVER";
    YMCompanyRole["USER"] = "USER";
})(YMCompanyRole = exports.YMCompanyRole || (exports.YMCompanyRole = {}));
class YMCompanySettings {
    constructor(role, corpId, inviteId, dateAdded) {
        this.role = role;
        this.corpId = corpId;
        this.inviteId = inviteId;
        this.dateAdded = dateAdded;
    }
    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if (obj == null)
            return new YMCompanySettings(YMCompanyRole.USER, '', '', new Date());
        return new YMCompanySettings(obj.role, obj.corpId, obj.inviteId, obj.dateAdded);
    }
}
exports.default = YMCompanySettings;
//# sourceMappingURL=YMCompanySettings.js.map