"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
class YMUserUsageHistory {
    constructor(didHaveSubscription, firstDriveDate, subscriptionEndTime, numberOfTrialDays) {
        this.didHaveSubscription = didHaveSubscription;
        this.firstDriveDate = firstDriveDate;
        this.subscriptionEndTime = subscriptionEndTime;
        this.numberOfTrialDays = numberOfTrialDays;
    }
    trialDaysRemaining() {
        return Moment(this.firstDriveDate).diff(Moment(), 'days');
    }
    isInTrial() {
        return this.trialDaysRemaining() < this.numberOfTrialDays;
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
        return Math.min(12, Moment().diff(Moment(startDate), 'month'));
    }
}
// tslint:disable-next-line:member-ordering
YMUserUsageHistory.fromObject = function (obj) {
    if (obj == null)
        return new YMUserUsageHistory(false, new Date(), new Date(), 30);
    return new YMUserUsageHistory(obj.didHaveSubscription, obj.firstDriveDate, obj.subscriptionEndTime, obj.numberOfTrialDays);
};
exports.default = YMUserUsageHistory;
//# sourceMappingURL=YMUserUsageHistory.js.map