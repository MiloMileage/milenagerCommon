"use strict";
exports.__esModule = true;
var YMUserUsageHistory_1 = require("./YMUserUsageHistory");
var Moment = require("moment");
test('no subscription and 6 months use', function () {
    var history = new YMUserUsageHistory_1["default"](false, Moment().subtract(6, 'month').toDate(), new Date());
    expect(history.monthsToPayFor()).toBe(6);
});
test('no subscription and no use', function () {
    var history = new YMUserUsageHistory_1["default"](false, new Date(), new Date());
    expect(history.monthsToPayFor()).toBe(0);
});
test('Subscription ended less than a month', function () {
    var history = new YMUserUsageHistory_1["default"](true, new Date(), Moment().subtract(6, 'day').toDate());
    expect(history.monthsToPayFor()).toBe(0);
});
test('Subscription ended 2 months ago', function () {
    var history = new YMUserUsageHistory_1["default"](true, new Date(), Moment().subtract(2, 'month').toDate());
    expect(history.monthsToPayFor()).toBe(2);
});
