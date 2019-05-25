"use strict";
exports.__esModule = true;
var YMAutoLocationRule = /** @class */ (function () {
    function YMAutoLocationRule(ruleId, originSavedLocationId, destSavedLocationId, purposeId) {
        this.ruleId = ruleId;
        this.originSavedLocationId = originSavedLocationId;
        this.destSavedLocationId = destSavedLocationId;
        this.purposeId = purposeId;
    }
    // tslint:disable-next-line:member-ordering
    YMAutoLocationRule.fromObject = function (obj) {
        if (obj == null)
            return new YMAutoLocationRule('', '', '', '');
        // tslint:disable-next-line:max-line-length
        return new YMAutoLocationRule(obj.ruleId, obj.originSavedLocationId, obj.destSavedLocationId, obj.purposeId);
    };
    return YMAutoLocationRule;
}());
exports["default"] = YMAutoLocationRule;
