export default class YMMerchant {
    name: string

    constructor (name: string) {
        this.name = name
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMMerchant('')

        return new YMMerchant(obj.name)
    }
}