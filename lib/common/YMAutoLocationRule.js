"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMAutoLocationRule {
    constructor(ruleId, originSavedLocationId, destSavedLocationId, purposeId) {
        this.ruleId = ruleId;
        this.originSavedLocationId = originSavedLocationId;
        this.destSavedLocationId = destSavedLocationId;
        this.purposeId = purposeId;
    }
}
exports.default = YMAutoLocationRule;
// tslint:disable-next-line:member-ordering
YMAutoLocationRule.fromObject = function (obj) {
    if (obj == null)
        return new YMAutoLocationRule('', '', '', '');
    // tslint:disable-next-line:max-line-length
    return new YMAutoLocationRule(obj.ruleId, obj.originSavedLocationId, obj.destSavedLocationId, obj.purposeId);
};
//# sourceMappingURL=YMAutoLocationRule.js.map