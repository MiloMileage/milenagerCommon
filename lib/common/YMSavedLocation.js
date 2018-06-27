"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMLocation_1 = require("./YMLocation");
const common_1 = require("../store/common");
class YMSavedLocation {
    // tslint:disable-next-line:max-line-length
    constructor(name, location, purposeId) {
        this.name = name;
        this.location = YMLocation_1.default.fromObject(location);
        this.purposeId = purposeId;
        this.key = common_1.default.getUniqueDriveId();
    }
}
// tslint:disable-next-line:member-ordering
YMSavedLocation.fromObject = function (obj) {
    if (obj == null)
        return new YMSavedLocation('', YMLocation_1.default.fromObject(undefined), '');
    // tslint:disable-next-line:max-line-length
    return new YMSavedLocation(obj.name, obj.location, obj.purposeId);
};
exports.default = YMSavedLocation;
//# sourceMappingURL=YMSavedLocation.js.map