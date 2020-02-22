export default class YMUserUsageHistory {
    didHaveSubscription: boolean;
    firstDriveDate: Date;
    subscriptionEndTime: Date;
    numberOfTrialDays: number;
    constructor(didHaveSubscription: boolean, firstDriveDate: Date, subscriptionEndTime: Date, numberOfTrialDays: number);
    trialDaysRemaining(): number;
    isInTrial(): boolean;
    monthsToPayFor(): number;
    static fromObject: (obj: any) => YMUserUsageHistory;
}
