"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMIncomeSorce {
    constructor(incomeSourceId, name, visible) {
        this.incomeSourceId = incomeSourceId;
        this.name = name;
        this.visible = visible;
    }
}
// tslint:disable-next-line:member-ordering
YMIncomeSorce.fromObject = function (obj) {
    if (obj == null)
        return new YMIncomeSorce('', '', true);
    return new YMIncomeSorce(obj.incomeSourceId, obj.name, obj.visible);
};
exports.default = YMIncomeSorce;
//# sourceMappingURL=YMIncomeSource.js.map