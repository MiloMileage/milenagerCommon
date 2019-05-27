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
            // Currently, there is a loophole which allows a subscriber that returns to not pay a panelty
            return 0;
        }
        else {
            startDate = Moment(this.firstDriveDate);
        }
        return Moment().diff(Moment(startDate), 'month');
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