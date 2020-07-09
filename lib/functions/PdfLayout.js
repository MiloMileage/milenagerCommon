"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PdfLayout {
    constructor(fillColor, hLineWidth, noSummary = false) {
        this.fillColor = fillColor;
        this.hLineWidth = hLineWidth === undefined ? PdfLayout.getTableHeaderHLineWidthFunc(noSummary) : hLineWidth;
    }
}
PdfLayout.getTableHeaderFillColorFunc = () => {
    return (i, node) => i === 0 ? '#CCCCCC' : null;
};
PdfLayout.getTableHeaderHLineWidthFunc = (noSummary = false) => {
    return (i, node) => (node.table.body.length - 1 === i ? noSummary ? 1 : 3 : 1);
};
// tslint:disable-next-line:member-ordering
PdfLayout.fromObject = function (obj) {
    if (obj == null)
        return new PdfLayout((i, node) => '', (i, node) => 1);
    return new PdfLayout(obj.fillColor, obj.hLineWidth);
};
exports.default = PdfLayout;
//# sourceMappingURL=PdfLayout.js.map