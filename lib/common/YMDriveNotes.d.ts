export default class YMDriveNotes {
    note: string;
    parkingMoney: number;
    tollMoney: number;
    constructor(note?: string, parkingMoney?: number, tollMoney?: number);
    static fromObject: (obj: any) => YMDriveNotes;
}
