import YMReceipt from "./YMReceipt";
import YMMerchant from "./YMMerchant";
import YMUserSettings from "./YMUserSettings";
export default class YMTransaction {
    transactionId: string;
    incomeSourceId?: string;
    expenseCategoryId?: string;
    year: number;
    month: number;
    date: number;
    amount: number;
    notes: string;
    receipts: Array<YMReceipt>;
    merchant: YMMerchant;
    constructor(transactionId: string, incomeSourceId: string, expenseCategoryId: string, year: number, month: number, date: number, amount: number, notes: string, receipts: Array<YMReceipt>, merchant: YMMerchant);
    getTime(): Date;
    isExpense(): boolean;
    isIncome(): boolean;
    getIncomeSourceName(userSettings: YMUserSettings): string;
    getReceiptImageUrl(): string;
    getIncomeExpenseCategory(userSettings: YMUserSettings): string;
    static fromObject: (obj: any) => YMTransaction;
}
