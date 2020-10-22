"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMCompanySettings_1 = require("./YMCompanySettings");
var YMCompanyInviteStatus;
(function (YMCompanyInviteStatus) {
    YMCompanyInviteStatus["PENDING"] = "PENDING";
    YMCompanyInviteStatus["JOINED"] = "JOINED";
    YMCompanyInviteStatus["LEFT"] = "LEFT";
})(YMCompanyInviteStatus = exports.YMCompanyInviteStatus || (exports.YMCompanyInviteStatus = {}));
class YMCompanyInvite {
    constructor(status, sentTime, corpId, email, role, lastUpdatedTime) {
        this.status = status;
        this.sentTime = sentTime;
        this.corpId = corpId;
        this.email = email;
        this.role = role;
        this.lastUpdatedTime = lastUpdatedTime;
    }
    approve() {
        this.lastUpdatedTime = new Date();
        this.status = YMCompanyInviteStatus.JOINED;
    }
    leave() {
        this.lastUpdatedTime = new Date();
        this.status = YMCompanyInviteStatus.LEFT;
    }
}
YMCompanyInvite.fromObject = function (obj) {
    if (obj == null)
        return new YMCompanyInvite(YMCompanyInviteStatus.PENDING, new Date(), '', '', YMCompanySettings_1.YMCompanyRole.USER, new Date());
    return new YMCompanyInvite(obj.status, obj.sentTime, obj.corpId, obj.email, obj.role, obj.lastUpdatedTime);
};
exports.default = YMCompanyInvite;
//# sourceMappingURL=YMCompanyInvite.js.map