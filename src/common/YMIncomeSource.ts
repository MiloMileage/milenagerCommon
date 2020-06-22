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

    static mergeIncomeSourcesArrays = (first: Array<YMIncomeSorce>, second: Array<YMIncomeSorce>, filterVisible: boolean = true) => {
        const incomeSources = new Array<YMIncomeSorce>()
        
        if (first) {
            for (const incomeSource of first) {
                if (incomeSources.filter(x => x.incomeSourceId === incomeSource.incomeSourceId).length === 0) {
                    incomeSources.push(YMIncomeSorce.fromObject(JSON.parse(JSON.stringify(incomeSource))))   
                }
            }
        }
        
        if (second) {
            for (const incomeSource of second) {
                if (incomeSources.filter(x => x.incomeSourceId === incomeSource.incomeSourceId).length === 0) {
                    incomeSources.push(YMIncomeSorce.fromObject(JSON.parse(JSON.stringify(incomeSource))))
                }
            }
        }

        return filterVisible ? incomeSources.filter(x => x.visible) : incomeSources
    }
}