"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMLocation_1 = require("./YMLocation");
class YMSavedLocation {
    // tslint:disable-next-line:max-line-length
    constructor(name, location) {
        this.name = name;
        this.location = YMLocation_1.default.fromObject(location);
    }
}
// tslint:disable-next-line:member-ordering
YMSavedLocation.fromObject = function (obj) {
    // tslint:disable-next-line:max-line-length
    return new YMSavedLocation(obj.name, obj.location);
};
exports.default = YMSavedLocation;
//# sourceMappingURL=YMSavedLocation.js.map