export default class YMReceipt {
    imageUrl: string;
    refUrl: string;
    constructor(imageUrl: string, refUrl: string);
    static fromObject: (obj: any) => YMReceipt;
}
