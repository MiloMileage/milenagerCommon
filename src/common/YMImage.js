"use strict";
exports.__esModule = true;
var YMImage = /** @class */ (function () {
    function YMImage(width, height, url, showBorder) {
        this.width = width;
        this.height = height;
        this.url = url;
        this.showBorder = showBorder;
    }
    // tslint:disable-next-line:member-ordering
    YMImage.fromObject = function (obj) {
        if (obj == null)
            return new YMImage(0, 0, '', false);
        return new YMImage(obj.width, obj.height, obj.url, obj.showBorder);
    };
    return YMImage;
}());
exports["default"] = YMImage;
