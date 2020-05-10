"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMTutorialContainer {
    constructor(tutorialId, name) {
        this.tutorialId = tutorialId;
        this.name = name;
    }
}
exports.default = YMTutorialContainer;
// tslint:disable-next-line:member-ordering
YMTutorialContainer.fromObject = function (obj) {
    if (obj == null)
        return new YMTutorialContainer('', '');
    return new YMTutorialContainer(obj.tutorialId, obj.name);
};
//# sourceMappingURL=YMTutorialContainer.js.map