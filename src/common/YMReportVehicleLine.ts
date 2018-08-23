export default class YMReportVehicleLine {
    vehicle: string
    odometerRead: number
    businessMiles: number
    personalMiles: number
    totalMiles: number
    businessValue: number
    parkingValue: number
    tollsValue: number
    totalValue: number
    
    constructor (vehicle: string,
                odometerRead: number,
                businessMiles: number,
                personalMiles: number,
                totalMiles: number,
                businessValue: number,
                parkingValue: number,
                tollsValue: number,
                totalValue: number) {
        this.vehicle = vehicle
        this.odometerRead = odometerRead
        this.businessMiles = businessMiles
        this.personalMiles = personalMiles
        this.totalMiles = totalMiles
        this.businessValue = businessValue
        this.parkingValue = parkingValue
        this.tollsValue = tollsValue
        this.totalValue = totalValue
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMReportVehicleLine('', 0, 0, 0, 0, 0, 0, 0, 0)
        
        return new YMReportVehicleLine(obj.vehicle, obj.odometerRead, obj.businessMiles, obj.personalMiles, obj.totalMiles, obj.businessValue, obj.parkingValue, obj.tollsValue, obj.totalValue)
    }
}
