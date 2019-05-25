"use strict";
exports.__esModule = true;
var YMLocation_1 = require("./YMLocation");
var common_1 = require("../store/common");
var YMSavedLocation = /** @class */ (function () {
    // tslint:disable-next-line:max-line-length
    function YMSavedLocation(name, location, purposeId, key, isDeleted) {
        if (key === void 0) { key = undefined; }
        if (isDeleted === void 0) { isDeleted = false; }
        this.name = name;
        this.location = YMLocation_1["default"].fromObject(location);
        this.purposeId = purposeId;
        this.key = key === undefined ? common_1["default"].getUniqueDriveId() : key;
        this.isDeleted = isDeleted === undefined ? false : isDeleted;
    }
    // tslint:disable-next-line:member-ordering
    YMSavedLocation.fromObject = function (obj) {
        if (obj == null)
            return new YMSavedLocation('', YMLocation_1["default"].fromObject(undefined), '');
        // tslint:disable-next-line:max-line-length
        return new YMSavedLocation(obj.name, obj.location, obj.purposeId, obj.key, obj.isDeleted);
    };
    return YMSavedLocation;
}());
exports["default"] = YMSavedLocation;
