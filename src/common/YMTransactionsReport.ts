import YMDateRange from './YMDateRange'
import YMUserSettings from './YMUserSettings'
import YMGlobalUserSettings from './YMGlobalUserSettings'
import { milesToMetric, roundNumber } from '../components/common'
import * as Moment from 'moment'
import YMTransactionsReportLine from './YMTransactionsReportLine'
import YMTransaction from './YMTransaction'
import YMExpenseCategory from './YMExpenseCategory'
import YMIncomeSorce from './YMIncomeSource'

export default class YMTransactionsReport {
    reportName: string
    dateCreated: Date
    name: string
    project: string
    customerDetails: string
    details: string
    userSettings: YMUserSettings
    globalSettings: YMGlobalUserSettings
    dateRange: YMDateRange
    lines: Array<YMTransactionsReportLine>
    expenseByCategory: {[categoryName: string]: number}
    incomeBySource: {[incomeSource: string]: number}
    reportId: string
    csvLink: string
    pdfLink: string
    moneySymbol: string
    
    constructor (reportName: string,
            dateCreated: Date,
            name: string,
            project: string,
            customerDetails: string,
            details: string,
            userSettings: YMUserSettings,
            globalSettings: YMGlobalUserSettings,
            dateRange: YMDateRange,
            lines: Array<YMTransactionsReportLine>,
            expenseByCategory: {[categoryName: string]: number},
            incomeBySource: {[incomeSource: string]: number},
            reportId: string,
            csvLink: string,
            pdfLink: string,
            moneySymbol: string) {
        this.reportName = reportName
        this.dateCreated = dateCreated
        this.name = name
        this.project = project
        this.customerDetails = customerDetails
        this.details = details
        this.userSettings = YMUserSettings.fromObject(userSettings)
        this.globalSettings = YMGlobalUserSettings.fromObject(globalSettings)
        this.dateRange = YMDateRange.fromObject(dateRange)
        this.lines = lines.map(line => YMTransactionsReportLine.fromObject(line))
        this.expenseByCategory = expenseByCategory
        this.incomeBySource = incomeBySource
        this.reportId = reportId
        this.csvLink = csvLink
        this.pdfLink = pdfLink
        this.moneySymbol = moneySymbol ? moneySymbol : '$'
    }

    addTransactionValue(transaction: YMTransaction) {
        this.lines.push(YMTransactionsReportLine.fromTransaction(transaction, this.userSettings, this.globalSettings))
        
        if (transaction.isExpense()) {
            const categoryName = YMExpenseCategory.getNameOrDefault(transaction.expenseCategoryId, 'n/a', this.userSettings, this.globalSettings, false)
            if (categoryName in this.expenseByCategory) {
                this.expenseByCategory[categoryName] += transaction.amount
            } else {
                this.expenseByCategory[categoryName] = transaction.amount
            }
        } else {
            const incomeSource = YMIncomeSorce.getNameOrDefault(transaction.incomeSourceId, 'n/a', this.userSettings, this.globalSettings, false)
            if (incomeSource in this.incomeBySource) {
                this.incomeBySource[incomeSource] += transaction.amount
            } else {
                this.incomeBySource[incomeSource] = transaction.amount
            }
        }
    }

    formatMoney(amount: number, symbol: string, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
          let amountStr = `${amount}`
          let _decimalCount = Math.abs(decimalCount);
          _decimalCount = isNaN(_decimalCount) ? 2 : _decimalCount;
      
          const negativeSign = Number(amountStr) < 0 ? "-" : "";
      
          const i = parseInt(amountStr = Math.abs(Number(amountStr) || 0).toFixed(_decimalCount)).toString();
          const j = (i.length > 3) ? i.length % 3 : 0;
      
          return symbol + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, symbol + "1" + thousands) + (_decimalCount ? decimal + Math.abs(Number(amountStr) - Number(i)).toFixed(_decimalCount).slice(2) : "");
        } catch (e) {
          console.log(e)
          return symbol + "0.00"
        }
      };

    getExpensesAmount() {
        return Object.values(this.expenseByCategory).reduce((total, num) => total + num, 0)
    }

    getIncomeAmount() {
        return Object.values(this.incomeBySource).reduce((total, num) => total + num, 0)
    }

    getCsvData() {
        let data: string = ''
        data += '****,****,****,****,****,****,****,****,****,****\n'
        data += 'This,report,was,generated,by,ThisIsMilo.com\n'
        data += '****,****,****,****,****,****,****,****,****,****\n'
        data += '\n'
        data += '\n'

        data += 'Name,'
        data += 'Project,'
        data += 'Customer,'
        data += 'Details,'

        data += '\n'

        data += `${this.name},${this.project},${this.customerDetails},`
        
        data += `${this.details}`

        data += '\n'
        data += '\n'

        data += 'Businesses'
        data += '\n'

        data += `Name,Income`
        Object.keys(this.incomeBySource).map(businessNAme => {
            data += '\n'
            data += `${businessNAme}, ${this.incomeBySource[businessNAme]}`
        })

        data += '\n'
        data += '\n'

        data += 'Expenses'
        data += '\n'

        data += `Category,Expense`
        Object.keys(this.expenseByCategory).map(category => {
            data += '\n'
            data += `${category}, ${this.expenseByCategory[category]}`
        })

        data += '\n'
        data += '\n'

        data += 'Income Log'
        
        data += '\n'

        data += '#,'
        data += 'When,'
        data += 'Business,'
        data += `Note,`
        data += `Amount,`
        data += `Receipt,`

        data += '\n'

        this.lines.forEach((dl, index) => {
            data += `${index + 1},`
            data += `${Moment.utc(dl.when.getTime()).format('MMMM Do YYYY')},`
            data += `${dl.incomeSource},`
            data += `${dl.note},`
            data += `${dl.amount},`
            data += `${dl.receiptImageUrl},`
            data += '\n'
        })

        data += `,`
        data += `,`
        data += `,`
        data += `Total,`
        data += `${this.getIncomeAmount()},`
        data += `,`

        data += '\n'
        data += '\n'

        data += 'Expense Log'
        
        data += '\n'

        data += '#,'
        data += 'When,'
        data += 'Expense Category,'
        data += 'Merchant,'
        data += `Note,`
        data += `Amount,`
        data += `Receipt,`

        data += '\n'

        this.lines.forEach((dl, index) => {
            data += `${index + 1},`
            data += `${Moment.utc(dl.when.getTime()).format('MMMM Do YYYY')},`
            data += `${dl.expenseCategory},`
            data += `${dl.merchantName},`
            data += `${dl.note},`
            data += `${dl.amount},`
            data += `${dl.receiptImageUrl},`
            data += '\n'
        })

        data += `,`
        data += `,`
        data += `,`
        data += `Total,`
        data += `${this.getExpensesAmount()},`
        data += `,`
        
        data += '\n'
        data += '\n'

        data += '****,****,****,****,****,****,****,****,****,****\n'
        data += 'This,report,was,generated,by,ThisIsMilo.com\n'
        data += '****,****,****,****,****,****,****,****,****,****\n'

        return data
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMTransactionsReport('', new Date(), '', '', '', '', YMUserSettings.fromObject(undefined), YMGlobalUserSettings.fromObject(undefined), YMDateRange.monthDateRange(new Date().getMonth(), new Date().getFullYear()), [], {}, {}, '', '', '', '$')
        
        return new YMTransactionsReport(
            obj.reportName,
            new Date(obj.dateCreated),
            obj.name,
            obj.project,
            obj.customerDetails,
            obj.details,
            obj.userSettings,
            obj.globalSettings,
            obj.dateRange,
            obj.lines,
            obj.expenseByCategory,
            obj.incomeBySource,
            obj.reportId,
            obj.csvLink,
            obj.pdfLink,
            obj.moneySymbol)
    }
}
