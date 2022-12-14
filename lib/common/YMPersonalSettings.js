"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
class YMPersonalSettings {
    constructor(isMetricSystem, monitoringLevel, monitorFromTimestamp) {
        this.isMetricSystem = isMetricSystem;
        this.monitoringLevel = monitoringLevel === undefined ? '1' : monitoringLevel;
        this.monitorFromTimestamp = monitorFromTimestamp === undefined ? Moment.utc().add(-1, 'day').toDate().getTime() : monitorFromTimestamp;
    }
    isDriveDetectionEnabled() {
        return this.monitorFromTimestamp < new Date().getTime();
    }
    // tslint:disable-next-line:member-ordering
    static flipMetric(curr) {
        return new YMPersonalSettings(!curr.isMetricSystem, curr.monitoringLevel, curr.monitorFromTimestamp);
    }
}
// tslint:disable-next-line:member-ordering
YMPersonalSettings.fromObject = function (obj) {
    if (obj == null)
        return new YMPersonalSettings(false, undefined, undefined);
    return new YMPersonalSettings(obj.isMetricSystem, obj.monitoringLevel, obj.monitorFromTimestamp);
};
exports.default = YMPersonalSettings;
//# sourceMappingURL=YMPersonalSettings.js.map