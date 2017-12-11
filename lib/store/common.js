"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueDriveId = function () {
    return guid();
};
function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
//# sourceMappingURL=common.js.map