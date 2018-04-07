export default class YMWorkingHour {
    dayOfWeek: number;
    startTimeInMinutes: Number;
    endTimeInMinutes: Number;
    constructor(dayOfWeek: number, startTimeInMinutes: number, endTimeInMinutes: number);
    static fromObject(obj: any): YMWorkingHour;
}
