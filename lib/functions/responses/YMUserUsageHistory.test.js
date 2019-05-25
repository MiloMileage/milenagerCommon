"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMUserUsageHistory_1 = require("./YMUserUsageHistory");
const Moment = require("moment");
test('no subscription and 6 months use', () => {
    const history = new YMUserUsageHistory_1.default(false, Moment().subtract(6, 'month').toDate(), new Date());
    expect(history.monthsToPayFor()).toBe(6);
});
test('no subscription and no use', () => {
    const history = new YMUserUsageHistory_1.default(false, new Date(), new Date());
    expect(history.monthsToPayFor()).toBe(0);
});
test('Subscription ended less than a month', () => {
    const history = new YMUserUsageHistory_1.default(true, new Date(), Moment().subtract(6, 'day').toDate());
    expect(history.monthsToPayFor()).toBe(0);
});
test('Subscription ended 2 months ago', () => {
    const history = new YMUserUsageHistory_1.default(true, new Date(), Moment().subtract(2, 'month').toDate());
    expect(history.monthsToPayFor()).toBe(2);
});
//# sourceMappingURL=YMUserUsageHistory.test.js.map