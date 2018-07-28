export default class YMPurpose {
    purposeId: string;
    rateId: string;
    name: string;
    category: string;
    visible: boolean;
    iconName: string;
    constructor(purposeId?: string, rateId?: string, name?: string, category?: string, iconName?: string, visible?: boolean);
    static fromObject: (obj: any) => YMPurpose;
    static defaultPuposesIds: {
        undetermined: string;
        business: string;
        charity: string;
        moving: string;
        medical: string;
        personal: string;
    };
}
