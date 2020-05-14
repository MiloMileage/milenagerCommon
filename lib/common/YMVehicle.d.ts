import YMOdometerRead from './YMOdometerRead';
export declare enum YMVehicleType {
    car = "car",
    motorcycle = "motorcycle",
    bicycle = "bicycle"
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
