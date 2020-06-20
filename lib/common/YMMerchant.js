"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMMerchant {
    constructor(name) {
        this.name = name;
    }
}
// tslint:disable-next-line:member-ordering
YMMerchant.fromObject = function (obj) {
    if (obj == null)
        return new YMMerchant('');
    return new YMMerchant(obj.name);
};
exports.default = YMMerchant;
//# sourceMappingURL=YMMerchant.js.map