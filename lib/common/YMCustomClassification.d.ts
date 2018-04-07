export default class YMCustomClassification {
    purposeId: string;
    startTimestampUtc: number;
    endTimestampUtc: number;
    constructor(purposeId?: string, startTimestampUtc?: number, endTimestampUtc?: number);
    static fromObject: (obj: any) => YMCustomClassification;
}
