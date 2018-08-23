export default class PdfObject {
    style: string;
    margin: Array<number>;
    constructor(style: string, margin: Array<number>);
    static fromObject: (obj: any) => PdfObject;
}
