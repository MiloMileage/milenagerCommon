export default class YMReceipt {
    imageUrl: string

    constructor (imageUrl: string) {
        this.imageUrl = imageUrl
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMReceipt('')

        return new YMReceipt(obj.imageUrl)
    }
}