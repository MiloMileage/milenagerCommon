export default class YMReceipt {
    imageUrl: string;
    constructor(imageUrl: string);
    static fromObject: (obj: any) => YMReceipt;
}
