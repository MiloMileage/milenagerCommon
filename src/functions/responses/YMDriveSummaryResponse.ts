import YMDateRange from './../../common/YMDateRange'

export default class YMDriveSummaryResponse {
    drivesCount: { [purposeId: string]: number }
    earned: number
    potential: number
    miles: number
    dateRange: YMDateRange

    constructor (drivesCount: { [purposeId: string]: number }, earned: number, potential: number, miles: number, dateRange: YMDateRange) {
        this.drivesCount = drivesCount
        this.earned = earned
        this.potential = potential
        this.miles = miles
        this.dateRange = dateRange
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMDriveSummaryResponse({}, 0, 0, 0, YMDateRange.fromObject({}))

        return new YMDriveSummaryResponse(obj.drivesCount, obj.earned, obj.potential, obj.miles, obj.dateRange)
    }
}