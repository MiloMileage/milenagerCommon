"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMDriveNotes {
    constructor(note, parkingMoney, tollMoney) {
        this.note = note;
        this.parkingMoney = Number(parkingMoney);
        this.tollMoney = Number(tollMoney);
    }
}
// tslint:disable-next-line:member-ordering
YMDriveNotes.fromObject = function (obj) {
    if (obj == null)
        return new YMDriveNotes('', 0, 0);
    return new YMDriveNotes(obj.note, obj.parkingMoney, obj.tollMoney);
};
exports.default = YMDriveNotes;
//# sourceMappingURL=YMDriveNotes.js.map