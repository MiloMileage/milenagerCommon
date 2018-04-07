export default class YMRateIRS {
    business: number;
    charity: number;
    moving: number;
    medical: number;
    constructor(business: number, charity: number, moving: number, medical: number);
    static fromObject: (obj: any) => YMRateIRS;
    static createYearRate: (year: string, obj: any) => YMRateIRS;
    static getPurposeArray: () => string[];
}
