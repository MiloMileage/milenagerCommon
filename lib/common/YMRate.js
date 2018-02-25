"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMRate {
    constructor(name, deductable, rateId = new Date().getTime().toString(), visible = true) {
        this.name = name;
        this.deductable = deductable;
        this.visible = visible;
        this.rateId = rateId;
    }
}
// tslint:disable-next-line:member-ordering
YMRate.fromObject = function (obj) {
    if (obj == null)
        return new YMRate('', 0, '', false);
    return new YMRate(obj.name, obj.deductable, obj.rateId, obj.visible);
};
exports.default = YMRate;
//# sourceMappingURL=YMRate.js.map