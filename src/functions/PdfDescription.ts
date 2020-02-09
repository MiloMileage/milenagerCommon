import PdfObject from './PdfObject'
import PdfText from './PdfText'
import PdfTable from './PdfTable'
import PdfTableSub from './PdfTableSub'
import PdfLayout from './PdfLayout'
import YMReport from './../common/YMReport'
import YMReportVehicleLine from './../common/YMReportVehicleLine'
import YMReportLine from './../common/YMReportLine'
import YMDateRange from './../common/YMDateRange'
import * as Moment from 'moment'
import { milesToMetric, metricToMiles, roundNumber } from './../components/common'

export default class PdfDescription {
    pageOrientation: string
    pageMargins: Array<number>
    content: Array<PdfObject>
    footer: (currentPage: number, pageCount: number) => PdfText
    header: (currentPage: number, pageCount: number) => PdfText
    styles: any

    constructor (pageOrientation: string,
        pageMargins: Array<number>,
        content: Array<PdfObject>,
        footer: (currentPage: number, pageCount: number) => PdfText,
        header: (currentPage: number, pageCount: number) => PdfText) {
        this.pageOrientation = pageOrientation
        this.pageMargins = pageMargins
        this.footer = footer
        this.header = header
        this.content = content
        this.styles = {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            }
        }
    }

    static onFooter = (currentPage: number, pageCount: number) => {
        return new PdfText('', [], '', false, false, '', 10)
    }

    static onHeader = (currentPage: number, pageCount: number) => {
        return new PdfText('', [], '', false, false, '', 10)
    }

    static fromObject = function(obj: any) {
        if(obj == null) return new PdfDescription('', [], [], PdfDescription.onFooter, PdfDescription.onHeader)

        return new PdfDescription(obj.pageOrientation, obj.pageMargins, obj.content, obj.footer, obj.header)
    }

    static getFooterFunc = (name: string, project: string, customerDetails: string) => {
        return (currentPage: number, pageCount: number) => {
            return new PdfText(
                `(${currentPage} of ${pageCount})         Created using ThisIsMilo.com for ${name}, ${project}, ${customerDetails}      Submitted By: ______________________     Date: ______________________     Approved: ______________________`,
                [30, 10, 0, 10],
                undefined,
                false,
                false,
                'black',
                10,
                'left'
                )
        }
    }

    static getHeaderFunc = (name: string, dateRanage: YMDateRange) => {
        return (currentPage: number, pageCount: number) => {
            return new PdfText(
                `Mileage Report (${Moment.utc(new Date(dateRanage.getStartDateLocal())).format('MMMM Do YYYY')} to ${Moment.utc(new Date(dateRanage.getEndDateLocal())).format('MMMM Do YYYY')}) - ${name}`,
                [30, 8, 30, 30],
                'header',
                false,
                true,
                'black',
                undefined,
                'left'
                )
        }
    }

    static fromReport = function(report: YMReport) {
        const pd = PdfDescription.fromObject(undefined)

        pd.pageOrientation = 'landscape'
        pd.pageMargins = [30, 30, 30, 30]
        pd.footer = PdfDescription.getFooterFunc(report.name, report.project, report.customerDetails)
        pd.header = PdfDescription.getHeaderFunc(report.name, report.dateRange)
        pd.content = new Array<PdfObject>()

        // Add customer details table
        const customerDetailsTableSub = new PdfTableSub(['*', '*', '*', '*', '*', '*', '*', '*'], new Array<Array<PdfObject>>())
        customerDetailsTableSub.body.push([
            PdfTableSub.getHeaderTableCell('Name'),
            PdfTableSub.getHeaderTableCell('Project'),
            PdfTableSub.getHeaderTableCell('Customer'),
            PdfTableSub.getHeaderTableCell('Business Rate'),
            PdfTableSub.getHeaderTableCell('Charity Rate'),
            PdfTableSub.getHeaderTableCell('Moving Rate'),
            PdfTableSub.getHeaderTableCell('Medical Rate'),
            PdfTableSub.getHeaderTableCell('Details'),
        ])
        customerDetailsTableSub.body.push([
            PdfTableSub.getTableCell(report.name),
            PdfTableSub.getTableCell(report.project),
            PdfTableSub.getTableCell(report.customerDetails),
            PdfTableSub.getTableCell(`${metricToMiles(report.businessRateInMiles, report.isMetricSystem, 1000)} $\\${report.isMetricSystem ? 'km' : 'mi'}`),
            PdfTableSub.getTableCell(`${metricToMiles(report.charityRateInMiles, report.isMetricSystem, 1000)} $\\${report.isMetricSystem ? 'km' : 'mi'}`),
            PdfTableSub.getTableCell(`${metricToMiles(report.movingRateInMiles, report.isMetricSystem, 1000)} $\\${report.isMetricSystem ? 'km' : 'mi'}`),
            PdfTableSub.getTableCell(`${metricToMiles(report.medicalRateInMiles, report.isMetricSystem, 1000)} $\\${report.isMetricSystem ? 'km' : 'mi'}`),
            PdfTableSub.getTableCell(report.details),
        ])
        const customerDetailsTable = new PdfTable('tableExample', [0, 10, 0, 10], customerDetailsTableSub, new PdfLayout(PdfLayout.getTableHeaderFillColorFunc(), undefined))
        pd.content.push(customerDetailsTable)

        // Add business vehicles table
        pd.content.push(new PdfText('Report Summary (Business)', undefined, 'subheader', undefined, undefined, undefined, undefined))
        const businessVehiclesTableSub = new PdfTableSub(['*', '*', '*', '*', '*', '*', '*'], new Array<Array<PdfObject>>())
        businessVehiclesTableSub.body.push([
            PdfTableSub.getHeaderTableCell('Vehicle'),
            PdfTableSub.getHeaderTableCell('Odometer (Start of Year)'),
            PdfTableSub.getHeaderTableCell(`Business (${report.isMetricSystem ? 'km' : 'mi'})`),
            PdfTableSub.getHeaderTableCell(`Mileage Value`),
            PdfTableSub.getHeaderTableCell('Parking Value ($)'),
            PdfTableSub.getHeaderTableCell('Tolls Value ($)'),
            PdfTableSub.getHeaderTableCell('Total Value ($)'),
        ])

        const businessSummaryLine = new YMReportVehicleLine('', 0, 0, 0, 0, 0)
        report.vehicleBusinessLines.forEach(vl => {
            businessSummaryLine.miles += vl.miles
            businessSummaryLine.parkingValue += vl.parkingValue
            businessSummaryLine.tollsValue += vl.tollsValue
            businessSummaryLine.mileageValue += vl.mileageValue
            businessSummaryLine.totalValue += vl.totalValue
            businessVehiclesTableSub.body.push([
                PdfTableSub.getTableCell(vl.vehicle),
                PdfTableSub.getTableCell(`${milesToMetric(vl.odometerRead, report.isMetricSystem)}`),
                PdfTableSub.getTableCell(`${milesToMetric(vl.miles , report.isMetricSystem)}`),
                PdfTableSub.getTableCell(`${roundNumber(vl.mileageValue)}`),
                PdfTableSub.getTableCell(`${roundNumber(vl.parkingValue)}`),
                PdfTableSub.getTableCell(`${roundNumber(vl.tollsValue)}`),
                PdfTableSub.getTableCell(`${roundNumber(vl.totalValue)}`),
            ])
        })

        businessVehiclesTableSub.body.push([
                PdfTableSub.getTotalCell(''),
                PdfTableSub.getTotalCell('Total'),
                PdfTableSub.getTotalCell(`${milesToMetric(businessSummaryLine.miles, report.isMetricSystem)}`),
                PdfTableSub.getTotalCell(`${roundNumber(businessSummaryLine.mileageValue)}`),
                PdfTableSub.getTotalCell(`${roundNumber(businessSummaryLine.parkingValue)}`),
                PdfTableSub.getTotalCell(`${roundNumber(businessSummaryLine.tollsValue)}`),
                PdfTableSub.getTotalCell(`${roundNumber(businessSummaryLine.totalValue)}`),
            ])
        
        const businessVehiclesTable = new PdfTable('tableExample', undefined, businessVehiclesTableSub, new PdfLayout(PdfLayout.getTableHeaderFillColorFunc(), PdfLayout.getTableHeaderHLineWidthFunc()))
        pd.content.push(businessVehiclesTable)

        // Add personal vehicles table
        pd.content.push(new PdfText('Report Summary (Personal)', undefined, 'subheader', undefined, undefined, undefined, undefined))
        const vehiclesTableSub = new PdfTableSub(['*', '*', '*', '*', '*', '*', '*'], new Array<Array<PdfObject>>())
        vehiclesTableSub.body.push([
            PdfTableSub.getHeaderTableCell('Vehicle'),
            PdfTableSub.getHeaderTableCell('Odometer (Start of Year)'),
            PdfTableSub.getHeaderTableCell(`Personal (${report.isMetricSystem ? 'km' : 'mi'})`),
            PdfTableSub.getHeaderTableCell(`Mileage Value`),
            PdfTableSub.getHeaderTableCell('Parking Value ($)'),
            PdfTableSub.getHeaderTableCell('Tolls Value ($)'),
            PdfTableSub.getHeaderTableCell('Total Value ($)'),
        ])

        const summaryLine = new YMReportVehicleLine('', 0, 0, 0, 0, 0)
        report.vehiclePersonalLines.forEach(vl => {
            summaryLine.miles += vl.miles
            summaryLine.parkingValue += vl.parkingValue
            summaryLine.tollsValue += vl.tollsValue
            summaryLine.mileageValue += vl.mileageValue
            summaryLine.totalValue += vl.totalValue
            vehiclesTableSub.body.push([
                PdfTableSub.getTableCell(vl.vehicle),
                PdfTableSub.getTableCell(`${milesToMetric(vl.odometerRead, report.isMetricSystem)}`),
                PdfTableSub.getTableCell(`${milesToMetric(vl.miles, report.isMetricSystem)}`),
                PdfTableSub.getTableCell(`${roundNumber(vl.mileageValue)}`),
                PdfTableSub.getTableCell(`${roundNumber(vl.parkingValue)}`),
                PdfTableSub.getTableCell(`${roundNumber(vl.tollsValue)}`),
                PdfTableSub.getTableCell(`${roundNumber(vl.totalValue)}`),
            ])
        })

        vehiclesTableSub.body.push([
                PdfTableSub.getTotalCell(''),
                PdfTableSub.getTotalCell('Total'),
                PdfTableSub.getTotalCell(`${milesToMetric(summaryLine.miles, report.isMetricSystem)}`),
                PdfTableSub.getTotalCell(`${roundNumber(summaryLine.mileageValue)}`),
                PdfTableSub.getTotalCell(`${roundNumber(summaryLine.parkingValue)}`),
                PdfTableSub.getTotalCell(`${roundNumber(summaryLine.tollsValue)}`),
                PdfTableSub.getTotalCell(`${roundNumber(summaryLine.totalValue)}`),
            ])
        
        const vehiclesTable = new PdfTable('tableExample', undefined, vehiclesTableSub, new PdfLayout(PdfLayout.getTableHeaderFillColorFunc(), PdfLayout.getTableHeaderHLineWidthFunc()))
        pd.content.push(vehiclesTable)

        // Add drives table
        pd.content.push(new PdfText('Mileage Log', undefined, 'subheader', undefined, undefined, undefined, undefined, undefined, 'before'))
        const drivesSummaryLine = YMReportLine.fromObject(undefined)
        const drivesTableSub = new PdfTableSub([14, 110, 30, 110, 130, 60, 60, 40, 50, 40, '*'], new Array<Array<PdfObject>>())
        drivesTableSub.body.push([
            PdfTableSub.getHeaderTableCell('#'),
            PdfTableSub.getHeaderTableCell('When'),
            PdfTableSub.getHeaderTableCell('Rate ($)'),
            PdfTableSub.getHeaderTableCell('Why'),
            PdfTableSub.getHeaderTableCell(`From -> To (${report.isMetricSystem ? 'km' : 'mi'})`),
            PdfTableSub.getHeaderTableCell(`Vehicle (${report.isMetricSystem ? 'km' : 'mi'})`),
            PdfTableSub.getHeaderTableCell(`Distance (${report.isMetricSystem ? 'km' : 'mi'})`),
            PdfTableSub.getHeaderTableCell(`Value ($)`),
            PdfTableSub.getHeaderTableCell('Parking ($)'),
            PdfTableSub.getHeaderTableCell('Tolls ($)'),
            PdfTableSub.getHeaderTableCell('Total ($)'),
        ])
        
        report.lines.forEach((dl, index) => {
            drivesSummaryLine.distanceInMiles += dl.distanceInMiles
            drivesSummaryLine.parking += dl.parking
            drivesSummaryLine.tolls += dl.tolls
            drivesSummaryLine.value += dl.value
            drivesTableSub.body.push([
                PdfTableSub.getTableCell(`${index + 1}`),
                PdfTableSub.getTableCell(Moment.utc(dl.when).format('MMMM Do YYYY, h:mm a')),
                PdfTableSub.getTableCell(`${dl.rate}`),
                PdfTableSub.getTableCell(dl.purpose),
                PdfTableSub.getTableCell(dl.fromToPersonalized),
                PdfTableSub.getTableCell(dl.vehicle),
                PdfTableSub.getTableCell(`${milesToMetric(dl.distanceInMiles, report.isMetricSystem)}`),
                PdfTableSub.getTableCell(`${roundNumber(dl.value)}`),
                PdfTableSub.getTableCell(`${roundNumber(dl.parking)}`),
                PdfTableSub.getTableCell(`${roundNumber(dl.tolls)}`),
                PdfTableSub.getTableCell(`${roundNumber(dl.tolls + dl.parking + dl.value)}`),
            ])
        })

        drivesTableSub.body.push([
                PdfTableSub.getTotalCell(''),
                PdfTableSub.getTotalCell(''),
                PdfTableSub.getTotalCell(''),
                PdfTableSub.getTotalCell(''),
                PdfTableSub.getTotalCell(''),
                PdfTableSub.getTotalCell('Report Total'),
                PdfTableSub.getTotalCell(`${milesToMetric(drivesSummaryLine.distanceInMiles, report.isMetricSystem)}`),
                PdfTableSub.getTotalCell(`${roundNumber(drivesSummaryLine.value)}`),
                PdfTableSub.getTotalCell(`${roundNumber(drivesSummaryLine.parking)}`),
                PdfTableSub.getTotalCell(`${roundNumber(drivesSummaryLine.tolls)}`),
                PdfTableSub.getTotalCell(`${roundNumber(drivesSummaryLine.tolls + drivesSummaryLine.parking + drivesSummaryLine.value)}`),
            ])
        
        const drivesTable = new PdfTable('tableExample', [0, 10, 0, 10], drivesTableSub, new PdfLayout(PdfLayout.getTableHeaderFillColorFunc(), PdfLayout.getTableHeaderHLineWidthFunc()))
        pd.content.push(drivesTable)

        return pd
    }
}
