import PdfObject from './PdfObject'
import PdfTableSub from './PdfTableSub'
import PdfLayout from './PdfLayout'

export default class PdfTable extends PdfObject {
    table: PdfTableSub
    layout: PdfLayout

    constructor (style: string, margin: Array<number>, table: PdfTableSub, layout: PdfLayout) {
        super(style, margin)
        this.table = table
        this.layout = layout
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new PdfTable('', [], PdfTableSub.fromObject({}), PdfLayout.fromObject({}))
        
        return new PdfTable(obj.style, obj.margin, obj.table, obj.layout)
    }
}
