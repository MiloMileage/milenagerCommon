import YMDateRange from './YMDateRange'

export default class YMReportLine {
    when: YMDateRange
    purpose: string
    fromTo: string
    vehicle: string
    distanceInMiles: number
    value: number
    parking: number
    tolls: number
    
    constructor (when: YMDateRange,
            purpose: string,
            fromTo: string,
            vehicle: string,
            distanceInMiles: number,
            value: number,
            parking: number,
            tolls: number) {
        this.when = when
        this.purpose = purpose
        this.fromTo = fromTo
        this.vehicle = vehicle
        this.distanceInMiles = distanceInMiles
        this.value = value
        this.parking = parking
        this.tolls = tolls
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMReportLine(new YMDateRange(undefined, undefined), '', '', '', 0, 0, 0, 0)
        
        return new YMReportLine(obj.when, obj.purpose, obj.fromTo, obj.vehicle, obj.distanceInMiles, obj.value, obj.parking, obj.tolls)
    }
}
