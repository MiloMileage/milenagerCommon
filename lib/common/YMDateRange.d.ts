import YMDrive from './YMDrive';
export default class YMDateRange {
    startDateYear: number;
    startDateMonth: number;
    startDateDay: number;
    endDateYear: number;
    endDateMonth: number;
    endDateDay: number;
    timezoneOffsetInMinutes: number;
    timezoneOffsetInMinutesEnd: number;
    constructor(startDateYear: number, startDateMonth: number, startDateDay: number, endDateYear: number, endDateMonth: number, endDateDay: number, timezoneOffsetInMinutes: number, timezoneOffsetInMinutesEnd: number);
    getStartDateLocal(ignoreDst?: boolean): Date;
    getEndDateLocal(ignoreDst?: boolean): Date;
    isEqualTo(anotherDateRange: YMDateRange): boolean;
    isMonthRange(): boolean;
    addMonth(number?: number): void;
    substructMonth(number?: number): void;
    isInDateRange: (drive: YMDrive) => boolean;
    static monthDateRange(month: number, year: number): YMDateRange;
    static fromStartAndEndDates(startDate: Date, endDate: Date): YMDateRange;
    static fromObject: (obj: any) => YMDateRange;
}
