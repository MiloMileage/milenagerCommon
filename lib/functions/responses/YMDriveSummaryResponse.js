"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./../../common/YMDateRange");
class YMDriveSummaryResponse {
    constructor(drivesCount, earned, potential, miles, dateRange, parkingMoney, tollsMoney) {
        this.drivesCount = drivesCount;
        this.earned = earned;
        this.potential = potential;
        this.miles = miles;
        this.dateRange = dateRange;
        this.parkingMoney = parkingMoney;
        this.tollMoney = tollsMoney;
    }
}
// tslint:disable-next-line:member-ordering
YMDriveSummaryResponse.fromObject = function (obj) {
    if (obj == null)
        return new YMDriveSummaryResponse({}, 0, 0, 0, YMDateRange_1.default.fromObject({}), 0, 0);
    return new YMDriveSummaryResponse(obj.drivesCount, obj.earned, obj.potential, obj.miles, obj.dateRange, obj.parkingMoney, obj.tollMoney);
};
exports.default = YMDriveSummaryResponse;
//# sourceMappingURL=YMDriveSummaryResponse.js.map