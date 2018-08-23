export default class PdfObject {
    style: string
    margin: Array<number>
    
    constructor (style: string, margin: Array<number>) {
        this.style = style
        this.margin = margin
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new PdfObject('', [])
        
        return new PdfObject(obj.style, obj.margin)
    }
}
