export default class YMLastUpdated {
    driveUpdatedTimestamp: number;
    constructor(driveUpdatedTimestamp: number);
    static fromObject: (obj: any) => YMLastUpdated;
}
