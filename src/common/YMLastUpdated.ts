export default class YMLastUpdated {
    driveUpdatedTimestamp: number

    // tslint:disable-next-line:max-line-length
    constructor (driveUpdatedTimestamp: number) {
        this.driveUpdatedTimestamp = driveUpdatedTimestamp
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMLastUpdated(new Date().getTime())
        // tslint:disable-next-line:max-line-length
        return new YMLastUpdated(obj.driveUpdatedTimestamp)
    }
}
