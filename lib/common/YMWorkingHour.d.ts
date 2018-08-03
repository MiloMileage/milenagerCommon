export default class YMWorkingHour {
    dayOfWeek: number;
    startTimeInMinutes: number;
    endTimeInMinutes: number;
    workHourId: string;
    constructor(dayOfWeek: number, startTimeInMinutes: number, endTimeInMinutes: number, workHourId: string);
    static fromObject(obj: any): YMWorkingHour;
}
