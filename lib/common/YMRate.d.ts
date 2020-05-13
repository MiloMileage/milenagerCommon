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
            [ind: number]: number;
        };
    }>;
    constructor(name: string, deductable: number, rateId: string, visible: boolean, deductables: Array<{
        fromInMiles: number;
        deductable: {
            [ind: number]: number;
        };
    }>);
    getRateFromMileage(mileage: number, vehicleType?: YMVehicleType): number | {
        [ind: number]: number;
    };
    static fromObject: (obj: any) => YMRate;
    static getRateForPurposeId: (purposeId: string, userSettings: YMUserSettings, gloablSettings: YMGlobalUserSettings, drive?: YMDrive, milesDroveYtd?: number) => number;
}
