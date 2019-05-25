"use strict";
exports.__esModule = true;
var YMDriveNotes = /** @class */ (function () {
    function YMDriveNotes(note, parkingMoney, tollMoney) {
        if (note === void 0) { note = ''; }
        if (parkingMoney === void 0) { parkingMoney = 0; }
        if (tollMoney === void 0) { tollMoney = 0; }
        this.note = note;
        this.parkingMoney = Number(parkingMoney);
        this.tollMoney = Number(tollMoney);
    }
    // tslint:disable-next-line:member-ordering
    YMDriveNotes.fromObject = function (obj) {
        if (obj == null)
            return new YMDriveNotes('', 0, 0);
        return new YMDriveNotes(obj.note, obj.parkingMoney, obj.tollMoney);
    };
    return YMDriveNotes;
}());
exports["default"] = YMDriveNotes;
