"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMTutorialContainer {
    constructor(tutorialId, name) {
        this.tutorialId = tutorialId;
        this.name = name;
    }
}
// tslint:disable-next-line:member-ordering
YMTutorialContainer.fromObject = function (obj) {
    if (obj == null)
        return new YMTutorialContainer('', '');
    return new YMTutorialContainer(obj.tutorialId, obj.name);
};
exports.default = YMTutorialContainer;
//# sourceMappingURL=YMTutorialContainer.js.map