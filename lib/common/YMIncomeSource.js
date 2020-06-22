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
YMIncomeSorce.mergeIncomeSourcesArrays = (first, second, filterVisible = true) => {
    const incomeSources = new Array();
    if (first) {
        for (const incomeSource of first) {
            if (incomeSources.filter(x => x.incomeSourceId === incomeSource.incomeSourceId).length === 0) {
                incomeSources.push(YMIncomeSorce.fromObject(JSON.parse(JSON.stringify(incomeSource))));
            }
        }
    }
    if (second) {
        for (const incomeSource of second) {
            if (incomeSources.filter(x => x.incomeSourceId === incomeSource.incomeSourceId).length === 0) {
                incomeSources.push(YMIncomeSorce.fromObject(JSON.parse(JSON.stringify(incomeSource))));
            }
        }
    }
    return filterVisible ? incomeSources.filter(x => x.visible) : incomeSources;
};
exports.default = YMIncomeSorce;
//# sourceMappingURL=YMIncomeSource.js.map