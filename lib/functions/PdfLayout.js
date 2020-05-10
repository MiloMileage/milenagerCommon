"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PdfLayout {
    constructor(fillColor, hLineWidth) {
        this.fillColor = fillColor;
        this.hLineWidth = hLineWidth === undefined ? PdfLayout.getTableHeaderHLineWidthFunc() : hLineWidth;
    }
}
exports.default = PdfLayout;
PdfLayout.getTableHeaderFillColorFunc = () => {
    return (i, node) => i === 0 ? '#CCCCCC' : null;
};
PdfLayout.getTableHeaderHLineWidthFunc = () => {
    return (i, node) => (node.table.body.length - 1 === i ? 3 : 1);
};
// tslint:disable-next-line:member-ordering
PdfLayout.fromObject = function (obj) {
    if (obj == null)
        return new PdfLayout((i, node) => '', (i, node) => 1);
    return new PdfLayout(obj.fillColor, obj.hLineWidth);
};
//# sourceMappingURL=PdfLayout.js.map