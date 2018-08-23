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
import { milesToMetric, metricToMiles } from './../components/common'

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
                `(${currentPage} of ${pageCount})         Created using ThisIsMilo.com for ${name}, ${project}, ${customerDetails}      Submitted By: ______________     Date: ___________     Approved: ___________`,
                [30],
                undefined,
                false,
                false,
                'black',
                8,
                'left'
                )
        }
    }

    static getHeaderFunc = (name: string, dateRanage: YMDateRange) => {
        return (currentPage: number, pageCount: number) => {
            return new PdfText(
                `Mileage Report (${Moment(dateRanage.endDate).format('MMMM Do YYYY')} to ${Moment(dateRanage.startDate).format('MMMM Do YYYY')}) - ${name}`,
                [30, 8, 30, 30],
                'header',
                false,
                false,
                'black',
                8,
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
        const customerDetailsTableSub = new PdfTableSub([], new Array<Array<PdfObject>>())
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
            PdfTableSub.getHeaderTableCell(report.name),
            PdfTableSub.getHeaderTableCell(report.project),
            PdfTableSub.getHeaderTableCell(report.customerDetails),
            PdfTableSub.getHeaderTableCell(`${Math.round(report.businessRateInMiles * 1000) / 1000}`),
            PdfTableSub.getHeaderTableCell(`${Math.round(report.charityRateInMiles * 1000) / 1000}`),
            PdfTableSub.getHeaderTableCell(`${Math.round(report.movingRateInMiles * 1000) / 1000}`),
            PdfTableSub.getHeaderTableCell(`${Math.round(report.medicalRateInMiles * 1000) / 1000}`),
            PdfTableSub.getHeaderTableCell(report.details),
        ])
        const customerDetailsTable = new PdfTable('tableExample', [], customerDetailsTableSub, new PdfLayout(PdfLayout.getTableHeaderFillColorFunc(), undefined))
        pd.content.push(customerDetailsTable)

        // Add vehicles table
        pd.content.push(new PdfText('Report Summary', [], 'subheader', undefined, undefined, undefined, undefined))
        const vehiclesTableSub = new PdfTableSub([], new Array<Array<PdfObject>>())
        vehiclesTableSub.body.push([
            PdfTableSub.getHeaderTableCell('Vehicle'),
            PdfTableSub.getHeaderTableCell('Odometer (Start of Year)'),
            PdfTableSub.getHeaderTableCell(`Business (${report.isMetricSystem ? 'km' : 'mi'})`),
            PdfTableSub.getHeaderTableCell(`Personal (${report.isMetricSystem ? 'km' : 'mi'})`),
            PdfTableSub.getHeaderTableCell(`Total Distance (${report.isMetricSystem ? 'km' : 'mi'})`),
            PdfTableSub.getHeaderTableCell(`Business Value ($)`),
            PdfTableSub.getHeaderTableCell('Parking Value ($)'),
            PdfTableSub.getHeaderTableCell('Tolls Value ($)'),
            PdfTableSub.getHeaderTableCell('Total Value ($)'),
        ])


        const summaryLine = new YMReportVehicleLine('', 0, 0, 0, 0, 0, 0, 0, 0)
        report.vehicleLines.forEach(vl => {
            summaryLine.businessMiles += vl.businessMiles
            summaryLine.businessValue += vl.businessValue
            summaryLine.parkingValue += vl.parkingValue
            summaryLine.personalMiles += vl.personalMiles
            summaryLine.tollsValue += vl.tollsValue
            summaryLine.totalMiles += vl.totalMiles
            summaryLine.totalValue += vl.totalValue
            vehiclesTableSub.body.push([
                PdfTableSub.getHeaderTableCell(vl.vehicle),
                PdfTableSub.getHeaderTableCell(`${vl.odometerRead}`),
                PdfTableSub.getHeaderTableCell(`${milesToMetric(vl.businessMiles, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${milesToMetric(vl.personalMiles, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${milesToMetric(vl.businessMiles + vl.personalMiles, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${metricToMiles(vl.businessValue, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${metricToMiles(vl.parkingValue, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${metricToMiles(vl.tollsValue, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${metricToMiles(vl.totalValue, report.isMetricSystem)}`),
            ])
        })

        vehiclesTableSub.body.push([
                PdfTableSub.getHeaderTableCell(''),
                PdfTableSub.getHeaderTableCell('Total'),
                PdfTableSub.getHeaderTableCell(`${milesToMetric(summaryLine.businessMiles, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${milesToMetric(summaryLine.personalMiles, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${milesToMetric(summaryLine.businessMiles + summaryLine.personalMiles, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${metricToMiles(summaryLine.businessValue, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${metricToMiles(summaryLine.parkingValue, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${metricToMiles(summaryLine.tollsValue, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${metricToMiles(summaryLine.totalValue, report.isMetricSystem)}`),
            ])
        
        const vehiclesTable = new PdfTable('tableExample', [], customerDetailsTableSub, new PdfLayout(PdfLayout.getTableHeaderFillColorFunc(), PdfLayout.getTableHeaderHLineWidthFunc()))
        pd.content.push(vehiclesTable)

        // Add drives table
        pd.content.push(new PdfText('Mileage Log', [], 'subheader', undefined, undefined, undefined, undefined))
        const drivesSummaryLine = new YMReportLine(undefined, undefined, undefined, undefined, 0, 0, 0, 0)
        const drivesTableSub = new PdfTableSub([], new Array<Array<PdfObject>>())
        drivesTableSub.body.push([
            PdfTableSub.getHeaderTableCell('Vehicle'),
            PdfTableSub.getHeaderTableCell('Odometer (Start of Year)'),
            PdfTableSub.getHeaderTableCell(`Business (${report.isMetricSystem ? 'km' : 'mi'})`),
            PdfTableSub.getHeaderTableCell(`Personal (${report.isMetricSystem ? 'km' : 'mi'})`),
            PdfTableSub.getHeaderTableCell(`Total Distance (${report.isMetricSystem ? 'km' : 'mi'})`),
            PdfTableSub.getHeaderTableCell(`Business Value ($)`),
            PdfTableSub.getHeaderTableCell('Parking Value ($)'),
            PdfTableSub.getHeaderTableCell('Tolls Value ($)'),
            PdfTableSub.getHeaderTableCell('Total Value ($)'),
        ])
        
        report.lines.forEach(dl => {
            drivesSummaryLine.distanceInMiles += dl.distanceInMiles
            drivesSummaryLine.parking += dl.parking
            drivesSummaryLine.tolls += dl.tolls
            drivesSummaryLine.value += dl.value
            drivesTableSub.body.push([
                PdfTableSub.getHeaderTableCell(Moment(dl.when.startDate).format('MMMM Do YYYY')),
                PdfTableSub.getHeaderTableCell(dl.purpose),
                PdfTableSub.getHeaderTableCell(dl.fromTo),
                PdfTableSub.getHeaderTableCell(dl.vehicle),
                PdfTableSub.getHeaderTableCell(`${milesToMetric(dl.distanceInMiles, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${milesToMetric(dl.value, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${milesToMetric(dl.parking, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${metricToMiles(dl.tolls, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${metricToMiles(dl.tolls + dl.parking + dl.value, report.isMetricSystem)}`),
            ])
        })

        drivesTableSub.body.push([
                PdfTableSub.getHeaderTableCell(''),
                PdfTableSub.getHeaderTableCell(''),
                PdfTableSub.getHeaderTableCell(''),
                PdfTableSub.getHeaderTableCell('Report Total'),
                PdfTableSub.getHeaderTableCell(`${milesToMetric(drivesSummaryLine.distanceInMiles, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${milesToMetric(drivesSummaryLine.value, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${milesToMetric(drivesSummaryLine.parking, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${metricToMiles(drivesSummaryLine.tolls, report.isMetricSystem)}`),
                PdfTableSub.getHeaderTableCell(`${metricToMiles(drivesSummaryLine.tolls + drivesSummaryLine.parking + drivesSummaryLine.value, report.isMetricSystem)}`),
            ])
        
        const drivesTable = new PdfTable('tableExample', [], drivesTableSub, new PdfLayout(PdfLayout.getTableHeaderFillColorFunc(), PdfLayout.getTableHeaderHLineWidthFunc()))
        pd.content.push(drivesTable)
    }
}
