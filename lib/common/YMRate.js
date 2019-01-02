"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMPurpose_1 = require("./YMPurpose");
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
// tslint:disable-next-line:max-line-length
YMRate.getRateForPurposeId = (purposeId, userSettings, gloablSettings, drive) => {
    if (userSettings === null) {
        return 0;
    }
    const currPurposeId = purposeId === YMPurpose_1.default.defaultPuposesIds.undetermined ? YMPurpose_1.default.defaultPuposesIds.business : purposeId;
    // find purpose first from user, then global
    let purpose = userSettings.purposes.filter(x => x.purposeId === currPurposeId)[0];
    if (purpose === undefined) {
        purpose = gloablSettings.purposes.filter(x => x.purposeId === currPurposeId)[0];
        if (purpose === undefined) {
            return 0;
        }
    }
    // find rate
    if (purpose.rateId.startsWith('irs_')) {
        const rates = gloablSettings.irsRates[(drive === undefined ? new Date() : drive.startTime()).getFullYear()];
        return Number(rates === undefined ? 0 : rates[purpose.rateId.substring(4)]);
    }
    const rate = userSettings.personalRates.filter(x => x.rateId === purpose.rateId)[0];
    return rate === undefined ? 0 : rate.deductable;
};
exports.default = YMRate;
//# sourceMappingURL=YMRate.js.map