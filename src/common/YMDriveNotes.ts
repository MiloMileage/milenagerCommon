export default class YMDriveNotes {
    note: string
    parkingMoney: number
    tollMoney: number

    constructor (note: string, parkingMoney: number, tollMoney: number) {
        this.note = note
        this.parkingMoney = parkingMoney ? Number(parkingMoney) : 0
        this.tollMoney = tollMoney ? Number(tollMoney) : 0
    }

    getTotalMoney() {
        return this.parkingMoney + this.tollMoney
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMDriveNotes('', 0, 0)

        return new YMDriveNotes(obj.note, obj.parkingMoney, obj.tollMoney)
    }
}