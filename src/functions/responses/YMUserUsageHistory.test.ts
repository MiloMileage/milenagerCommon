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

test('Subscription ended 2 months ago', () => {
    const history = new YMUserUsageHistory(true, new Date(), Moment().subtract(2, 'month').toDate())

    expect(history.monthsToPayFor()).toBe(2)
});