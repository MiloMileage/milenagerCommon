import { AppleReceiptResponse } from './YMAppleReceiptResponse';
export default class YMSubscription {
    subscriptionType: string;
    isActive: boolean;
    renewalDate: Date;
    latestPaidDate: Date;
    receipt: any;
    isIos: boolean;
    constructor(subscriptionType: string, isActive: boolean, renewalDate: Date, latestPaidDate: Date, receipt: any, isIos: boolean);
    isNone(): boolean;
    isAnnual(): boolean;
    isMonthly(): boolean;
    static fromIosReceipt: (obj: any) => YMSubscription;
    static getLatestPaidDate(appleReceipt: AppleReceiptResponse): any;
    static subscriptionsTypes: {
        none: string;
        annual: string;
        monthly: string;
    };
}
