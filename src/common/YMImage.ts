export default class YMImage {
    width: number
    height: number
    url: string
    showBorder: boolean

    constructor (width: number, height: number, url: string, showBorder: boolean) {
        this.width = width
        this.height = height
        this.url = url
        this.showBorder = showBorder
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMImage(0, 0, '', false)
        
        return new YMImage(obj.width, obj.height, obj.url, obj.showBorder)
    }
}