import YMUserSettings from "./YMUserSettings"
import YMGlobalUserSettings from "./YMGlobalUserSettings"

export default class YMExpenseCategory {
    expenseCategoryId: string
    name: string
    visible: boolean

    constructor (expenseCategoryId: string, name: string, visible: boolean) {
        this.expenseCategoryId = expenseCategoryId
        this.name = name
        this.visible = visible
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMExpenseCategory('', '', true)

        return new YMExpenseCategory(obj.expenseCategoryId, obj.name, obj.visible)
    }

    static getNameOrDefault = (expenseId: string, defaultName: string, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings, filterVisible: boolean = false) => {
        const mergedArray = YMExpenseCategory.mergeExpenseCategoriesArrays(userSettings.expenseCategories, globalSettings.expenseCategories, filterVisible)
        const expense = mergedArray.filter(x => x.expenseCategoryId === expenseId)[0]

        return expense ? expense.name : defaultName
    }

    static mergeExpenseCategoriesArrays = (first: Array<YMExpenseCategory>, second: Array<YMExpenseCategory>, filterVisible: boolean = true) => {
        const expenseCategories = new Array<YMExpenseCategory>()
        
        if (first) {
            for (const expenseCategory of first) {
                if (expenseCategories.filter(x => x.expenseCategoryId === expenseCategory.expenseCategoryId).length === 0) {
                    expenseCategories.push(YMExpenseCategory.fromObject(JSON.parse(JSON.stringify(expenseCategory))))   
                }
            }
        }
        
        if (second) {
            for (const expenseCategory of second) {
                if (expenseCategories.filter(x => x.expenseCategoryId === expenseCategory.expenseCategoryId).length === 0) {
                    expenseCategories.push(YMExpenseCategory.fromObject(JSON.parse(JSON.stringify(expenseCategory))))
                }
            }
        }

        return filterVisible ? expenseCategories.filter(x => x.visible) : expenseCategories
    }
}