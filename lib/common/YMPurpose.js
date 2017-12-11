"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMPurpose {
    constructor(purposeId = 'id', rateId = 'rateId', name = 'name', visible = true) {
        this.purposeId = purposeId;
        this.rateId = rateId;
        this.name = name;
        this.visible = visible;
    }
}
// tslint:disable-next-line:member-ordering
YMPurpose.fromObject = function (obj) {
    // tslint:disable-next-line:max-line-length
    return new YMPurpose(obj.purposeId, obj.rateId, obj.name, obj.visible);
};
exports.default = YMPurpose;
//# sourceMappingURL=YMPurpose.js.map