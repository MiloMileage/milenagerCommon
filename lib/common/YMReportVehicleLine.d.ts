export default class YMReportVehicleLine {
    vehicle: string;
    odometerRead: number;
    miles: number;
    mileageValue: number;
    parkingValue: number;
    tollsValue: number;
    totalValue: number;
    constructor(vehicle: string, odometerRead: number, miles: number, mileageValue: number, parkingValue: number, tollsValue: number);
    static fromObject: (obj: any) => YMReportVehicleLine;
}
