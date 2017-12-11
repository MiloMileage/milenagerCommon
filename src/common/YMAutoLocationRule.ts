export default class YMAutoLocationRule {
    ruleId: string
    originSavedLocationId: string
    destSavedLocationId: string
    purposeId: string

    constructor (ruleId: string, originSavedLocationId: string, destSavedLocationId: string, purposeId: string) {
        this.ruleId = ruleId
        this.originSavedLocationId = originSavedLocationId
        this.destSavedLocationId = destSavedLocationId
        this.purposeId = purposeId
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        // tslint:disable-next-line:max-line-length
        return new YMAutoLocationRule(obj.ruleId, obj.originSavedLocationId, obj.destSavedLocationId, obj.purposeId)
    }
}