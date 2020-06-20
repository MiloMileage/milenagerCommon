export default class YMIncomeSorce {
    incomeSourceId: string
    name: string
    visible: boolean

    constructor (incomeSourceId: string, name: string, visible: boolean) {
        this.incomeSourceId = incomeSourceId
        this.name = name
        this.visible = visible
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMIncomeSorce('', '', true)

        return new YMIncomeSorce(obj.incomeSourceId, obj.name, obj.visible)
    }
}