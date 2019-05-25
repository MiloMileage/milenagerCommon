"use strict";
exports.__esModule = true;
var PdfObject = /** @class */ (function () {
    function PdfObject(style, margin) {
        this.style = style;
        this.margin = margin;
    }
    // tslint:disable-next-line:member-ordering
    PdfObject.fromObject = function (obj) {
        if (obj == null)
            return new PdfObject('', []);
        return new PdfObject(obj.style, obj.margin);
    };
    return PdfObject;
}());
exports["default"] = PdfObject;
