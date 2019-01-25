"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMImage {
    constructor(width, height, url, showBorder) {
        this.width = width;
        this.height = height;
        this.url = url;
        this.showBorder = showBorder;
    }
}
// tslint:disable-next-line:member-ordering
YMImage.fromObject = function (obj) {
    if (obj == null)
        return new YMImage(0, 0, '', false);
    return new YMImage(obj.width, obj.height, obj.url, obj.showBorder);
};
exports.default = YMImage;
//# sourceMappingURL=YMImage.js.map