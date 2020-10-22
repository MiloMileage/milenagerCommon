export declare enum YMCompanySubscriptionStatus {
    TRIAL = "TRIAL",
    ACTIVE = "ACTIVE",
    CANCELED = "CANCELED"
}
export declare enum YMCompanySubscriptionType {
    NONE = "NONE",
    MONTHLY = "MONTHLY"
}
export default class YMCompanySubscription {
    status: YMCompanySubscriptionStatus;
    subscriptionType: YMCompanySubscriptionType;
    expiresAt: Date;
    stripe_transaction_id: string;
    constructor(status: YMCompanySubscriptionStatus, subscriptionType: YMCompanySubscriptionType, expiresAt: Date, stripe_transaction_id: string);
    isUnderSubscription(): boolean;
    isCanceledAndUnderSubscription(): boolean;
    daysTillExpire(): number;
    isTrial(): boolean;
    static createTrialSubscription(days: number): YMCompanySubscription;
    static fromObject: (obj: any) => YMCompanySubscription;
}
