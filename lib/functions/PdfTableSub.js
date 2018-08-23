"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PdfText_1 = require("./PdfText");
class PdfTableSub {
    constructor(widths, body) {
        this.widths = widths;
        this.body = body;
    }
}
PdfTableSub.getHeaderTableCell = (txt) => {
    return new PdfText_1.default(txt, undefined, undefined, false, true, 'black', 11);
};
PdfTableSub.getTableCell = (txt) => {
    return new PdfText_1.default(txt, undefined, undefined, true, false, 'black', 10);
};
PdfTableSub.getTotalCell = (txt) => {
    return new PdfText_1.default(txt, undefined, undefined, true, true, 'black', 12);
};
// tslint:disable-next-line:member-ordering
PdfTableSub.fromObject = function (obj) {
    if (obj == null)
        return new PdfTableSub([], []);
    return new PdfTableSub(obj.widths, obj.body);
};
exports.default = PdfTableSub;
//# sourceMappingURL=PdfTableSub.js.map