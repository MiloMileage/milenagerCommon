"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMPersonalSettings {
    constructor(isMetricSystem, monitoringLevel) {
        this.isMetricSystem = isMetricSystem;
        this.monitoringLevel = monitoringLevel;
    }
    // tslint:disable-next-line:member-ordering
    static flipMetric(curr) {
        return new YMPersonalSettings(!curr.isMetricSystem, curr.monitoringLevel);
    }
}
// tslint:disable-next-line:member-ordering
YMPersonalSettings.fromObject = function (obj) {
    // tslint:disable-next-line:max-line-length
    return new YMPersonalSettings(obj.isMetricSystem, obj.monitoringLevel);
};
exports.default = YMPersonalSettings;
//# sourceMappingURL=YMPersonalSettings.js.map