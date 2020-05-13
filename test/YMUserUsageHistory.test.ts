import YMUserUsageHistory from '../src/functions/responses/YMUserUsageHistory'
import * as Moment from 'moment'

test('first drive 6 months use', () => {
    const history = new YMUserUsageHistory(false, Moment().subtract(6, 'month').toDate(), new Date(), 30)

    expect(history.monthsToPayFor()).toBe(6)
});

test('first drive 15 months use', () => {
    const history = new YMUserUsageHistory(false, Moment().subtract(15, 'month').toDate(), new Date(), 30)

    expect(history.monthsToPayFor()).toBe(12)
});

test('no subscription and no use', () => {
    const history = new YMUserUsageHistory(false, new Date(), new Date(), 30)

    expect(history.monthsToPayFor()).toBe(0)
});

test('Subscription ended less than a month', () => {
    const history = new YMUserUsageHistory(true, new Date(), Moment().subtract(6, 'day').toDate(), 30)

    expect(history.monthsToPayFor()).toBe(0)
});

test('first drive a month', () => {
    const history = new YMUserUsageHistory(false, new Date(), Moment().subtract(6, 'day').toDate(), 30)

    expect(history.monthsToPayFor()).toBe(0)
});

test('first drive few days ago', () => {
    const history = new YMUserUsageHistory(false, Moment().subtract(1, 'month').subtract(6, 'day').toDate(), new Date(), 30)

    expect(history.monthsToPayFor()).toBe(1)
});

test('first drive 2 months ago', () => {
    const history = new YMUserUsageHistory(false, Moment().subtract(2, 'month').toDate(), new Date(), 30)

    expect(history.monthsToPayFor()).toBe(2)
});

test('Subscription ended 2 months ago', () => {
    const history = new YMUserUsageHistory(true, new Date(), Moment().subtract(2, 'month').toDate(), 30)

    expect(history.monthsToPayFor()).toBe(0)
});

test('create default with null', () => {
    const history = YMUserUsageHistory.fromObject(null)

    expect(history.monthsToPayFor()).toBe(0)
});

test('create default with undefined', () => {
    const history = YMUserUsageHistory.fromObject(undefined)

    expect(history.monthsToPayFor()).toBe(0)
});

test('create default with object', () => {
    const obj = {
        didHaveSubscription: false,
        firstDriveDate: Moment().subtract(10, 'month'),
        subscriptionEndTime: Moment().subtract(5, 'month'),
    }
    const history = YMUserUsageHistory.fromObject(obj)

    expect(history.monthsToPayFor()).toBe(10)
});