"use strict";
exports.__esModule = true;
var YMPurpose_1 = require("./YMPurpose");
var YMRate = /** @class */ (function () {
    function YMRate(name, deductable, rateId, visible) {
        if (rateId === void 0) { rateId = new Date().getTime().toString(); }
        if (visible === void 0) { visible = true; }
        this.name = name;
        this.deductable = deductable;
        this.visible = visible;
        this.rateId = rateId;
    }
    // tslint:disable-next-line:member-ordering
    YMRate.fromObject = function (obj) {
        if (obj == null)
            return new YMRate('', 0, '', false);
        return new YMRate(obj.name, obj.deductable, obj.rateId, obj.visible);
    };
    // tslint:disable-next-line:max-line-length
    YMRate.getRateForPurposeId = function (purposeId, userSettings, gloablSettings, drive) {
        if (userSettings == null || gloablSettings == null) {
            return 0;
        }
        var currPurposeId = purposeId === YMPurpose_1["default"].defaultPuposesIds.undetermined ? YMPurpose_1["default"].defaultPuposesIds.business : purposeId;
        // find purpose first from user, then global
        var purpose = userSettings.purposes.filter(function (x) { return x.purposeId === currPurposeId; })[0];
        if (purpose === undefined) {
            purpose = gloablSettings.purposes.filter(function (x) { return x.purposeId === currPurposeId; })[0];
            if (purpose === undefined) {
                return 0;
            }
        }
        // find rate
        if (purpose.rateId.startsWith('irs_')) {
            var rates = gloablSettings.irsRates[(drive == null ? new Date() : drive.startTime()).getFullYear()];
            return Number(rates === undefined ? 0 : rates[purpose.rateId.substring(4)]);
        }
        var rate = userSettings.personalRates.filter(function (x) { return x.rateId === purpose.rateId; })[0];
        return rate === undefined ? 0 : rate.deductable;
    };
    return YMRate;
}());
exports["default"] = YMRate;
