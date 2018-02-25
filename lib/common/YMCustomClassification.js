"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMCustomClassification {
    constructor(purposeId = 'id', startTimestampUtc = 0, endTimestampUtc = 0) {
        this.purposeId = purposeId;
        this.startTimestampUtc = startTimestampUtc;
        this.endTimestampUtc = endTimestampUtc;
    }
}
// tslint:disable-next-line:member-ordering
YMCustomClassification.fromObject = function (obj) {
    if (obj == null)
        return new YMCustomClassification('', 0, 0);
    return new YMCustomClassification(obj.purposeId, obj.startTimestampUtc, obj.endTimestampUtc);
};
exports.default = YMCustomClassification;
//# sourceMappingURL=YMCustomClassification.js.map