"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PdfObject {
    constructor(style, margin) {
        this.style = style;
        this.margin = margin;
    }
}
exports.default = PdfObject;
// tslint:disable-next-line:member-ordering
PdfObject.fromObject = function (obj) {
    if (obj == null)
        return new PdfObject('', []);
    return new PdfObject(obj.style, obj.margin);
};
//# sourceMappingURL=PdfObject.js.map