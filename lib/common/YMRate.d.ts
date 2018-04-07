export default class YMRate {
    name: string;
    deductable: number;
    visible: boolean;
    rateId: string;
    constructor(name: string, deductable: number, rateId?: string, visible?: boolean);
    static fromObject: (obj: any) => YMRate;
}
