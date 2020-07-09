export default class PdfImage {
    image: any;
    fit: Array<Number>;
    constructor(image: any, width: number, height: number);
    static fromObject: (obj: any) => PdfImage;
}
