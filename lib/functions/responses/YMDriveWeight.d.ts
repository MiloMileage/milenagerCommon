export default class YMDriveWeight {
    drivesPurposeId: string;
    earned: number;
    potential: number;
    loggedMiles: number;
    totalMiles: number;
    parkingMoney: number;
    tollMoney: number;
    driveId: string;
    constructor(drivesPurposeId: string, earned: number, potential: number, loggedMiles: number, totalMiles: number, parkingMoney: number, tollsMoney: number, driveId: string);
    static fromObject: (obj: any) => YMDriveWeight;
}
