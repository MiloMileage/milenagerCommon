import PdfObject from './PdfObject'

export default class PdfImage {
    image: any
    fit: Array<Number>

    constructor (image: any, width: number, height: number) {
        this.image = image
        this.fit = [width, height]
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new PdfImage('', 100, 100)
        
        return new PdfImage(obj.image, obj.fit[0], obj.fit[1])
    }
}
