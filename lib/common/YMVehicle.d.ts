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
    constructor(vehicleId?: string, make?: string, model?: string, primaryTime?: number, year?: string, nickName?: string, odometerReads?: YMOdometerRead[], visible?: boolean);
    isPrimary(vehicles: Array<YMVehicle>): boolean;
    static fromObject(obj: any): YMVehicle;
    static getOldestOdometerRead: (vehicle: any) => number;
}
