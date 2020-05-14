"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMTutorialCard_1 = require("./YMTutorialCard");
class YMTutorialView {
    constructor(cards) {
        this.cards = cards == null ? new Array() : cards.map(c => YMTutorialCard_1.default.fromObject(c));
    }
}
// tslint:disable-next-line:member-ordering
YMTutorialView.fromObject = function (obj) {
    if (obj == null)
        return new YMTutorialView(new Array());
    return new YMTutorialView(obj.cards);
};
exports.default = YMTutorialView;
//# sourceMappingURL=YMTutorialView.js.map