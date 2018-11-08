"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMPurpose {
    constructor(purposeId = 'id', rateId = 'rateId', name = 'name', category = 'category', iconName = 'iconName', visible = true, order = 0) {
        this.purposeId = purposeId;
        this.rateId = rateId;
        this.name = name;
        this.category = category;
        this.visible = visible;
        this.iconName = iconName;
        this.order = order;
    }
}
// tslint:disable-next-line:member-ordering
YMPurpose.fromObject = function (obj) {
    if (obj == null)
        return new YMPurpose('', '', '', '', '', false, 0);
    return new YMPurpose(obj.purposeId, obj.rateId, obj.name, obj.category, obj.iconName, obj.visible, obj.order);
};
YMPurpose.categories = {
    personal: 'personal',
    business: 'business'
};
YMPurpose.defaultPuposesIds = {
    undetermined: '-1',
    business: '0',
    charity: '1',
    moving: '2',
    medical: '3',
    personal: '4',
    betweenOffices: '5',
    customerVisit: '6',
    meeting: '7',
    errand: '8',
    entertainment: '9',
    temporarySite: '10',
    businessTravel: '11'
};
exports.default = YMPurpose;
//# sourceMappingURL=YMPurpose.js.map