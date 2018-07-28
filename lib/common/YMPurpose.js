"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMPurpose {
    constructor(purposeId = 'id', rateId = 'rateId', name = 'name', category = 'category', iconName = 'iconName', visible = true) {
        this.purposeId = purposeId;
        this.rateId = rateId;
        this.name = name;
        this.category = category;
        this.visible = visible;
        this.iconName = iconName;
    }
}
// tslint:disable-next-line:member-ordering
YMPurpose.fromObject = function (obj) {
    if (obj == null)
        return new YMPurpose('', '', '', '', '', false);
    return new YMPurpose(obj.purposeId, obj.rateId, obj.name, obj.category, obj.iconName, obj.visible);
};
YMPurpose.defaultPuposesIds = {
    undetermined: '-1',
    business: '0',
    charity: '1',
    moving: '2',
    medical: '3',
    personal: '4'
};
exports.default = YMPurpose;
//# sourceMappingURL=YMPurpose.js.map