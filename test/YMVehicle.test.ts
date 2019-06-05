import YMVehicle from '../src/common/YMVehicle'
import YMOdometerRead from '../src/common/YMOdometerRead';

const vehicleObj = {
    'vehicleId': '1',
    'make': 'bmw',
    'model': 'z3',
    'primaryTime': 1000,
    'year': '2019',
    'nickName': 'bmwer',
    'odometerReads': [],
    'visible': false
}

const odometerReadObj = {
    "year": 2019,
    "read": 100.2,
}

test('Create from object', () => {
    const vehicle = YMVehicle.fromObject(vehicleObj)

    expect(vehicle.make).toEqual('bmw')
    expect(vehicle.model).toEqual('z3')
    expect(vehicle.vehicleId).toEqual('1')
    expect(vehicle.primaryTime).toBe(1000)
    expect(vehicle.year).toEqual('2019')
    expect(vehicle.nickName).toEqual('bmwer')
    expect(vehicle.odometerReads).toEqual([])
    expect(vehicle.visible).toBeFalsy
})

test('Create from undefined', () => {
    const vehicle = YMVehicle.fromObject(undefined)

    expect(vehicle.make).toEqual('')
    expect(vehicle.model).toEqual('')
    expect(vehicle.vehicleId).toEqual('')
    expect(vehicle.primaryTime).toBe(0)
    expect(vehicle.year).toEqual('')
    expect(vehicle.nickName).toEqual('')
    expect(vehicle.odometerReads).toEqual([])
    expect(vehicle.visible).toBeTruthy
})

test('is primary', () => {
    const vehicle1 = YMVehicle.fromObject(vehicleObj)
    vehicle1.visible = true
    const vehicle2 = YMVehicle.fromObject(vehicleObj)
    vehicle2.primaryTime = 999
    vehicle2.visible = true

    expect(vehicle2.isPrimary([vehicle1, vehicle2])).toBeTruthy
    expect(vehicle1.isPrimary([vehicle1, vehicle2])).toBeFalsy
})

test('getOdometerReadIfExist', () => {
    const vehicle1 = YMVehicle.fromObject(vehicleObj)
    vehicle1.odometerReads = [YMOdometerRead.fromObject(odometerReadObj)]

    expect(vehicle1.getOdometerReadIfExist(2019)).toBe(100.2)
    expect(vehicle1.getOdometerReadIfExist(2020)).toBe(0)
})