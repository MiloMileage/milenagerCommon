import YMDateRange from './YMDateRange';
export default class YMReportLine {
    when: YMDateRange;
    purpose: string;
    fromTo: string;
    vehicle: string;
    distanceInMiles: number;
    value: number;
    parking: number;
    tolls: number;
    constructor(when: YMDateRange, purpose: string, fromTo: string, vehicle: string, distanceInMiles: number, value: number, parking: number, tolls: number);
    static fromObject: (obj: any) => YMReportLine;
}
