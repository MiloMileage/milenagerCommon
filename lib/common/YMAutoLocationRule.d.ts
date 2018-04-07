export default class YMAutoLocationRule {
    ruleId: string;
    originSavedLocationId: string;
    destSavedLocationId: string;
    purposeId: string;
    constructor(ruleId: string, originSavedLocationId: string, destSavedLocationId: string, purposeId: string);
    static fromObject: (obj: any) => YMAutoLocationRule;
}
