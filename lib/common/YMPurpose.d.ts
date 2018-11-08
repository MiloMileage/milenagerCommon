export default class YMPurpose {
    purposeId: string;
    rateId: string;
    name: string;
    category: string;
    visible: boolean;
    iconName: string;
    order: number;
    constructor(purposeId?: string, rateId?: string, name?: string, category?: string, iconName?: string, visible?: boolean, order?: number);
    static fromObject: (obj: any) => YMPurpose;
    static categories: {
        personal: string;
        business: string;
    };
    static defaultPuposesIds: {
        undetermined: string;
        business: string;
        charity: string;
        moving: string;
        medical: string;
        personal: string;
        betweenOffices: string;
        customerVisit: string;
        meeting: string;
        errand: string;
        entertainment: string;
        temporarySite: string;
        businessTravel: string;
    };
}
