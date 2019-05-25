"use strict";
exports.__esModule = true;
var YMDateRange_1 = require("./YMDateRange");
var YMSubscriptionDateRange = /** @class */ (function () {
    function YMSubscriptionDateRange(dateRange, appStoreReceipt) {
        this.dateRange = dateRange;
        this.appStoreReceipt = appStoreReceipt;
    }
    // tslint:disable-next-line:member-ordering
    YMSubscriptionDateRange.fromObject = function (obj) {
        if (obj == null)
            return new YMSubscriptionDateRange(YMDateRange_1["default"].fromObject(undefined), {});
        return new YMSubscriptionDateRange(obj.dateRange, obj.appStoreReceipt);
    };
    return YMSubscriptionDateRange;
}());
exports["default"] = YMSubscriptionDateRange;
