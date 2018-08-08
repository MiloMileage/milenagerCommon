import YMDateRange from './../../common/YMDateRange';
export default class YMDriveSummaryResponse {
    drivesCount: {
        [purposeId: string]: number;
    };
    earned: number;
    potential: number;
    loggedMiles: number;
    totalMiles: number;
    dateRange: YMDateRange;
    parkingMoney: number;
    tollMoney: number;
    constructor(drivesCount: {
        [purposeId: string]: number;
    }, earned: number, potential: number, loggedMiles: number, totalMiles: number, dateRange: YMDateRange, parkingMoney: number, tollsMoney: number);
    static fromObject: (obj: any) => YMDriveSummaryResponse;
}
