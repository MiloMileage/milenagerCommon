export default class YMWorkingHour {
    dayOfWeek: number
    startTimeInMinutes: Number
    endTimeInMinutes: Number

    constructor (dayOfWeek: number, startTimeInMinutes: number, endTimeInMinutes: number) {
        this.dayOfWeek = dayOfWeek
        this.startTimeInMinutes = startTimeInMinutes
        this.endTimeInMinutes = endTimeInMinutes
    }

    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        return new YMWorkingHour(obj.dayOfWeek, obj.startTimeInMinutes, obj.endTimeInMinutes)
    }
}