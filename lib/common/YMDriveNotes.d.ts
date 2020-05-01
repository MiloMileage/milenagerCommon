export default class YMDriveNotes {
    note: string;
    parkingMoney: number;
    tollMoney: number;
    gasMoney: number;
    otherMoney: number;
    constructor(note: string, parkingMoney: number, tollMoney: number, gasMoney: number, otherMoney: number);
    getTotalMoney(): number;
    static fromObject: (obj: any) => YMDriveNotes;
}
