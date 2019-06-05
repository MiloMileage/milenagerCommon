import YMWorkingHour from '../src/common/YMWorkingHour'

const workingHourObj = {
    'dayOfWeek': 1,
    'startTimeInMinutes': 2,
    'endTimeInMinutes': 3,
    'workHourId': '4'
}

test('Create from object', () => {
    const wh = YMWorkingHour.fromObject(workingHourObj)

    expect(wh.workHourId).toEqual('4')
    expect(wh.dayOfWeek).toBe(1)
    expect(wh.startTimeInMinutes).toBe(2)
    expect(wh.endTimeInMinutes).toBe(3)
})

test('Create from undefined', () => {
    const wh = YMWorkingHour.fromObject(undefined)

    expect(wh.workHourId).toEqual('')
    expect(wh.dayOfWeek).toBe(0)
    expect(wh.startTimeInMinutes).toBe(0)
    expect(wh.endTimeInMinutes).toBe(0)
})