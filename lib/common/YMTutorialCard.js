"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMImage_1 = require("./YMImage");
class YMTutorialCard {
    constructor(headline, description, image) {
        this.headline = headline;
        this.description = description;
        this.image = YMImage_1.default.fromObject(image);
    }
}
exports.default = YMTutorialCard;
// tslint:disable-next-line:member-ordering
YMTutorialCard.fromObject = function (obj) {
    if (obj == null)
        return new YMTutorialCard('', '', undefined);
    return new YMTutorialCard(obj.headline, obj.description, obj.image);
};
//# sourceMappingURL=YMTutorialCard.js.map