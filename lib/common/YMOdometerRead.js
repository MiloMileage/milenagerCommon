"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMOdometerRead {
    constructor(year, read) {
        this.year = year;
        this.read = read;
    }
}
exports.default = YMOdometerRead;
// tslint:disable-next-line:member-ordering
YMOdometerRead.fromObject = function (obj) {
    if (obj == null)
        return new YMOdometerRead(0, 0);
    return new YMOdometerRead(obj.year, obj.read);
};
//# sourceMappingURL=YMOdometerRead.js.map