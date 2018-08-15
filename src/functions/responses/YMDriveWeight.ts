export default class YMDriveWeight {
    drivesPurposeId: string
    earned: number
    potential: number
    loggedMiles: number
    totalMiles: number
    parkingMoney: number
    tollMoney: number
    driveId: string

    constructor (
        drivesPurposeId: string,
        earned: number,
        potential: number,
        loggedMiles: number,
        totalMiles: number,
        parkingMoney: number,
        tollsMoney: number,
        driveId: string) {
        this.drivesPurposeId = drivesPurposeId
        this.earned = earned
        this.potential = potential
        this.loggedMiles = loggedMiles
        this.totalMiles = totalMiles
        this.parkingMoney = parkingMoney
        this.tollMoney = tollsMoney
        this.driveId = driveId
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMDriveWeight('-1', 0, 0, 0, 0, 0, 0, '')

        return new YMDriveWeight(obj.drivesPurposeId, obj.earned, obj.potential, obj.loggedMiles, obj.totalMiles, obj.parkingMoney, obj.tollMoney, obj.driveId)
    }
}