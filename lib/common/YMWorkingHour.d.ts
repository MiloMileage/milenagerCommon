export default class YMWorkingHour {
    dayOfWeek: number;
    startTimeInMinutes: number;
    endTimeInMinutes: number;
    constructor(dayOfWeek: number, startTimeInMinutes: number, endTimeInMinutes: number);
    static fromObject(obj: any): YMWorkingHour;
}
