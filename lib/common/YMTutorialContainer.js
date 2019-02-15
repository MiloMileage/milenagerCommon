"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMTutorialView_1 = require("./YMTutorialView");
class YMTutorialContainer {
    constructor(views, name, category) {
        this.views = views == null ? new Array() : views.map(v => YMTutorialView_1.default.fromObject(v));
    }
}
// tslint:disable-next-line:member-ordering
YMTutorialContainer.fromObject = function (obj) {
    if (obj == null)
        return new YMTutorialContainer(new Array(), '', '');
    return new YMTutorialContainer(obj.views, obj.name, obj.category);
};
exports.default = YMTutorialContainer;
//# sourceMappingURL=YMTutorialContainer.js.map