"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PdfObject_1 = require("./PdfObject");
class PdfText extends PdfObject_1.default {
    constructor(text, margin, style, italics, bold, color, fontSize, alignment = undefined) {
        super(style, margin);
        this.text = text;
        this.italics = italics;
        this.bold = bold;
        this.color = color;
        this.fontSize = fontSize;
        this.alignment = alignment;
    }
}
// tslint:disable-next-line:member-ordering
PdfText.fromObject = function (obj) {
    if (obj == null)
        return new PdfText('', [], '', false, false, 'black', 10, undefined);
    return new PdfText(obj.text, obj.margin, obj.style, obj.italics, obj.bold, obj.color, obj.fontSize, obj.alignment);
};
exports.default = PdfText;
//# sourceMappingURL=PdfText.js.map