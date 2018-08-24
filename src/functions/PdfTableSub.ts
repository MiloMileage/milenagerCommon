import PdfObject from './PdfObject'
import PdfText from './PdfText'

export default class PdfTableSub {
    headerRows: number
    widths: Array<any>
    body: Array<Array<PdfObject>>
    
    constructor (widths: Array<any>, body: Array<Array<PdfObject>>) {
        this.widths = widths
        this.body = body
        this.headerRows = 1
    }

    static getHeaderTableCell = (txt: string) => {
        return new PdfText(txt, undefined, undefined, false, true, 'black', 9)
    }

    static getTableCell = (txt: string) => {
        return new PdfText(txt, undefined, undefined, true, false, 'black', 8)
    }

    static getTotalCell = (txt: string) => {
        return new PdfText(txt, undefined, undefined, true, true, 'black', 10)
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new PdfTableSub([], [])
        
        return new PdfTableSub(obj.widths, obj.body)
    }
}
