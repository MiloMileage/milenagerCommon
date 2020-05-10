"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PdfObject_1 = require("./PdfObject");
class PdfText extends PdfObject_1.default {
    constructor(text, margin, style, italics, bold, color, fontSize, alignment = undefined, pageBreak = undefined) {
        super(style, margin);
        this.text = text;
        this.italics = italics;
        this.bold = bold;
        this.color = color;
        this.fontSize = fontSize;
        this.alignment = alignment;
        this.pageBreak = pageBreak;
    }
}
exports.default = PdfText;
// tslint:disable-next-line:member-ordering
PdfText.fromObject = function (obj) {
    if (obj == null)
        return new PdfText('', [], '', false, false, 'black', 10, undefined, undefined);
    return new PdfText(obj.text, obj.margin, obj.style, obj.italics, obj.bold, obj.color, obj.fontSize, obj.alignment, obj.pageBreak);
};
//# sourceMappingURL=PdfText.js.map