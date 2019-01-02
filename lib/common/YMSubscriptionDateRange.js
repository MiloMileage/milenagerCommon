"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./YMDateRange");
class YMSubscriptionDateRange {
    constructor(dateRange, appStoreReceipt) {
        this.dateRange = dateRange;
        this.appStoreReceipt = appStoreReceipt;
    }
}
// tslint:disable-next-line:member-ordering
YMSubscriptionDateRange.fromObject = function (obj) {
    if (obj == null)
        return new YMSubscriptionDateRange(YMDateRange_1.default.fromObject(undefined), {});
    return new YMSubscriptionDateRange(obj.dateRange, obj.appStoreReceipt);
};
YMSubscriptionDateRange.subscriptionsTypes = {
    none: 'none',
    annual: 'anual',
    monthly: 'monthly'
};
exports.default = YMSubscriptionDateRange;
//# sourceMappingURL=YMSubscriptionDateRange.js.map