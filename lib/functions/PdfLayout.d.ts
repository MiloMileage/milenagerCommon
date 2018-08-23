export default class PdfLayout {
    fillColor: (i: number, node: any) => string;
    hLineWidth: (i: number, node: any) => number;
    constructor(fillColor: (i: number, node: any) => string, hLineWidth: (i: number, node: any) => number);
    static getTableHeaderFillColorFunc: () => (i: number, node: any) => string;
    static getTableHeaderHLineWidthFunc: () => (i: number, node: any) => 1 | 3;
    static fromObject: (obj: any) => PdfLayout;
}
