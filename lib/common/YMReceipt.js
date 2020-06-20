"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMReceipt {
    constructor(imageUrl) {
        this.imageUrl = imageUrl;
    }
}
// tslint:disable-next-line:member-ordering
YMReceipt.fromObject = function (obj) {
    if (obj == null)
        return new YMReceipt('');
    return new YMReceipt(obj.imageUrl);
};
exports.default = YMReceipt;
//# sourceMappingURL=YMReceipt.js.map