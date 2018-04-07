export default class YMPurpose {
    purposeId: string;
    rateId: string;
    name: string;
    category: string;
    visible: boolean;
    constructor(purposeId?: string, rateId?: string, name?: string, category?: string, visible?: boolean);
    static fromObject: (obj: any) => YMPurpose;
}
