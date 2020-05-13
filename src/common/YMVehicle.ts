import YMOdometerRead from './YMOdometerRead'

export enum YMVehicleType {
    car = 'car',
    motorcycle = 'motorcycle',
    bicycle = 'bicycle'
}

export default class YMVehicle {
    vehicleId: string
    make: string
    model: string
    primaryTime: number // Ticks from 1970 - the time that it was set to primary
    year: string
    nickName: string
    odometerReads: Array<YMOdometerRead>
    visible: boolean
    vehicleType: YMVehicleType

    constructor (vehicleId: string, make: string, model: string, primaryTime: number,
            year: string, nickName: string, odometerReads: Array<YMOdometerRead>, visible: boolean, vehicleType: YMVehicleType) {
        this.vehicleId = vehicleId
        this.make = make
        this.model = model
        this.primaryTime = primaryTime
        this.year = year
        this.nickName = nickName
        this.odometerReads = odometerReads.map(x => YMOdometerRead.fromObject(x))
        this.visible = visible
        this.vehicleType = vehicleType ? vehicleType : YMVehicleType.car
    }

    public isPrimary(vehicles: Array<YMVehicle>) {
        return vehicles.filter(vehicle => vehicle.visible && vehicle.primaryTime > this.primaryTime).length === 0
    }

    public getOdometerReadIfExist(year: number) {
        const read = this.odometerReads.filter(x => x.year === year)[0]

        return read !== undefined ? read.read : 0
    }

    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if(obj == null) return new YMVehicle('', '', '', 0, '', '', [], true, YMVehicleType.car)

        return new YMVehicle(obj.vehicleId, obj.make, obj.model, obj.primaryTime, obj.year, obj.nickName,
                                obj.odometerReads, obj.visible, obj.vehicleType)
    }
}