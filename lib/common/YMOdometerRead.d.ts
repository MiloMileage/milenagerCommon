export default class YMOdometerRead {
    year: number;
    read: number;
    constructor(year: number, read: number);
    static fromObject: (obj: any) => YMOdometerRead;
}
