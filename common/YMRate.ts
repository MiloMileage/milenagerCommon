export default class YMRate {
    name: string
    deductable: number
    visible: boolean
    rateId: string

    constructor (name: string, deductable: number, rateId: string = new Date().getTime().toString(), visible: boolean = true) {
        this.name = name
        this.deductable = deductable
        this.visible = visible
        this.rateId = rateId
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        // tslint:disable-next-line:max-line-length
        return new YMRate(obj.name, obj.deductable, obj.rateId, obj.visible)
    }
}