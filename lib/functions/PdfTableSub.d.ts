import PdfObject from './PdfObject';
import PdfText from './PdfText';
export default class PdfTableSub {
    widths: Array<any>;
    body: Array<Array<PdfObject>>;
    constructor(widths: Array<any>, body: Array<Array<PdfObject>>);
    static getHeaderTableCell: (txt: string) => PdfText;
    static getTableCell: (txt: string) => PdfText;
    static getTotalCell: (txt: string) => PdfText;
    static fromObject: (obj: any) => PdfTableSub;
}
