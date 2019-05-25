"use strict";
exports.__esModule = true;
var YMImage_1 = require("./YMImage");
var YMTutorialCard = /** @class */ (function () {
    function YMTutorialCard(headline, description, image) {
        this.headline = headline;
        this.description = description;
        this.image = YMImage_1["default"].fromObject(image);
    }
    // tslint:disable-next-line:member-ordering
    YMTutorialCard.fromObject = function (obj) {
        if (obj == null)
            return new YMTutorialCard('', '', undefined);
        return new YMTutorialCard(obj.headline, obj.description, obj.image);
    };
    return YMTutorialCard;
}());
exports["default"] = YMTutorialCard;
