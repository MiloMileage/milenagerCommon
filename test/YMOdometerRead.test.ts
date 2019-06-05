import YMOdometerRead from '../src/common/YMOdometerRead'

const odometerReadObj = {
    "year": 2019,
    "read": 100.2,
}

test('Create from undefined', () => {
    const odometerRead = YMOdometerRead.fromObject(undefined)

    expect(odometerRead.year).toBe(0)
    expect(odometerRead.read).toBe(0)
})

test('Create from obj', () => {
    const odometerRead = YMOdometerRead.fromObject(odometerReadObj)

    expect(odometerRead.year).toBe(2019)
    expect(odometerRead.read).toBe(100.2)
})