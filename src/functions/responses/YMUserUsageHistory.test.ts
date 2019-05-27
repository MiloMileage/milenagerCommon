import YMUserUsageHistory from './YMUserUsageHistory'
import * as Moment from 'moment'

test('no subscription and 6 months use', () => {
    const history = new YMUserUsageHistory(false, Moment().subtract(6, 'month').toDate(), new Date())

    expect(history.monthsToPayFor()).toBe(6)
});

test('no subscription and no use', () => {
    const history = new YMUserUsageHistory(false, new Date(), new Date())

    expect(history.monthsToPayFor()).toBe(0)
});

test('Subscription ended less than a month', () => {
    const history = new YMUserUsageHistory(true, new Date(), Moment().subtract(6, 'day').toDate())

    expect(history.monthsToPayFor()).toBe(0)
});

test('no subscription ended less than a month', () => {
    const history = new YMUserUsageHistory(false, new Date(), Moment().subtract(6, 'day').toDate())

    expect(history.monthsToPayFor()).toBe(0)
});

test('no subscription ended a month and few days ago', () => {
    const history = new YMUserUsageHistory(false, Moment().subtract(1, 'month').subtract(6, 'day').toDate(), new Date())

    expect(history.monthsToPayFor()).toBe(1)
});

test('no subscription ended 2 months ago', () => {
    const history = new YMUserUsageHistory(false, Moment().subtract(2, 'month').toDate(), new Date())

    expect(history.monthsToPayFor()).toBe(2)
});

test('Subscription ended 2 months ago', () => {
    const history = new YMUserUsageHistory(true, new Date(), Moment().subtract(2, 'month').toDate())

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