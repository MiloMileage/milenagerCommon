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
var PdfText = /** @class */ (function (_super) {
    __extends(PdfText, _super);
    function PdfText(text, margin, style, italics, bold, color, fontSize, alignment, pageBreak) {
        if (alignment === void 0) { alignment = undefined; }
        if (pageBreak === void 0) { pageBreak = undefined; }
        var _this = _super.call(this, style, margin) || this;
        _this.text = text;
        _this.italics = italics;
        _this.bold = bold;
        _this.color = color;
        _this.fontSize = fontSize;
        _this.alignment = alignment;
        _this.pageBreak = pageBreak;
        return _this;
    }
    // tslint:disable-next-line:member-ordering
    PdfText.fromObject = function (obj) {
        if (obj == null)
            return new PdfText('', [], '', false, false, 'black', 10, undefined, undefined);
        return new PdfText(obj.text, obj.margin, obj.style, obj.italics, obj.bold, obj.color, obj.fontSize, obj.alignment, obj.pageBreak);
    };
    return PdfText;
}(PdfObject_1["default"]));
exports["default"] = PdfText;
