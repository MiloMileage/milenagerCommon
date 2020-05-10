"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMLastUpdated {
    // tslint:disable-next-line:max-line-length
    constructor(driveUpdatedTimestamp) {
        this.driveUpdatedTimestamp = driveUpdatedTimestamp;
    }
}
exports.default = YMLastUpdated;
// tslint:disable-next-line:member-ordering
YMLastUpdated.fromObject = function (obj) {
    if (obj == null)
        return new YMLastUpdated(new Date().getTime());
    // tslint:disable-next-line:max-line-length
    return new YMLastUpdated(obj.driveUpdatedTimestamp);
};
//# sourceMappingURL=YMLastUpdated.js.map