"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
class YMUserUsageHistory {
    constructor(didHaveSubscription, firstDriveDate, subscriptionEndTime) {
        this.didHaveSubscription = didHaveSubscription;
        this.firstDriveDate = firstDriveDate;
        this.subscriptionEndTime = subscriptionEndTime;
    }
    monthsToPayFor() {
        let startDate = Moment();
        if (this.didHaveSubscription) {
            startDate = Moment(this.subscriptionEndTime);
        }
        else {
            startDate = Moment(this.firstDriveDate);
        }
        return Math.floor(Moment().diff(Moment(startDate), 'days') / 30);
    }
}
// tslint:disable-next-line:member-ordering
YMUserUsageHistory.fromObject = function (obj) {
    if (obj == null)
        return new YMUserUsageHistory(false, new Date(), new Date());
    return new YMUserUsageHistory(obj.didHaveSubscription, obj.firstDriveDate, obj.subscriptionEndTime);
};
exports.default = YMUserUsageHistory;
//# sourceMappingURL=YMUserUsageHistory.js.map