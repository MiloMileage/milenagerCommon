import YMDateRange from '../src/common/YMDateRange'
import * as Moment from 'moment'

test('Create from object', () => {
    const dateRangeObj = {
        'startDateYear': 2019,
        'startDateMonth': 5,
        'startDateDay': 13,
        'endDateYear': 2019,
        'endDateMonth': 6,
        'endDateDay': 14,
        'timezoneOffsetInMinutes' : 180,
    }

    const dateRange = YMDateRange.fromObject(dateRangeObj) 

    expect(dateRange.startDateYear).toBe(2019)
    expect(dateRange.startDateMonth).toBe(5)
    expect(dateRange.startDateDay).toBe(13)
    expect(dateRange.endDateYear).toBe(2019)
    expect(dateRange.endDateMonth).toBe(6)
    expect(dateRange.endDateDay).toBe(14)
    expect(dateRange.timezoneOffsetInMinutes).toBe(180)
});

test('getStartDateLocal not daylight savings', () => {
    const dateRangeObj = {
        'startDateYear': 2019,
        'startDateMonth': 1,
        'startDateDay': 13,
        'endDateYear': 2019,
        'endDateMonth': 2,
        'endDateDay': 5,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRange = YMDateRange.fromObject(dateRangeObj) 

    expect(Moment(dateRange.getStartDateLocal()).isDST()).toBeFalsy()
    expect(Moment(dateRange.getStartDateLocal()).format()).toBe(Moment("2019-02-13T00:00:00.000Z").format())
    expect(Moment(dateRange.getEndDateLocal()).isDST()).toBeFalsy()
    expect(Moment(dateRange.getEndDateLocal()).format()).toBe(Moment("2019-03-05T00:00:00.000Z").format())
});

test('getStartDateLocal daylight savings', () => {
    const dateRangeObj = {
        'startDateYear': 2019,
        'startDateMonth': 8,
        'startDateDay': 13,
        'endDateYear': 2019,
        'endDateMonth': 9,
        'endDateDay': 5,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRange = YMDateRange.fromObject(dateRangeObj) 

    expect(Moment(dateRange.getStartDateLocal()).isDST()).toBeTruthy()
    expect(Moment(dateRange.getStartDateLocal()).format()).toBe(Moment("2019-09-13T01:00:00.000Z").format())
    expect(Moment(dateRange.getEndDateLocal()).isDST()).toBeTruthy()
    expect(Moment(dateRange.getEndDateLocal()).format()).toBe(Moment("2019-10-05T01:00:00.000Z").format())
});

test('isEqual test', () => {
    const dateRangeObj = {
        'startDateYear': 2019,
        'startDateMonth': 8,
        'startDateDay': 13,
        'endDateYear': 2019,
        'endDateMonth': 9,
        'endDateDay': 5,
        'timezoneOffsetInMinutes' : 60,
    }

    const dateRange = YMDateRange.fromObject(dateRangeObj) 
    const dateRange2 = YMDateRange.fromObject(dateRangeObj) 

    expect(dateRange.isEqualTo(dateRange2)).toBeTruthy()
});

test('isEqual test false', () => {
    const dateRangeObj = {
        'startDateYear': 2019,
        'startDateMonth': 8,
        'startDateDay': 13,
        'endDateYear': 2019,
        'endDateMonth': 9,
        'endDateDay': 5,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRangeObj2 = {
        'startDateYear': 2019,
        'startDateMonth': 8,
        'startDateDay': 14,
        'endDateYear': 2019,
        'endDateMonth': 9,
        'endDateDay': 5,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRange = YMDateRange.fromObject(dateRangeObj) 
    const dateRange2 = YMDateRange.fromObject(dateRangeObj2)

    expect(dateRange.isEqualTo(dateRange2)).toBeFalsy()
});

test('addMonth test', () => {
    const dateRangeObj = {
        'startDateYear': 2019,
        'startDateMonth': 8,
        'startDateDay': 1,
        'endDateYear': 2019,
        'endDateMonth': 9,
        'endDateDay': 1,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRangeObj2 = {
        'startDateYear': 2019,
        'startDateMonth': 9,
        'startDateDay': 1,
        'endDateYear': 2019,
        'endDateMonth': 10,
        'endDateDay': 1,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRange = YMDateRange.fromObject(dateRangeObj)
    dateRange.addMonth(1)
    const dateRange2 = YMDateRange.fromObject(dateRangeObj2)

    expect(dateRange.isEqualTo(dateRange2)).toBeTruthy()
});

test('addMonth skip year test', () => {
    const dateRangeObj = {
        'startDateYear': 2018,
        'startDateMonth': 8,
        'startDateDay': 1,
        'endDateYear': 2018,
        'endDateMonth': 9,
        'endDateDay': 1,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRangeObj2 = {
        'startDateYear': 2019,
        'startDateMonth': 9,
        'startDateDay': 1,
        'endDateYear': 2019,
        'endDateMonth': 10,
        'endDateDay': 1,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRange = YMDateRange.fromObject(dateRangeObj)
    dateRange.addMonth(13)
    const dateRange2 = YMDateRange.fromObject(dateRangeObj2)

    expect(dateRange.isEqualTo(dateRange2)).toBeTruthy()
});

test('addMonth end of year year test', () => {
    const dateRangeObj = {
        'startDateYear': 2019,
        'startDateMonth': 10,
        'startDateDay': 2,
        'endDateYear': 2019,
        'endDateMonth': 11,
        'endDateDay': 5,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRangeObj2 = {
        'startDateYear': 2020,
        'startDateMonth': 0,
        'startDateDay': 2,
        'endDateYear': 2020,
        'endDateMonth': 1,
        'endDateDay': 5,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRange = YMDateRange.fromObject(dateRangeObj)
    dateRange.addMonth(2)
    console.log(`dateRange: ${JSON.stringify(dateRange)}`)
    const dateRange2 = YMDateRange.fromObject(dateRangeObj2)

    expect(dateRange.isEqualTo(dateRange2)).toBeTruthy()
});

test('addMonth default test', () => {
    const dateRangeObj = {
        'startDateYear': 2019,
        'startDateMonth': 8,
        'startDateDay': 13,
        'endDateYear': 2019,
        'endDateMonth': 9,
        'endDateDay': 5,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRangeObj2 = {
        'startDateYear': 2019,
        'startDateMonth': 9,
        'startDateDay': 13,
        'endDateYear': 2019,
        'endDateMonth': 10,
        'endDateDay': 5,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRange = YMDateRange.fromObject(dateRangeObj)
    dateRange.addMonth() 
    const dateRange2 = YMDateRange.fromObject(dateRangeObj2)

    expect(dateRange.isEqualTo(dateRange2)).toBeTruthy()
});

test('isMonthRange test', () => {
    const dateRangeObj = {
        'startDateYear': 2019,
        'startDateMonth': 1,
        'startDateDay': 1,
        'endDateYear': 2019,
        'endDateMonth': 2,
        'endDateDay': 1,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRange = YMDateRange.fromObject(dateRangeObj)
    expect(dateRange.isMonthRange()).toBeTruthy()
});

test('isMonthRange change year test', () => {
    const dateRangeObj = {
        'startDateYear': 2019,
        'startDateMonth': 11,
        'startDateDay': 1,
        'endDateYear': 2020,
        'endDateMonth': 0,
        'endDateDay': 1,
        'timezoneOffsetInMinutes' : 0,
    }

    const dateRange = YMDateRange.fromObject(dateRangeObj)
    expect(dateRange.isMonthRange()).toBeTruthy()
});

test('isMonthRange fom monthDateRange test', () => {
    const dateRange = YMDateRange.monthDateRange(11,2019,180)

    expect(dateRange.isMonthRange()).toBeTruthy()
    expect(dateRange.startDateYear).toBe(2019)
    expect(dateRange.startDateMonth).toBe(11)
    expect(dateRange.startDateDay).toBe(1)
    expect(dateRange.endDateYear).toBe(2020)
    expect(dateRange.endDateMonth).toBe(0)
    expect(dateRange.endDateDay).toBe(1)
    expect(dateRange.timezoneOffsetInMinutes).toBe(180)
});

test('isMonthRange fom monthDateRange test', () => {
    const dateRange = YMDateRange.monthDateRange(0,2019,180)

    expect(dateRange.isMonthRange()).toBeTruthy()
    expect(dateRange.startDateYear).toBe(2019)
    expect(dateRange.startDateMonth).toBe(0)
    expect(dateRange.startDateDay).toBe(1)
    expect(dateRange.endDateYear).toBe(2019)
    expect(dateRange.endDateMonth).toBe(1)
    expect(dateRange.endDateDay).toBe(1)
    expect(dateRange.timezoneOffsetInMinutes).toBe(180)
});

test('create default', () => {
    const dateRange = YMDateRange.fromObject(undefined)

    expect(dateRange.isMonthRange()).toBeTruthy()
    expect(dateRange.startDateYear).toBe(Moment().year())
    expect(dateRange.startDateMonth).toBe(Moment().month())
    expect(dateRange.startDateDay).toBe(1)
    expect(dateRange.endDateYear).toBe(Moment().add(1, 'month').year())
    expect(dateRange.endDateMonth).toBe(Moment().add(1, 'month').month())
    expect(dateRange.endDateDay).toBe(1)
    expect(dateRange.timezoneOffsetInMinutes).toBe(0)
});