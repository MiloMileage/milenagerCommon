"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMExpenseCategory {
    constructor(expenseCategoryId, name, visible) {
        this.expenseCategoryId = expenseCategoryId;
        this.name = name;
        this.visible = visible;
    }
}
// tslint:disable-next-line:member-ordering
YMExpenseCategory.fromObject = function (obj) {
    if (obj == null)
        return new YMExpenseCategory('', '', true);
    return new YMExpenseCategory(obj.expenseCategoryId, obj.name, obj.visible);
};
YMExpenseCategory.mergeExpenseCategoriesArrays = (first, second, filterVisible = true) => {
    const expenseCategories = new Array();
    if (first) {
        for (const expenseCategory of first) {
            if (expenseCategories.filter(x => x.expenseCategoryId === expenseCategory.expenseCategoryId).length === 0) {
                expenseCategories.push(YMExpenseCategory.fromObject(JSON.parse(JSON.stringify(expenseCategory))));
            }
        }
    }
    if (second) {
        for (const expenseCategory of second) {
            if (expenseCategories.filter(x => x.expenseCategoryId === expenseCategory.expenseCategoryId).length === 0) {
                expenseCategories.push(YMExpenseCategory.fromObject(JSON.parse(JSON.stringify(expenseCategory))));
            }
        }
    }
    return filterVisible ? expenseCategories.filter(x => x.visible) : expenseCategories;
};
exports.default = YMExpenseCategory;
//# sourceMappingURL=YMExpenseCategory.js.map