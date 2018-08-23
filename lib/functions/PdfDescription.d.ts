import PdfObject from './PdfObject';
import PdfText from './PdfText';
import YMReport from './../common/YMReport';
import YMDateRange from './../common/YMDateRange';
export default class PdfDescription {
    pageOrientation: string;
    pageMargins: Array<number>;
    content: Array<PdfObject>;
    footer: (currentPage: number, pageCount: number) => PdfText;
    header: (currentPage: number, pageCount: number) => PdfText;
    styles: any;
    constructor(pageOrientation: string, pageMargins: Array<number>, content: Array<PdfObject>, footer: (currentPage: number, pageCount: number) => PdfText, header: (currentPage: number, pageCount: number) => PdfText);
    static onFooter: (currentPage: number, pageCount: number) => PdfText;
    static onHeader: (currentPage: number, pageCount: number) => PdfText;
    static fromObject: (obj: any) => PdfDescription;
    static getFooterFunc: (name: string, project: string, customerDetails: string) => (currentPage: number, pageCount: number) => PdfText;
    static getHeaderFunc: (name: string, dateRanage: YMDateRange) => (currentPage: number, pageCount: number) => PdfText;
    static fromReport: (report: YMReport) => void;
}
