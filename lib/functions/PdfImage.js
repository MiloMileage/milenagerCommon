"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PdfImage {
    constructor(image, width, height) {
        this.image = image;
        this.fit = [width, height];
    }
}
// tslint:disable-next-line:member-ordering
PdfImage.fromObject = function (obj) {
    if (obj == null)
        return new PdfImage('', 100, 100);
    return new PdfImage(obj.image, obj.fit[0], obj.fit[1]);
};
exports.default = PdfImage;
//# sourceMappingURL=PdfImage.js.map