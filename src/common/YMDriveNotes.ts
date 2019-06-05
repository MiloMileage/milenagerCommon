export default class YMDriveNotes {
    note: string
    parkingMoney: number
    tollMoney: number

    constructor (note: string, parkingMoney: number, tollMoney: number) {
        this.note = note
        this.parkingMoney = Number(parkingMoney)
        this.tollMoney = Number(tollMoney)
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMDriveNotes('', 0, 0)

        return new YMDriveNotes(obj.note, obj.parkingMoney, obj.tollMoney)
    }
}