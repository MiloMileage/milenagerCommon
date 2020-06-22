export default class YMExpenseCategory {
    expenseCategoryId: string;
    name: string;
    visible: boolean;
    constructor(expenseCategoryId: string, name: string, visible: boolean);
    static fromObject: (obj: any) => YMExpenseCategory;
    static mergeExpenseCategoriesArrays: (first: YMExpenseCategory[], second: YMExpenseCategory[], filterVisible?: boolean) => YMExpenseCategory[];
}
