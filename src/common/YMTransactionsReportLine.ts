import YMUserSettings from './YMUserSettings'
import YMGlobalUserSettings from './YMGlobalUserSettings'
import YMTransaction from './YMTransaction'
import YMExpenseCategory from './YMExpenseCategory'
import YMIncomeSorce from './YMIncomeSource'

export default class YMTransactionsReportLine {
    when: Date
    amount: number
    note: string
    isExpense: boolean
    merchantName: string
    expenseCategory: string
    incomeSource: string
    receiptImageUrl: string
    
    constructor (when: Date,
            amount: number,
            note: string,
            isExpense: boolean,
            merchantName: string,
            expenseCategory: string,
            incomeSource: string,
            receiptImageUrl: string) {
        this.when = when
        this.amount = amount
        this.note = note
        this.isExpense = isExpense
        this.merchantName = merchantName
        this.expenseCategory = expenseCategory
        this.incomeSource = incomeSource
        this.receiptImageUrl = receiptImageUrl
    }

    static fromTransaction(transaction: YMTransaction, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings) {
        return new YMTransactionsReportLine(
                transaction.getTime(),
                transaction.amount,
                transaction.notes,
                transaction.isExpense(),
                transaction.merchant.name,
                YMExpenseCategory.getNameOrDefault(transaction.expenseCategoryId, 'n/a', userSettings, globalSettings, false),
                YMIncomeSorce.getNameOrDefault(transaction.incomeSourceId, 'n/a', userSettings, globalSettings, false),
                transaction.receipts.length > 0 ? transaction.receipts[0].imageUrl : '')
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMTransactionsReportLine(new Date(), 0, '', true, '', '', '', '')
        
        return new YMTransactionsReportLine(obj.when, obj.amount, obj.note, obj.isExpense, obj.merchantName, obj.expenseCategory, obj.incomeSource, obj.receiptImageUrl)
    }
}
