import YMDateRange from './YMDateRange';
import YMReportLine from './YMReportLine';
import YMReportVehicleLine from './YMReportVehicleLine';
import YMDrive from './YMDrive';
import YMUserSettings from './YMUserSettings';
import YMSavedLocation from './YMSavedLocation';
import YMGlobalUserSettings from './YMGlobalUserSettings';
export default class YMReport {
    reportName: string;
    dateCreated: Date;
    name: string;
    project: string;
    customerDetails: string;
    details: string;
    userSettings: YMUserSettings;
    globalSettings: YMGlobalUserSettings;
    isMetricSystem: boolean;
    dateRange: YMDateRange;
    lines: Array<YMReportLine>;
    vehicleBusinessLines: Array<YMReportVehicleLine>;
    vehiclePersonalLines: Array<YMReportVehicleLine>;
    reportId: string;
    csvLink: string;
    pdfLink: string;
    isOutsideOfSubscriptionPeriod: boolean;
    businessRateInMiles: number;
    movingRateInMiles: number;
    charityRateInMiles: number;
    medicalRateInMiles: number;
    constructor(reportName: string, dateCreated: Date, name: string, project: string, customerDetails: string, details: string, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings, isMetricSystem: boolean, dateRange: YMDateRange, lines: Array<YMReportLine>, vehicleBusinessLines: Array<YMReportVehicleLine>, vehiclePersonalLines: Array<YMReportVehicleLine>, reportId: string, csvLink: string, pdfLink: string, isOutsideOfSubscriptionPeriod: boolean, businessRateInMiles: number, movingRateInMiles: number, charityRateInMiles: number, medicalRateInMiles: number);
    addDriveValue(drive: YMDrive, savedLocations: {
        [ind: string]: YMSavedLocation;
    }): void;
    getPersonalMiles(): number;
    getBusinessMiles(): number;
    getPersonalValue(): number;
    getBusinessValue(): number;
    getPersonalTollsValue(): number;
    getBusinessTollsValue(): number;
    getPersonalParkingValue(): number;
    getBusinessParkingValue(): number;
    getPersonalTotalValue(): number;
    getBusinessTotalValue(): number;
    getCsvData(): string;
    static fromObject: (obj: any) => YMReport;
}
