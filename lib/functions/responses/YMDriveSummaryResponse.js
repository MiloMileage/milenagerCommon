"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./../../common/YMDateRange");
class YMDriveSummaryResponse {
    constructor(drivesCount, earned, potential, miles, dateRange) {
        this.drivesCount = drivesCount;
        this.earned = earned;
        this.potential = potential;
        this.miles = miles;
        this.dateRange = dateRange;
    }
}
// tslint:disable-next-line:member-ordering
YMDriveSummaryResponse.fromObject = function (obj) {
    if (obj == null)
        return new YMDriveSummaryResponse({}, 0, 0, 0, YMDateRange_1.default.fromObject({}));
    return new YMDriveSummaryResponse(obj.drivesCount, obj.earned, obj.potential, obj.miles, obj.dateRange);
};
exports.default = YMDriveSummaryResponse;
//# sourceMappingURL=YMDriveSummaryResponse.js.map