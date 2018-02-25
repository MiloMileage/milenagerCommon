export default class YMPurpose {
    purposeId: string
    rateId: string
    name: string
    category: string
    visible: boolean

    constructor (purposeId = 'id', rateId = 'rateId', name = 'name', category = 'category', visible: boolean = true) {
        this.purposeId = purposeId
        this.rateId = rateId
        this.name = name
        this.category = category
        this.visible = visible
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMPurpose('', '', '', '', false)

        return new YMPurpose(obj.purposeId, obj.rateId, obj.name, obj.category, obj.visible)
    }
}