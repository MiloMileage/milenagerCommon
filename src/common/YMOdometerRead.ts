export default class YMOdometerRead {
    year: number
    read: number

    constructor (year = new Date().getFullYear(), read = 0) {
        this.year = year
        this.read = read
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMOdometerRead(0, 0)

        return new YMOdometerRead(obj.year, obj.read)
    }
}