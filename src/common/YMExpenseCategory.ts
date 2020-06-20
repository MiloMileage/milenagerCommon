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
}