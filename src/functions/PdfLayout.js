"use strict";
exports.__esModule = true;
var PdfLayout = /** @class */ (function () {
    function PdfLayout(fillColor, hLineWidth) {
        this.fillColor = fillColor;
        this.hLineWidth = hLineWidth === undefined ? PdfLayout.getTableHeaderHLineWidthFunc() : hLineWidth;
    }
    PdfLayout.getTableHeaderFillColorFunc = function () {
        return function (i, node) { return i === 0 ? '#CCCCCC' : null; };
    };
    PdfLayout.getTableHeaderHLineWidthFunc = function () {
        return function (i, node) { return (node.table.body.length - 1 === i ? 3 : 1); };
    };
    // tslint:disable-next-line:member-ordering
    PdfLayout.fromObject = function (obj) {
        if (obj == null)
            return new PdfLayout(function (i, node) { return ''; }, function (i, node) { return 1; });
        return new PdfLayout(obj.fillColor, obj.hLineWidth);
    };
    return PdfLayout;
}());
exports["default"] = PdfLayout;
