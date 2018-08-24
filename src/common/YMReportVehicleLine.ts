export default class YMReportVehicleLine {
    vehicle: string
    odometerRead: number
    miles: number
    mileageValue: number
    parkingValue: number
    tollsValue: number
    totalValue: number
    
    constructor (vehicle: string,
                    odometerRead: number,
                    miles: number,
                    mileageValue: number,
                    parkingValue: number,
                    tollsValue: number) {
        this.vehicle = vehicle
        this.odometerRead = odometerRead
        this.miles = miles
        this.mileageValue = mileageValue
        this.parkingValue = parkingValue
        this.tollsValue = tollsValue
        this.totalValue = mileageValue + parkingValue + tollsValue
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMReportVehicleLine('', 0, 0, 0, 0, 0)
        
        return new YMReportVehicleLine(obj.vehicle, obj.odometerRead, obj.miles, obj. mileageValue, obj. parkingValue, obj.tollsValue)
    }
}
