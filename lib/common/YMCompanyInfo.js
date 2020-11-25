"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMCompanyInfo {
    constructor(name, creatorEmail, supportEmail, createdDate, updatedDate) {
        this.name = name;
        this.supportEmail = supportEmail;
        this.creatorEmail = creatorEmail;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
}
YMCompanyInfo.fromObject = function (obj) {
    if (obj == null)
        return new YMCompanyInfo('', '', '', new Date(), new Date());
    return new YMCompanyInfo(obj.name, obj.creatorEmail, obj.supportEmail, obj.createdDate, obj.updatedDate);
};
exports.default = YMCompanyInfo;
//# sourceMappingURL=YMCompanyInfo.js.map