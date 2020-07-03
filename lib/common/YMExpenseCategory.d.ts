import YMUserSettings from "./YMUserSettings";
import YMGlobalUserSettings from "./YMGlobalUserSettings";
export default class YMExpenseCategory {
    expenseCategoryId: string;
    name: string;
    visible: boolean;
    constructor(expenseCategoryId: string, name: string, visible: boolean);
    static fromObject: (obj: any) => YMExpenseCategory;
    static getNameOrDefault: (expenseId: string, defaultName: string, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings, filterVisible?: boolean) => string;
    static mergeExpenseCategoriesArrays: (first: YMExpenseCategory[], second: YMExpenseCategory[], filterVisible?: boolean) => YMExpenseCategory[];
}
