export default class YMReportVehicleLine {
    vehicle: string;
    odometerRead: number;
    businessMiles: number;
    personalMiles: number;
    totalMiles: number;
    businessValue: number;
    parkingValue: number;
    tollsValue: number;
    totalValue: number;
    constructor(vehicle: string, odometerRead: number, businessMiles: number, personalMiles: number, totalMiles: number, businessValue: number, parkingValue: number, tollsValue: number, totalValue: number);
    static fromObject: (obj: any) => YMReportVehicleLine;
}
