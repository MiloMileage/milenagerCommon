"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMAddress_1 = require("./YMAddress");
const common_1 = require("./../components/common");
class YMLocation {
    constructor(address, lat, lon) {
        // tslint:disable-next-line:member-ordering
        this.getLatLonKey = function () {
            const key = ('' + common_1.roundNumber(this.lat, 2) + '_' + common_1.roundNumber(this.lon, 2)).replace('.', '*').replace('.', '*');
            return key;
        };
        this.address = YMAddress_1.default.fromObject(address);
        this.lat = lat;
        this.lon = lon;
    }
}
// tslint:disable-next-line:member-ordering
YMLocation.fromObject = function (obj) {
    // tslint:disable-next-line:max-line-length
    return new YMLocation(obj.address, obj.lat, obj.lon);
};
exports.default = YMLocation;
//# sourceMappingURL=YMLocation.js.map