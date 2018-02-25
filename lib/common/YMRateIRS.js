"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMRateIRS {
    constructor(business, charity, moving, medical) {
        this.business = business;
        this.charity = charity;
        this.moving = moving;
        this.medical = medical;
    }
}
// tslint:disable-next-line:member-ordering
YMRateIRS.fromObject = function (obj) {
    if (obj == null)
        return new YMRateIRS(0, 0, 0, 0);
    return new YMRateIRS(obj.business, obj.charity, obj.moving, obj.medical);
};
// tslint:disable-next-line:member-ordering
YMRateIRS.createYearRate = function (year, obj) {
    return new YMRateIRS(obj['rateBusiness_' + year], obj['rateCharity_' + year], obj['rateMoving_' + year], obj['rateMedical_' + year]);
};
// tslint:disable-next-line:member-ordering
YMRateIRS.getPurposeArray = function () {
    return ['Business', 'Charity', 'Moving', 'Medical'];
};
exports.default = YMRateIRS;
//# sourceMappingURL=YMRateIRS.js.map