import YMReceipt from "./YMReceipt"
import YMMerchant from "./YMMerchant"
import YMUserSettings from "./YMUserSettings"

export default class YMTransaction {
    transactionId: string
    incomeSourceId?: string // if this is an expense (has expense category id), if has income source it indicates this is a business expense
    expenseCategoryId?: string
    time: Date
    amount: number // always positive number. If has expenseCategoryId this is an expense
    notes: string
    receipts: Array<YMReceipt>
    merchant: YMMerchant

    constructor (transactionId: string,
                    incomeSourceId: string,
                    expenseCategoryId: string,
                    time: Date,
                    amount: number,
                    notes: string,
                    receipts: Array<YMReceipt>,
                    merchant: YMMerchant) {
        this.transactionId = transactionId
        this.incomeSourceId = incomeSourceId
        this.expenseCategoryId = expenseCategoryId
        this.time = time
        this.amount = amount
        this.notes = notes
        this.receipts = receipts.map(x => YMReceipt.fromObject(x))
        this.merchant = YMMerchant.fromObject(merchant)
    }

    isExpense() {
        return this.expenseCategoryId != null
    }

    isIncome() {
        return !this.isExpense()
    }

    getIncomeSourceName(userSettings: YMUserSettings) {
        const incomeSource = userSettings.incomeSources.filter(x => x.incomeSourceId === this.incomeSourceId)[0]

        return incomeSource ? incomeSource.name : '' 
    }

    getReceiptImageUrl() {
        return this.receipts ? this.receipts.length > 0 ? this.receipts[0].imageUrl : '' : ''
    }

    getIncomeExpenseCategory(userSettings: YMUserSettings) {
        const expenseCategory = userSettings.expenseCategories.filter(x => x.expenseCategoryId === this.expenseCategoryId)[0]

        return expenseCategory ? expenseCategory.name : '' 
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMTransaction('', '', '', new Date(), 0, '', [], undefined)

        return new YMTransaction(obj.transactionId, obj.incomeSourceId, obj.expenseCategoryId, obj.time, obj.amount, obj.notes, obj.receipts, obj.merchant)
    }
}