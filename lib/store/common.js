"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guid = function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};
exports.getUniqueDriveId = function () {
    return exports.guid();
};
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
exports.default = {
    getUniqueDriveId: exports.getUniqueDriveId
};
//# sourceMappingURL=common.js.map