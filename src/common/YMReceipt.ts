export default class YMReceipt {
    imageUrl: string
    refUrl: string

    constructor (imageUrl: string, refUrl: string) {
        this.imageUrl = imageUrl
        this.refUrl = refUrl
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMReceipt('', '')

        return new YMReceipt(obj.imageUrl, obj.refUrl)
    }
}