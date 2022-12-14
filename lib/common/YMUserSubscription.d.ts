import YMCompanySubscription from './YMCompanySubscription';
export declare enum YMSubscriptionStatus {
    NONE = "NONE",
    ACTIVE = "ACTIVE",
    CANCELED = "CANCELED",
    GRACE_PERIOD = "GRACE_PERIOD"
}
export default class YMUserSubscription {
    status: YMSubscriptionStatus;
    subscriptionType: string;
    promoCode: string;
    expiresAt: Date;
    apple_original_transaction_id: string;
    google_original_purchase_token: string;
    stripe_subscription_id: string;
    constructor(subscriptionType: string, status: YMSubscriptionStatus, promoCode: string, expiresAt: Date, apple_original_transaction_id: string, google_original_purchase_token: string, stripe_subscription_id: string);
    isUnderSubscription(companySubscription: YMCompanySubscription): boolean;
    isCanceledAndUnderSubscription(companySubscription: YMCompanySubscription): boolean;
    daysTillExpire(): number;
    isDummy(): boolean;
    static createDummyUserSubscription(): YMUserSubscription;
    static fromObject: (obj: any) => YMUserSubscription;
}
