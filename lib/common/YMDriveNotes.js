"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMDriveNotes {
    constructor(note, parkingMoney, tollMoney, gasMoney, otherMoney) {
        this.note = note;
        this.parkingMoney = parkingMoney ? Number(parkingMoney) : 0;
        this.tollMoney = tollMoney ? Number(tollMoney) : 0;
        this.gasMoney = gasMoney ? Number(gasMoney) : 0;
        this.otherMoney = otherMoney ? Number(otherMoney) : 0;
    }
    getTotalMoney() {
        return this.parkingMoney + this.tollMoney + this.gasMoney + this.otherMoney;
    }
}
exports.default = YMDriveNotes;
// tslint:disable-next-line:member-ordering
YMDriveNotes.fromObject = function (obj) {
    if (obj == null)
        return new YMDriveNotes('', 0, 0, 0, 0);
    return new YMDriveNotes(obj.note, obj.parkingMoney, obj.tollMoney, obj.gasMoney, obj.otherMoney);
};
//# sourceMappingURL=YMDriveNotes.js.map