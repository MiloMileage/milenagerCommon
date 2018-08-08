import YMDateRange from './../../common/YMDateRange'

export default class YMDriveSummaryResponse {
    drivesCount: { [purposeId: string]: number }
    earned: number
    potential: number
    loggedMiles: number
    totalMiles: number
    dateRange: YMDateRange
    parkingMoney: number
    tollMoney: number

    constructor (
        drivesCount: { [purposeId: string]: number },
        earned: number,
        potential: number,
        loggedMiles: number,
        totalMiles: number,
        dateRange: YMDateRange,
        parkingMoney: number,
        tollsMoney: number) {
        this.drivesCount = drivesCount
        this.earned = earned
        this.potential = potential
        this.loggedMiles = loggedMiles
        this.totalMiles = totalMiles
        this.dateRange = dateRange
        this.parkingMoney = parkingMoney
        this.tollMoney = tollsMoney
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMDriveSummaryResponse({}, 0, 0, 0, 0, YMDateRange.fromObject({}), 0, 0)

        return new YMDriveSummaryResponse(obj.drivesCount, obj.earned, obj.potential, obj.loggedMiles, obj.totalMiles, obj.dateRange, obj.parkingMoney, obj.tollMoney)
    }
}