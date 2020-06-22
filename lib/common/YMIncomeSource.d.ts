export default class YMIncomeSorce {
    incomeSourceId: string;
    name: string;
    visible: boolean;
    constructor(incomeSourceId: string, name: string, visible: boolean);
    static fromObject: (obj: any) => YMIncomeSorce;
    static mergeIncomeSourcesArrays: (first: YMIncomeSorce[], second: YMIncomeSorce[], filterVisible?: boolean) => YMIncomeSorce[];
}
