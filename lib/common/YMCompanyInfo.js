"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMCompanyInfo {
    constructor(name) {
        this.name = name;
    }
}
YMCompanyInfo.fromObject = function (obj) {
    if (obj == null)
        return new YMCompanyInfo('');
    return new YMCompanyInfo(obj.name);
};
exports.default = YMCompanyInfo;
//# sourceMappingURL=YMCompanyInfo.js.map