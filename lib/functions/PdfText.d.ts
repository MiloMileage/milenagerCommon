import PdfObject from './PdfObject';
export default class PdfText extends PdfObject {
    text: string;
    italics: boolean;
    bold: boolean;
    color: string;
    fontSize: number;
    alignment: string;
    constructor(text: string, margin: Array<number>, style: string, italics: boolean, bold: boolean, color: string, fontSize: number, alignment?: string);
    static fromObject: (obj: any) => PdfText;
}
