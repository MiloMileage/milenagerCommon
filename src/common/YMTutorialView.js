"use strict";
exports.__esModule = true;
var YMTutorialCard_1 = require("./YMTutorialCard");
var YMTutorialView = /** @class */ (function () {
    function YMTutorialView(cards) {
        this.cards = cards == null ? new Array() : cards.map(function (c) { return YMTutorialCard_1["default"].fromObject(c); });
    }
    // tslint:disable-next-line:member-ordering
    YMTutorialView.fromObject = function (obj) {
        if (obj == null)
            return new YMTutorialView(new Array());
        return new YMTutorialView(obj.cards);
    };
    return YMTutorialView;
}());
exports["default"] = YMTutorialView;
