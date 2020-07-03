import YMUserSettings from "./YMUserSettings"
import YMGlobalUserSettings from "./YMGlobalUserSettings"

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

    static getNameOrDefault = (incomeSourceId: string, defaultName: string, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings, filterVisible: boolean = false) => {
        const mergedArray = YMIncomeSorce.mergeIncomeSourcesArrays(userSettings.incomeSources, globalSettings.incomeSources, filterVisible)
        const incomeSource = mergedArray.filter(x => x.incomeSourceId === incomeSourceId)[0]

        return incomeSource ? incomeSource.name : defaultName
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