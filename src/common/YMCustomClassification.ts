export default class YMCustomClassification {
    purposeId: string
    startTimestampUtc: number
    endTimestampUtc: number

    constructor (purposeId = 'id', startTimestampUtc = 0, endTimestampUtc = 0) {
        this.purposeId = purposeId
        this.startTimestampUtc = startTimestampUtc
        this.endTimestampUtc = endTimestampUtc
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        return new YMCustomClassification(obj.purposeId, obj.startTimestampUtc, obj.endTimestampUtc)
    }
}