export default class YMDriveNotes {
    note: string
    parkingMoney: number
    tollMoney: number

    constructor (note = 'note', parkingMoney = 32.3, tollMoney = 23.2) {
        this.note = note
        this.parkingMoney = parkingMoney
        this.tollMoney = tollMoney
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        // tslint:disable-next-line:max-line-length
        return new YMDriveNotes(obj.note, obj.parkingMoney, obj.tollMoney)
    }
}