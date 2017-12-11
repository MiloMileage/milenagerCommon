"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMSubscription {
    constructor(subscriptionId = 'id', subscriptionType = 'annual', startDate = new Date(), endDate = new Date()) {
        this.subscriptionId = subscriptionId; // personal subscription id
        this.subscriptionType = subscriptionType; // annual \ monthly
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
// tslint:disable-next-line:member-ordering
YMSubscription.fromObject = function (obj) {
    // tslint:disable-next-line:max-line-length
    return new YMSubscription(obj.subscriptionId, obj.subscriptionType, obj.startDate, obj.endDate);
};
exports.default = YMSubscription;
//# sourceMappingURL=YMSubscription.js.map