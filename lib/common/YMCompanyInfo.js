"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMCompanyInfo {
    constructor(name, creatorEmail, supportEmail) {
        this.name = name;
        this.supportEmail = supportEmail;
        this.creatorEmail = creatorEmail;
    }
}
YMCompanyInfo.fromObject = function (obj) {
    if (obj == null)
        return new YMCompanyInfo('', '', '');
    return new YMCompanyInfo(obj.name, obj.creatorEmail, obj.supportEmail);
};
exports.default = YMCompanyInfo;
//# sourceMappingURL=YMCompanyInfo.js.map