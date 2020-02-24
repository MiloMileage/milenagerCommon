import { AppleReceiptResponse } from './YMAppleReceiptResponse';
export default class YMSubscription {
    subscriptionType: string;
    isSetToRenew: boolean;
    renewalDate: Date;
    latestPaidDate: Date;
    receipt: any;
    isIos: boolean;
    userId: string;
    originalTransactionId: string;
    constructor(subscriptionType: string, isSetToRenew: boolean, renewalDate: Date, latestPaidDate: Date, receipt: any, isIos: boolean, userId: string, originalTransactionId: string);
    isUnderSubscription(): boolean;
    isNone(): boolean;
    isAnnual(): boolean;
    isMonthly(): boolean;
    isDummy(): boolean;
    static getLatestPaidDate(appleReceipt: AppleReceiptResponse): Date;
    static createDummySubscription(userId: string): YMSubscription;
    static subscriptionsTypes: {
        none: string;
        annual: string;
        monthly: string;
    };
}
