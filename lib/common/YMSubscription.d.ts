import { AppleReceiptResponse } from './YMAppleReceiptResponse';
export default class YMSubscription {
    subscriptionType: string;
    isSetToRenew: boolean;
    renewalDate: Date;
    latestPaidDate: Date;
    receipt: any;
    isIos: boolean;
    userId: string;
    constructor(subscriptionType: string, isSetToRenew: boolean, renewalDate: Date, latestPaidDate: Date, receipt: any, isIos: boolean, userId: string);
    isUnderSubscription(): boolean;
    isNone(): boolean;
    isAnnual(): boolean;
    isMonthly(): boolean;
    isDummy(): boolean;
    static fromIosReceipt: (obj: any, userId: string) => YMSubscription;
    static getLatestPaidDate(appleReceipt: AppleReceiptResponse): any;
    static createDummySubscription(userId: string): YMSubscription;
    static subscriptionsTypes: {
        none: string;
        annual: string;
        monthly: string;
    };
}
