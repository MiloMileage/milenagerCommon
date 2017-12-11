export default class YMRateIRS {
    business: number
    charity: number
    moving: number
    medical: number

    constructor (business: number, charity: number, moving: number, medical: number) {
        this.business = business
        this.charity = charity
        this.moving = moving
        this.medical = medical
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        // tslint:disable-next-line:max-line-length
        return new YMRateIRS(obj.business, obj.charity, obj.moving, obj.medical)
    }

    // tslint:disable-next-line:member-ordering
    static createYearRate = function(year: string, obj: any) {
        return new YMRateIRS(obj['rateBusiness_' + year], obj['rateCharity_' + year], obj['rateMoving_' + year], obj['rateMedical_' + year])
    }

    // tslint:disable-next-line:member-ordering
    static getPurposeArray = function() {
        return ['Business', 'Charity', 'Moving', 'Medical']
    }
}