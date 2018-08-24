import YMDateRange from './YMDateRange';
import YMReportLine from './YMReportLine';
import YMReportVehicleLine from './YMReportVehicleLine';
import YMDrive from './YMDrive';
import YMUserSettings from './YMUserSettings';
import YMGlobalUserSettings from './YMGlobalUserSettings';
export default class YMReport {
    dateCreated: Date;
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
    reportId: string;
    csvLink: string;
    pdfLink: string;
    constructor(dateCreated: Date, name: string, project: string, customerDetails: string, details: string, businessRateInMiles: number, charityRateInMiles: number, movingRateInMiles: number, medicalRateInMiles: number, isMetricSystem: boolean, dateRange: YMDateRange, lines: Array<YMReportLine>, vehicleBusinessLines: Array<YMReportVehicleLine>, vehiclePersonalLines: Array<YMReportVehicleLine>, reportId: string, csvLink: string, pdfLink: string);
    addDriveValue(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings): void;
    static fromObject: (obj: any) => YMReport;
}
