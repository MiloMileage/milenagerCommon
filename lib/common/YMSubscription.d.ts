import { AppleReceiptResponse } from './YMAppleReceiptResponse';
export default class YMSubscription {
    subscriptionType: string;
    isSetToRenew: boolean;
    renewalDate: Date;
    latestPaidDate: Date;
    receipt: any;
    isIos: boolean;
    constructor(subscriptionType: string, isSetToRenew: boolean, renewalDate: Date, latestPaidDate: Date, receipt: any, isIos: boolean);
    isUnderSubscription(): boolean;
    isNone(): boolean;
    isAnnual(): boolean;
    isMonthly(): boolean;
    isDummy(): boolean;
    static fromIosReceipt: (obj: any) => YMSubscription;
    static getLatestPaidDate(appleReceipt: AppleReceiptResponse): any;
    static createDummySubscription(): YMSubscription;
    static subscriptionsTypes: {
        none: string;
        annual: string;
        monthly: string;
    };
}
