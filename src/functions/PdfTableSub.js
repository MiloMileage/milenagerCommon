"use strict";
exports.__esModule = true;
var PdfText_1 = require("./PdfText");
var PdfTableSub = /** @class */ (function () {
    function PdfTableSub(widths, body) {
        this.widths = widths;
        this.body = body;
        this.headerRows = 1;
    }
    PdfTableSub.getHeaderTableCell = function (txt) {
        return new PdfText_1["default"](txt, undefined, undefined, false, true, 'black', 9);
    };
    PdfTableSub.getTableCell = function (txt) {
        return new PdfText_1["default"](txt, undefined, undefined, true, false, 'black', 8);
    };
    PdfTableSub.getTotalCell = function (txt) {
        return new PdfText_1["default"](txt, undefined, undefined, true, true, 'black', 10);
    };
    // tslint:disable-next-line:member-ordering
    PdfTableSub.fromObject = function (obj) {
        if (obj == null)
            return new PdfTableSub([], []);
        return new PdfTableSub(obj.widths, obj.body);
    };
    return PdfTableSub;
}());
exports["default"] = PdfTableSub;
