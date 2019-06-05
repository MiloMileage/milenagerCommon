import YMOdometerRead from './YMOdometerRead';
export default class YMVehicle {
    vehicleId: string;
    make: string;
    model: string;
    primaryTime: number;
    year: string;
    nickName: string;
    odometerReads: Array<YMOdometerRead>;
    visible: boolean;
    constructor(vehicleId: string, make: string, model: string, primaryTime: number, year: string, nickName: string, odometerReads: Array<YMOdometerRead>, visible: boolean);
    isPrimary(vehicles: Array<YMVehicle>): boolean;
    getOdometerReadIfExist(year: number): number;
    static fromObject(obj: any): YMVehicle;
}
