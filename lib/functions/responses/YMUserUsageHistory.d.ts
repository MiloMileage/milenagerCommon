export default class YMUserUsageHistory {
    didHaveSubscription: boolean;
    firstDriveDate: Date;
    subscriptionEndTime: Date;
    constructor(didHaveSubscription: boolean, firstDriveDate: Date, subscriptionEndTime: Date);
    monthsToPayFor(): number;
    static fromObject: (obj: any) => YMUserUsageHistory;
}
