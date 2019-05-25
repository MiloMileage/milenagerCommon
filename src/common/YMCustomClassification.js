"use strict";
exports.__esModule = true;
var YMCustomClassification = /** @class */ (function () {
    function YMCustomClassification(purposeId, startTimestampUtc, endTimestampUtc) {
        if (purposeId === void 0) { purposeId = 'id'; }
        if (startTimestampUtc === void 0) { startTimestampUtc = 0; }
        if (endTimestampUtc === void 0) { endTimestampUtc = 0; }
        this.purposeId = purposeId;
        this.startTimestampUtc = startTimestampUtc;
        this.endTimestampUtc = endTimestampUtc;
    }
    // tslint:disable-next-line:member-ordering
    YMCustomClassification.fromObject = function (obj) {
        if (obj == null)
            return new YMCustomClassification('', 0, 0);
        return new YMCustomClassification(obj.purposeId, obj.startTimestampUtc, obj.endTimestampUtc);
    };
    return YMCustomClassification;
}());
exports["default"] = YMCustomClassification;
