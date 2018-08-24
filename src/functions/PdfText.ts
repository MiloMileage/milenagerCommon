import PdfObject from './PdfObject'

export default class PdfText extends PdfObject {
    text: string
    italics: boolean
    bold: boolean
    color: string
    fontSize: number
    alignment: string
    pageBreak: string

    constructor (text: string, margin: Array<number>, style: string, italics: boolean, bold: boolean, color: string, fontSize: number, alignment: string = undefined, pageBreak: string = undefined) {
        super(style, margin)
        this.text = text
        this.italics = italics
        this.bold = bold
        this.color = color
        this.fontSize = fontSize
        this.alignment = alignment
        this.pageBreak = pageBreak
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new PdfText('', [], '', false, false, 'black', 10, undefined, undefined)
        
        return new PdfText(obj.text, obj.margin, obj.style, obj.italics, obj.bold, obj.color, obj.fontSize, obj.alignment, obj.pageBreak)
    }
}
