import PdfObject from './PdfObject';
import PdfText from './PdfText';
import PdfImage from './PdfImage';
export default class PdfTableSub {
    headerRows: number;
    widths: Array<any>;
    body: Array<Array<PdfObject | PdfImage>>;
    constructor(widths: Array<any>, body: Array<Array<PdfObject>>);
    static getHeaderTableCell: (txt: string) => PdfText;
    static getTableCell: (txt: string) => PdfText;
    static getTotalCell: (txt: string) => PdfText;
    static fromObject: (obj: any) => PdfTableSub;
}
