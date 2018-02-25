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
        if(obj == null) return new YMWorkingHour(0, 0, 0)

        return new YMWorkingHour(obj.dayOfWeek, obj.startTimeInMinutes, obj.endTimeInMinutes)
    }
}