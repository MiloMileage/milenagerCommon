import YMDateRange from './../../common/YMDateRange';
export default class YMDriveSummaryResponse {
    drivesCount: {
        [purposeId: string]: number;
    };
    earned: number;
    potential: number;
    miles: number;
    dateRange: YMDateRange;
    constructor(drivesCount: {
        [purposeId: string]: number;
    }, earned: number, potential: number, miles: number, dateRange: YMDateRange);
    static fromObject: (obj: any) => YMDriveSummaryResponse;
}
