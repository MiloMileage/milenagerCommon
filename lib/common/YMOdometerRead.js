"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMOdometerRead {
    constructor(year = new Date().getFullYear(), read = 0) {
        this.year = year;
        this.read = read;
    }
}
// tslint:disable-next-line:member-ordering
YMOdometerRead.fromObject = function (obj) {
    // tslint:disable-next-line:max-line-length
    return new YMOdometerRead(obj.year, obj.read);
};
exports.default = YMOdometerRead;
//# sourceMappingURL=YMOdometerRead.js.map