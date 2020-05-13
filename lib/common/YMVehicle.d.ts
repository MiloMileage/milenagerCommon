import YMOdometerRead from './YMOdometerRead';
export declare enum YMVehicleType {
    car = 0,
    motorcycle = 1,
    bicycle = 2
}
export default class YMVehicle {
    vehicleId: string;
    make: string;
    model: string;
    primaryTime: number;
    year: string;
    nickName: string;
    odometerReads: Array<YMOdometerRead>;
    visible: boolean;
    vehicleType: YMVehicleType;
    constructor(vehicleId: string, make: string, model: string, primaryTime: number, year: string, nickName: string, odometerReads: Array<YMOdometerRead>, visible: boolean, vehicleType: YMVehicleType);
    isPrimary(vehicles: Array<YMVehicle>): boolean;
    getOdometerReadIfExist(year: number): number;
    static fromObject(obj: any): YMVehicle;
}
