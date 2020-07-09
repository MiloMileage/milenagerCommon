export default class PdfLayout {
    fillColor: (i: number, node: any) => string
    hLineWidth: (i: number, node: any) => number
    
    constructor (fillColor: (i: number, node: any) => string, hLineWidth: (i: number, node: any) => number, noSummary: boolean = false) {
        this.fillColor = fillColor
        this.hLineWidth = hLineWidth === undefined ? PdfLayout.getTableHeaderHLineWidthFunc(noSummary) : hLineWidth
    }

    static getTableHeaderFillColorFunc = () => {
        return (i: number, node: any)  => i === 0 ? '#CCCCCC' : null
    }

    static getTableHeaderHLineWidthFunc = (noSummary: boolean = false) => {
        return (i: number, node: any)  => (node.table.body.length - 1 === i ? noSummary ? 1 :3 : 1)
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new PdfLayout((i: number, node: any) => '', (i: number, node: any) => 1)
        
        return new PdfLayout(obj.fillColor, obj.hLineWidth)
    }
}
