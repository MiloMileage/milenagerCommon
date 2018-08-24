export default class PdfLayout {
    fillColor: (i: number, node: any) => string
    hLineWidth: (i: number, node: any) => number
    
    constructor (fillColor: (i: number, node: any) => string, hLineWidth: (i: number, node: any) => number) {
        this.fillColor = fillColor
        this.hLineWidth = hLineWidth === undefined ? PdfLayout.getTableHeaderHLineWidthFunc() : hLineWidth
    }

    static getTableHeaderFillColorFunc = () => {
        return (i: number, node: any)  => i === 0 ? '#CCCCCC' : null
    }

    static getTableHeaderHLineWidthFunc = () => {
        return (i: number, node: any)  => (node.table.body.length - 1 === i ? 3 : 1)
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new PdfLayout((i: number, node: any) => '', (i: number, node: any) => 1)
        
        return new PdfLayout(obj.fillColor, obj.hLineWidth)
    }
}
