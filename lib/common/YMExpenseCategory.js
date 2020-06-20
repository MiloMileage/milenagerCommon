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
exports.default = YMExpenseCategory;
//# sourceMappingURL=YMExpenseCategory.js.map