"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMDriveNotes {
    constructor(note = 'note', parkingMoney = 32.3, tollMoney = 23.2) {
        this.note = note;
        this.parkingMoney = parkingMoney;
        this.tollMoney = tollMoney;
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