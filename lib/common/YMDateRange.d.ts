import YMDrive from './YMDrive';
export default class YMDateRange {
    startDateYear: number;
    startDateMonth: number;
    startDateDay: number;
    endDateYear: number;
    endDateMonth: number;
    endDateDay: number;
    timezoneOffsetInMinutes: number;
    constructor(startDateYear: number, startDateMonth: number, startDateDay: number, endDateYear: number, endDateMonth: number, endDateDay: number, timezoneOffsetInMinutes: number);
    getStartDateLocal(ignoreDst?: boolean): Date;
    getEndDateLocal(ignoreDst?: boolean): Date;
    isEqualTo(anotherDateRange: YMDateRange): boolean;
    isMonthRange(): boolean;
    addMonth(number?: number): void;
    substructMonth(number?: number): void;
    isInDateRange: (drive: YMDrive) => boolean;
    static monthDateRange(month: number, year: number, timezoneOffsetInMinutes?: number): YMDateRange;
    static fromObject: (obj: any) => YMDateRange;
}
