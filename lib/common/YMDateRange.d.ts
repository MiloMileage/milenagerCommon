export default class YMDateRange {
    startDateYear: number;
    startDateMonth: number;
    startDateDay: number;
    endDateYear: number;
    endDateMonth: number;
    endDateDay: number;
    timezoneOffsetInMinutes: number;
    constructor(startDateYear: number, startDateMonth: number, startDateDay: number, endDateYear: number, endDateMonth: number, endDateDay: number, timezoneOffsetInMinutes: number);
    getStartDateLocal(): Date;
    getEndDateLocal(): Date;
    isEqualTo(anotherDateRange: YMDateRange): boolean;
    isMonthRange(): boolean;
    addMonth(number?: number): void;
    static monthDateRange(month: number, year: number, timezoneOffsetInMinutes: number): YMDateRange;
    static fromObject: (obj: any) => YMDateRange;
}
