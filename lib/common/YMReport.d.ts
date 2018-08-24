import YMDateRange from './YMDateRange';
import YMReportLine from './YMReportLine';
import YMReportVehicleLine from './YMReportVehicleLine';
import YMDrive from './YMDrive';
import YMUserSettings from './YMUserSettings';
import YMGlobalUserSettings from './YMGlobalUserSettings';
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
    vehicleBusinessLines: Array<YMReportVehicleLine>;
    vehiclePersonalLines: Array<YMReportVehicleLine>;
    constructor(name: string, project: string, customerDetails: string, details: string, businessRateInMiles: number, charityRateInMiles: number, movingRateInMiles: number, medicalRateInMiles: number, isMetricSystem: boolean, dateRange: YMDateRange, lines: Array<YMReportLine>, vehicleBusinessLines: Array<YMReportVehicleLine>, vehiclePersonalLines: Array<YMReportVehicleLine>);
    addDriveValue(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings): void;
    static fromObject: (obj: any) => YMReport;
}
