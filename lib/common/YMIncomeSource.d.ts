import YMUserSettings from "./YMUserSettings";
import YMGlobalUserSettings from "./YMGlobalUserSettings";
export default class YMIncomeSorce {
    incomeSourceId: string;
    name: string;
    visible: boolean;
    constructor(incomeSourceId: string, name: string, visible: boolean);
    static fromObject: (obj: any) => YMIncomeSorce;
    static getNameOrDefault: (incomeSourceId: string, defaultName: string, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings, filterVisible?: boolean) => string;
    static mergeIncomeSourcesArrays: (first: YMIncomeSorce[], second: YMIncomeSorce[], filterVisible?: boolean) => YMIncomeSorce[];
}
