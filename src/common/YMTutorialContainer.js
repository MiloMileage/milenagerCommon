"use strict";
exports.__esModule = true;
var YMTutorialContainer = /** @class */ (function () {
    function YMTutorialContainer(tutorialId, name) {
        this.tutorialId = tutorialId;
        this.name = name;
    }
    // tslint:disable-next-line:member-ordering
    YMTutorialContainer.fromObject = function (obj) {
        if (obj == null)
            return new YMTutorialContainer('', '');
        return new YMTutorialContainer(obj.tutorialId, obj.name);
    };
    return YMTutorialContainer;
}());
exports["default"] = YMTutorialContainer;
