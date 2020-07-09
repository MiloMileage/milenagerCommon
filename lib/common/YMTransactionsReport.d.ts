import YMDateRange from './YMDateRange';
import YMUserSettings from './YMUserSettings';
import YMGlobalUserSettings from './YMGlobalUserSettings';
import YMTransactionsReportLine from './YMTransactionsReportLine';
import YMTransaction from './YMTransaction';
export default class YMTransactionsReport {
    reportName: string;
    dateCreated: Date;
    name: string;
    project: string;
    customerDetails: string;
    details: string;
    userSettings: YMUserSettings;
    globalSettings: YMGlobalUserSettings;
    dateRange: YMDateRange;
    lines: Array<YMTransactionsReportLine>;
    expenseByCategory: {
        [categoryName: string]: number;
    };
    incomeBySource: {
        [incomeSource: string]: number;
    };
    reportId: string;
    csvLink: string;
    pdfLink: string;
    moneySymbol: string;
    constructor(reportName: string, dateCreated: Date, name: string, project: string, customerDetails: string, details: string, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings, dateRange: YMDateRange, lines: Array<YMTransactionsReportLine>, expenseByCategory: {
        [categoryName: string]: number;
    }, incomeBySource: {
        [incomeSource: string]: number;
    }, reportId: string, csvLink: string, pdfLink: string, moneySymbol: string);
    addTransactionValue(transaction: YMTransaction): void;
    formatMoney(amount: number, symbol: string, decimalCount?: number, decimal?: string, thousands?: string): string;
    getExpensesAmount(): number;
    getIncomeAmount(): number;
    getCsvData(): string;
    static fromObject: (obj: any) => YMTransactionsReport;
}
