"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PdfObject_1 = require("./PdfObject");
const PdfTableSub_1 = require("./PdfTableSub");
const PdfLayout_1 = require("./PdfLayout");
class PdfTable extends PdfObject_1.default {
    constructor(style, margin, table, layout) {
        super(style, margin);
        this.table = table;
        this.layout = layout;
    }
}
exports.default = PdfTable;
// tslint:disable-next-line:member-ordering
PdfTable.fromObject = function (obj) {
    if (obj == null)
        return new PdfTable('', [], PdfTableSub_1.default.fromObject({}), PdfLayout_1.default.fromObject({}));
    return new PdfTable(obj.style, obj.margin, obj.table, obj.layout);
};
//# sourceMappingURL=PdfTable.js.map