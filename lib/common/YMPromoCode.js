"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YMPromoCodeType;
(function (YMPromoCodeType) {
    YMPromoCodeType["NONE"] = "NONE";
    YMPromoCodeType["DOUBLE"] = "DOUBLE";
    YMPromoCodeType["FREE_YEAR"] = "FREE_YEAR";
})(YMPromoCodeType = exports.YMPromoCodeType || (exports.YMPromoCodeType = {}));
var YMPromoCodeUsageType;
(function (YMPromoCodeUsageType) {
    YMPromoCodeUsageType["ANNUAL"] = "ANNUAL";
    YMPromoCodeUsageType["MONTHLY"] = "MONTHLY";
})(YMPromoCodeUsageType = exports.YMPromoCodeUsageType || (exports.YMPromoCodeUsageType = {}));
class YMPromoCode {
    constructor(name, quantity, clicks, usages, expiresAt, type) {
        this.name = name;
        this.quantity = quantity;
        this.clicks = clicks;
        this.usages = usages;
        this.expiresAt = expiresAt;
        this.type = type;
    }
}
exports.default = YMPromoCode;
YMPromoCode.fromObject = function (obj) {
    if (obj == null)
        return new YMPromoCode('', 0, [], [], new Date(), YMPromoCodeType.DOUBLE);
    return new YMPromoCode(obj.name, obj.quantity, obj.clicks, obj.usages, obj.expiresAt, obj.type);
};
//# sourceMappingURL=YMPromoCode.js.map