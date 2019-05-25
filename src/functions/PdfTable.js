"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var PdfObject_1 = require("./PdfObject");
var PdfTableSub_1 = require("./PdfTableSub");
var PdfLayout_1 = require("./PdfLayout");
var PdfTable = /** @class */ (function (_super) {
    __extends(PdfTable, _super);
    function PdfTable(style, margin, table, layout) {
        var _this = _super.call(this, style, margin) || this;
        _this.table = table;
        _this.layout = layout;
        return _this;
    }
    // tslint:disable-next-line:member-ordering
    PdfTable.fromObject = function (obj) {
        if (obj == null)
            return new PdfTable('', [], PdfTableSub_1["default"].fromObject({}), PdfLayout_1["default"].fromObject({}));
        return new PdfTable(obj.style, obj.margin, obj.table, obj.layout);
    };
    return PdfTable;
}(PdfObject_1["default"]));
exports["default"] = PdfTable;
