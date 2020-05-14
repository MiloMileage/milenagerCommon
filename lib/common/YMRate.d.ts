import YMUserSettings from './YMUserSettings';
import YMGlobalUserSettings from './YMGlobalUserSettings';
import YMDrive from './YMDrive';
import { YMVehicleType } from './YMVehicle';
export default class YMRate {
    name: string;
    deductable: number;
    visible: boolean;
    rateId: string;
    deductables: Array<{
        fromInMiles: number;
        deductable: {
            [vehicleType: string]: number;
        };
    }>;
    constructor(name: string, deductable: number, rateId: string, visible: boolean, deductables: Array<{
        fromInMiles: number;
        deductable: {
            [ind: string]: number;
        };
    }>);
    getRateFromMileage(mileage: number, vehicleType?: YMVehicleType): number;
    static fromObject: (obj: any) => YMRate;
    static IRS: string;
    static CA: string;
    static AU: string;
    static UK: string;
    static BUSINESS: string;
    static CHARITY: string;
    static moving: string;
    static medical: string;
    static GetRates: (drive: YMDrive, rates: {
        [ind: string]: {
            [ind: string]: YMRate;
        };
    }) => {
        [ind: string]: YMRate;
    };
    static translateRate: (rateId: string, userSettings: YMUserSettings, gloablSettings: YMGlobalUserSettings, drive?: YMDrive, milesDroveYtd?: number) => number;
    static getRateForPurposeId: (purposeId: string, userSettings: YMUserSettings, gloablSettings: YMGlobalUserSettings, drive?: YMDrive, milesDroveYtd?: number) => number;
}
