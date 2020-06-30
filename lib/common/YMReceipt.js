"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMReceipt {
    constructor(imageUrl, refUrl) {
        this.imageUrl = imageUrl;
        this.refUrl = refUrl;
    }
}
// tslint:disable-next-line:member-ordering
YMReceipt.fromObject = function (obj) {
    if (obj == null)
        return new YMReceipt('', '');
    return new YMReceipt(obj.imageUrl, obj.refUrl);
};
exports.default = YMReceipt;
//# sourceMappingURL=YMReceipt.js.map