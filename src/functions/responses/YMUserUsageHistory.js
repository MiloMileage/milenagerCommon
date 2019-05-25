"use strict";
exports.__esModule = true;
var Moment = require("moment");
var YMUserUsageHistory = /** @class */ (function () {
    function YMUserUsageHistory(didHaveSubscription, firstDriveDate, subscriptionEndTime) {
        this.didHaveSubscription = didHaveSubscription;
        this.firstDriveDate = firstDriveDate;
        this.subscriptionEndTime = subscriptionEndTime;
    }
    YMUserUsageHistory.prototype.monthsToPayFor = function () {
        var startDate = Moment();
        if (this.didHaveSubscription) {
            startDate = Moment(this.subscriptionEndTime);
        }
        else {
            startDate = Moment(this.firstDriveDate);
        }
        return Math.floor(Moment().diff(Moment(startDate), 'days') / 30);
    };
    // tslint:disable-next-line:member-ordering
    YMUserUsageHistory.fromObject = function (obj) {
        if (obj == null)
            return new YMUserUsageHistory(false, new Date(), new Date());
        return new YMUserUsageHistory(obj.didHaveSubscription, obj.firstDriveDate, obj.subscriptionEndTime);
    };
    return YMUserUsageHistory;
}());
exports["default"] = YMUserUsageHistory;
