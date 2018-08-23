import YMDateRange from './YMDateRange';
import YMReportLine from './YMReportLine';
import YMReportVehicleLine from './YMReportVehicleLine';
export default class YMReport {
    name: string;
    project: string;
    customerDetails: string;
    details: string;
    businessRateInMiles: number;
    charityRateInMiles: number;
    movingRateInMiles: number;
    medicalRateInMiles: number;
    isMetricSystem: boolean;
    dateRange: YMDateRange;
    lines: Array<YMReportLine>;
    vehicleLines: Array<YMReportVehicleLine>;
    constructor(name: string, project: string, customerDetails: string, details: string, businessRateInMiles: number, charityRateInMiles: number, movingRateInMiles: number, medicalRateInMiles: number, isMetricSystem: boolean, dateRange: YMDateRange, lines: Array<YMReportLine>, vehicleLines: Array<YMReportVehicleLine>);
    static fromObject: (obj: any) => YMReport;
}
