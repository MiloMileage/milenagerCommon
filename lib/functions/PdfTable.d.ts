import PdfObject from './PdfObject';
import PdfTableSub from './PdfTableSub';
import PdfLayout from './PdfLayout';
export default class PdfTable extends PdfObject {
    table: PdfTableSub;
    layout: PdfLayout;
    constructor(style: string, margin: Array<number>, table: PdfTableSub, layout: PdfLayout);
    static fromObject: (obj: any) => PdfTable;
}
