import PdfObject from './PdfObject';
import PdfText from './PdfText';
import YMReport from './../common/YMReport';
import YMDateRange from './../common/YMDateRange';
import YMTransactionsReport from '../common/YMTransactionsReport';
import PdfImage from './PdfImage';
export default class PdfDescription {
    pageOrientation: string;
    pageMargins: Array<number>;
    content: Array<PdfObject | PdfImage>;
    footer: (currentPage: number, pageCount: number) => PdfText;
    header: (currentPage: number, pageCount: number) => PdfText;
    styles: any;
    constructor(pageOrientation: string, pageMargins: Array<number>, content: Array<PdfObject>, footer: (currentPage: number, pageCount: number) => PdfText, header: (currentPage: number, pageCount: number) => PdfText);
    static onFooter: (currentPage: number, pageCount: number) => PdfText;
    static onHeader: (currentPage: number, pageCount: number) => PdfText;
    static fromObject: (obj: any) => PdfDescription;
    static getFooterFunc: (name: string, project: string, customerDetails: string) => (currentPage: number, pageCount: number) => PdfText;
    static getHeaderFunc: (name: string, dateRanage: YMDateRange, title: string) => (currentPage: number, pageCount: number) => PdfText;
    static fromReport: (report: YMReport) => PdfDescription;
    static fromTransactionReport: (report: YMTransactionsReport, getBase64ImageFromURL: (url: string) => Promise<any>) => Promise<PdfDescription>;
}
