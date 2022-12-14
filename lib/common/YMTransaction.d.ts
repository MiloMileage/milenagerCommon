import YMReceipt from "./YMReceipt";
import YMMerchant from "./YMMerchant";
import YMUserSettings from "./YMUserSettings";
export default class YMTransaction {
    transactionId: string;
    incomeSourceId?: string;
    expenseCategoryId?: string;
    date: string;
    amount: number;
    notes: string;
    receipts: Array<YMReceipt>;
    merchant: YMMerchant;
    isDeleted: boolean;
    constructor(transactionId: string, incomeSourceId: string, expenseCategoryId: string, date: string, amount: number, notes: string, receipts: Array<YMReceipt>, merchant: YMMerchant, isDeleted: boolean);
    isExpense(): boolean;
    isIncome(): boolean;
    getIncomeSourceName(userSettings: YMUserSettings): string;
    getReceiptImageUrl(): string;
    getIncomeExpenseCategory(userSettings: YMUserSettings): string;
    getTime(): Date;
    static fromDateString: (dateStr: string) => Date;
    static toDateString: (date: Date) => string;
    static fromObject: (obj: any) => YMTransaction;
}
