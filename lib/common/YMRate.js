"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMPurpose_1 = require("./YMPurpose");
const YMVehicle_1 = require("./YMVehicle");
class YMRate {
    constructor(name, deductable, rateId, visible, deductables) {
        this.name = name;
        this.deductable = deductable;
        this.visible = visible;
        this.rateId = rateId;
        this.deductables = deductables ? deductables : [];
        this.deductables.sort((d1, d2) => d1.fromInMiles - d2.fromInMiles);
    }
    getRateFromMileage(mileage, vehicleType = YMVehicle_1.YMVehicleType.car) {
        if (this.deductables === undefined || this.deductables.length === 0) {
            return this.deductable;
        }
        let curr = this.deductable;
        for (let decutible of this.deductables) {
            if (mileage < decutible.fromInMiles) {
                return decutible.deductable;
            }
            curr = decutible.deductable[vehicleType];
        }
        return curr;
    }
}
exports.default = YMRate;
// tslint:disable-next-line:member-ordering
YMRate.fromObject = function (obj) {
    if (obj == null)
        return new YMRate('', 0, '', false, []);
    return new YMRate(obj.name, obj.deductable, obj.rateId, obj.visible, obj.deductables);
};
// tslint:disable-next-line:max-line-length
YMRate.getRateForPurposeId = (purposeId, userSettings, gloablSettings, drive, milesDroveYtd) => {
    if (userSettings == null || gloablSettings == null) {
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
    // find rate for US
    if (purpose.rateId.startsWith('irs_')) {
        const rates = gloablSettings.irsRates[(drive == null ? new Date() : drive.startTime()).getFullYear()];
        return Number(rates === undefined ? 0 : rates[purpose.rateId.substring(4)] == undefined ? 0 : rates[purpose.rateId.substring(4)]);
    }
    // find rate for CA
    if (purpose.rateId.startsWith('ca_')) {
        const caRates = gloablSettings.caRates[(drive == null ? new Date() : drive.startTime()).getFullYear()];
        if (caRates === undefined) {
            return 0;
        }
        const caRate = caRates[purpose.rateId.substring(3)];
        return Number(caRate === undefined ? 0 : caRate.getRateFromMileage(milesDroveYtd, YMVehicle_1.YMVehicleType.car));
    }
    // find rate for AU
    if (purpose.rateId.startsWith('au_')) {
        const auRates = gloablSettings.auRates[(drive == null ? new Date() : drive.startTime()).getFullYear()];
        if (auRates === undefined) {
            return 0;
        }
        const auRate = auRates[purpose.rateId.substring(3)];
        return Number(auRate === undefined ? 0 : auRate.getRateFromMileage(milesDroveYtd, YMVehicle_1.YMVehicleType.car));
    }
    // find rate for UK
    if (purpose.rateId.startsWith('uk_')) {
        const ukRates = gloablSettings.ukRates[(drive == null ? new Date() : drive.startTime()).getFullYear()];
        if (ukRates === undefined) {
            return 0;
        }
        const ukRate = ukRates[purpose.rateId.substring(3)];
        const vehicle = drive.getVehicle(userSettings);
        return Number(ukRate === undefined ? 0 : ukRate.getRateFromMileage(milesDroveYtd, vehicle ? vehicle.vehicleType : YMVehicle_1.YMVehicleType.car));
    }
    const rate = userSettings.personalRates.filter(x => x.rateId === purpose.rateId)[0];
    return rate === undefined ? 0 : rate.deductable;
};
//# sourceMappingURL=YMRate.js.map