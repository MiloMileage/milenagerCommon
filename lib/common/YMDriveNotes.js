"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMDriveNotes {
    constructor(note, parkingMoney, tollMoney) {
        this.note = note;
        this.parkingMoney = parkingMoney ? Number(parkingMoney) : 0;
        this.tollMoney = tollMoney ? Number(tollMoney) : 0;
    }
    getTotalMoney() {
        return this.parkingMoney + this.tollMoney;
    }
}
exports.default = YMDriveNotes;
// tslint:disable-next-line:member-ordering
YMDriveNotes.fromObject = function (obj) {
    if (obj == null)
        return new YMDriveNotes('', 0, 0);
    return new YMDriveNotes(obj.note, obj.parkingMoney, obj.tollMoney);
};
//# sourceMappingURL=YMDriveNotes.js.map