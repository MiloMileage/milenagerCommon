import YMOdometerRead from './YMOdometerRead'

export default class YMVehicle {
    vehicleId: string
    make: string
    model: string
    primaryTime: number // Ticks from 1970 - the time that it was set to primary
    year: string
    nickName: string
    odometerReads: Array<YMOdometerRead>
    visible: boolean

    constructor (vehicleId = '', make = '', model = '', primaryTime = 0,
    year = '', nickName = '', odometerReads = [new YMOdometerRead()], visible = true) {
        this.vehicleId = vehicleId
        this.make = make
        this.model = model
        this.primaryTime = primaryTime
        this.year = year
        this.nickName = nickName
        this.odometerReads = odometerReads.map(x => YMOdometerRead.fromObject(x))
        this.visible = visible
    }

    public isPrimary(vehicles: Array<YMVehicle>) {
        return vehicles.filter(vehicle => vehicle.primaryTime > this.primaryTime).length === 0
    }

    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if(obj == null) return new YMVehicle('', '', '', 0, '', '', [], true)

        return new YMVehicle(obj.vehicleId, obj.make, obj.model, obj.primaryTime, obj.year, obj.nickName,
                                obj.odometerReads, obj.visible)
    }

    // tslint:disable-next-line:member-ordering
    static getOldestOdometerRead = function(vehicle) {
        return Number(vehicle.odometerReads.sort((x, y) => x.year - y.year)[0].year)
    }
}