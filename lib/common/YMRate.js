"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMPurpose_1 = require("./YMPurpose");
const YMUserSettings_1 = require("./YMUserSettings");
const YMVehicle_1 = require("./YMVehicle");
const moment = require("moment");
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
        if (this.deductables === undefined || this.deductables.length === 0 || mileage === undefined) {
            return this.deductable;
        }
        let curr = this.deductable;
        for (const decutible of this.deductables) {
            if (mileage < decutible.fromInMiles) {
                return curr;
            }
            if (vehicleType in decutible.deductable) {
                curr = decutible.deductable[vehicleType];
            }
            else if (YMVehicle_1.YMVehicleType.car in decutible.deductable) {
                curr = decutible.deductable[YMVehicle_1.YMVehicleType.car];
            }
            else {
                curr = this.deductable;
            }
        }
        return curr;
    }
}
// tslint:disable-next-line:member-ordering
YMRate.fromObject = function (obj) {
    if (obj == null)
        return new YMRate('', 0, '', false, undefined);
    return new YMRate(obj.name, obj.deductable, obj.rateId, obj.visible, obj.deductables);
};
YMRate.IRS = 'irs_';
YMRate.CA = 'ca__';
YMRate.AU = 'au__';
YMRate.UK = 'uk__';
YMRate.BUSINESS = 'business';
YMRate.CHARITY = 'charity';
YMRate.moving = 'moving';
YMRate.medical = 'medical';
YMRate.GetRates = (drive, rates, year) => {
    const currYear = year ? year : new Date();
    let driveYear = drive ? drive.getStartTimeLocal() : currYear;
    let currRates = rates[(drive == null ? currYear : driveYear).getFullYear()];
    while (currRates === undefined && moment(currYear).isAfter(moment().add(-5, 'years'))) {
        currRates = rates[currYear.getFullYear()];
        driveYear = moment(driveYear).add(-1, 'year').toDate();
    }
    return currRates;
};
YMRate.translateRate = (rateId, userSettings, gloablSettings, drive, milesDroveYtd, year) => {
    // find rate for US
    if (rateId.startsWith(YMRate.IRS)) {
        const currYear = year ? year : new Date();
        let driveYear = drive ? drive.getStartTimeLocal() : currYear;
        let rates = gloablSettings.irsRates[(drive == null ? currYear : driveYear).getFullYear()];
        while (rates === undefined && moment(currYear).isAfter(moment().add(-5, 'years'))) {
            rates = gloablSettings.irsRates[currYear.getFullYear()];
            driveYear = moment(driveYear).add(-1, 'year').toDate();
        }
        return Number(rates === undefined ? 0 : rates[rateId.substring(4)] == undefined ? 0 : rates[rateId.substring(4)]);
    }
    // find rate for CA
    if (rateId.startsWith(YMRate.CA)) {
        const caRates = YMRate.GetRates(drive, gloablSettings.caRates, year);
        if (caRates === undefined) {
            return 0;
        }
        const caRate = caRates[rateId.substring(4)];
        return Number(caRate === undefined ? 0 : caRate.getRateFromMileage(milesDroveYtd, YMVehicle_1.YMVehicleType.car));
    }
    // find rate for AU
    if (rateId.startsWith(YMRate.AU)) {
        const auRates = YMRate.GetRates(drive, gloablSettings.auRates, year);
        if (auRates === undefined) {
            return 0;
        }
        const auRate = auRates[rateId.substring(4)];
        return Number(auRate === undefined ? 0 : auRate.getRateFromMileage(milesDroveYtd, YMVehicle_1.YMVehicleType.car));
    }
    // find rate for UK
    if (rateId.startsWith(YMRate.UK)) {
        const ukRates = YMRate.GetRates(drive, gloablSettings.ukRates, year);
        if (ukRates === undefined) {
            return 0;
        }
        const ukRate = ukRates[rateId.substring(4)];
        const vehicle = drive ? drive.getVehicle(userSettings) : undefined;
        return Number(ukRate === undefined ? 0 : ukRate.getRateFromMileage(milesDroveYtd, vehicle ? vehicle.vehicleType : YMVehicle_1.YMVehicleType.car));
    }
    // Handle custom case
    const rate = userSettings.personalRates.filter(x => x.rateId === rateId)[0];
    return rate === undefined ? 0 : rate.deductable;
};
// tslint:disable-next-line:max-line-length
YMRate.getRateForPurposeId = (purposeId, userSettings, gloablSettings, drive, milesDroveYtd, currYear) => {
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
    const currRatePrefix = userSettings.country === YMUserSettings_1.YMCountry.US ? YMRate.IRS :
        userSettings.country === YMUserSettings_1.YMCountry.CA ? YMRate.CA :
            userSettings.country === YMUserSettings_1.YMCountry.AU ? YMRate.AU :
                userSettings.country === YMUserSettings_1.YMCountry.UK ? YMRate.UK : undefined;
    if (currRatePrefix) {
        if (purpose.purposeId === YMPurpose_1.default.defaultPuposesIds.business || purpose.category === YMPurpose_1.default.categories.business) {
            return YMRate.translateRate(`${currRatePrefix}${YMRate.BUSINESS}`, userSettings, gloablSettings, drive, milesDroveYtd, currYear);
        }
        else if (purpose.purposeId === YMPurpose_1.default.defaultPuposesIds.charity) {
            return YMRate.translateRate(`${currRatePrefix}${YMRate.CHARITY}`, userSettings, gloablSettings, drive, milesDroveYtd, currYear);
        }
        else if (purpose.purposeId === YMPurpose_1.default.defaultPuposesIds.moving) {
            return YMRate.translateRate(`${currRatePrefix}${YMRate.moving}`, userSettings, gloablSettings, drive, milesDroveYtd, currYear);
        }
        else if (purpose.purposeId === YMPurpose_1.default.defaultPuposesIds.medical) {
            return YMRate.translateRate(`${currRatePrefix}${YMRate.medical}`, userSettings, gloablSettings, drive, milesDroveYtd, currYear);
        }
        else {
            return 0;
        }
    }
    return YMRate.translateRate(purpose.rateId, userSettings, gloablSettings, drive, milesDroveYtd, currYear);
};
exports.default = YMRate;
//# sourceMappingURL=YMRate.js.map