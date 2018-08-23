import PdfObject from './PdfObject'
import PdfText from './PdfText'

export default class PdfTableSub {
    widths: Array<any>
    body: Array<Array<PdfObject>>
    
    constructor (widths: Array<any>, body: Array<Array<PdfObject>>) {
        this.widths = widths
        this.body = body
    }

    static getHeaderTableCell = (txt: string) => {
        return new PdfText(txt, undefined, undefined, false, true, 'black', 11)
    }

    static getTableCell = (txt: string) => {
        return new PdfText(txt, undefined, undefined, true, false, 'black', 10)
    }

    static getTotalCell = (txt: string) => {
        return new PdfText(txt, undefined, undefined, true, true, 'black', 12)
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new PdfTableSub([], [])
        
        return new PdfTableSub(obj.widths, obj.body)
    }
}
