import YMUserSettings from './YMUserSettings';
import YMGlobalUserSettings from './YMGlobalUserSettings';
import YMTransaction from './YMTransaction';
export default class YMTransactionsReportLine {
    when: Date;
    amount: number;
    note: string;
    isExpense: boolean;
    merchantName: string;
    expenseCategory: string;
    incomeSource: string;
    receiptImageUrl: string;
    isBusiness: boolean;
    constructor(when: Date, amount: number, note: string, isExpense: boolean, merchantName: string, expenseCategory: string, incomeSource: string, receiptImageUrl: string, isBusiness: boolean);
    static fromTransaction(transaction: YMTransaction, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings): YMTransactionsReportLine;
    static fromObject: (obj: any) => YMTransactionsReportLine;
}
