import YMDateRange from './YMDateRange'
import YMReportLine from './YMReportLine'
import YMReportVehicleLine from './YMReportVehicleLine'
import YMDrive from './YMDrive'
import YMUserSettings from './YMUserSettings'
import YMSavedLocation from './YMSavedLocation'
import YMGlobalUserSettings from './YMGlobalUserSettings'
import { milesToMetric, metricToMiles, roundNumber } from './../components/common'
import * as Moment from 'moment'

export default class YMReport {
    reportName: string
    dateCreated: Date
    name: string
    project: string
    customerDetails: string
    details: string
    businessRateInMiles: number
    charityRateInMiles: number
    movingRateInMiles: number
    medicalRateInMiles: number
    isMetricSystem: boolean
    dateRange: YMDateRange
    lines: Array<YMReportLine>
    vehicleBusinessLines: Array<YMReportVehicleLine>
    vehiclePersonalLines: Array<YMReportVehicleLine>
    reportId: string
    csvLink: string
    pdfLink: string
    
    constructor (reportName: string,
            dateCreated: Date,
            name: string,
            project: string,
            customerDetails: string,
            details: string,
            businessRateInMiles: number,
            charityRateInMiles: number,
            movingRateInMiles: number,
            medicalRateInMiles: number,
            isMetricSystem: boolean,
            dateRange: YMDateRange,
            lines: Array<YMReportLine>,
            vehicleBusinessLines: Array<YMReportVehicleLine>,
            vehiclePersonalLines: Array<YMReportVehicleLine>,
            reportId: string,
            csvLink: string,
            pdfLink: string) {
        this.reportName = reportName
        this.dateCreated = dateCreated
        this.name = name
        this.project = project
        this.customerDetails = customerDetails
        this.details = details
        this.businessRateInMiles = businessRateInMiles
        this.charityRateInMiles = charityRateInMiles
        this.movingRateInMiles = movingRateInMiles
        this.medicalRateInMiles = medicalRateInMiles
        this.isMetricSystem = isMetricSystem
        this.dateRange = dateRange
        this.lines = lines
        this.vehicleBusinessLines = vehicleBusinessLines
        this.vehiclePersonalLines = vehiclePersonalLines
        this.reportId = reportId
        this.csvLink = csvLink
        this.pdfLink = pdfLink
    }

    addDriveValue(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings, savedLocations : { [ind: string]: YMSavedLocation }) {
        const newLine = YMReportLine.fromDrive(drive, userSettings, globalSettings, savedLocations)
        this.lines.push(newLine)

        const vehicle = userSettings.vehicles.filter(v => v.vehicleId === drive.vehicleId)[0]
        const purpose = drive.getPurpose(userSettings)
        const isBusiness = purpose !== undefined && purpose.category.toLowerCase() === 'business'

        const newVehicleLine = new YMReportVehicleLine(
                                    newLine.vehicle,
                                    vehicle === undefined ? 0 : vehicle.getOdometerReadIfExist(new Date(drive.startTime).getFullYear()),
                                    drive.miles,
                                    drive.getValue(userSettings, globalSettings),
                                    drive.driveNotes.parkingMoney,
                                    drive.driveNotes.tollMoney)

        if (isBusiness) {
            const vehicleLine = this.vehicleBusinessLines.filter(v => v.vehicle === newLine.vehicle)[0]
            if (vehicleLine === undefined) {
                this.vehicleBusinessLines.push(newVehicleLine)
            } else {
                vehicleLine.miles += newVehicleLine.miles
                vehicleLine.mileageValue += newVehicleLine.mileageValue
                vehicleLine.parkingValue += newVehicleLine.parkingValue
                vehicleLine.tollsValue += newVehicleLine.tollsValue
                vehicleLine.totalValue += newVehicleLine.totalValue

                this.vehicleBusinessLines = [...this.vehicleBusinessLines.filter(v => v.vehicle !== newLine.vehicle), vehicleLine]
            }
        } else {
            const vehicleLine = this.vehiclePersonalLines.filter(v => v.vehicle === newLine.vehicle)[0]
            if (vehicleLine === undefined) {
                this.vehiclePersonalLines.push(newVehicleLine)
            } else {
                vehicleLine.miles += newVehicleLine.miles
                vehicleLine.mileageValue += newVehicleLine.mileageValue
                vehicleLine.parkingValue += newVehicleLine.parkingValue
                vehicleLine.tollsValue += newVehicleLine.tollsValue
                vehicleLine.totalValue += newVehicleLine.totalValue

                this.vehiclePersonalLines = [...this.vehiclePersonalLines.filter(v => v.vehicle !== newLine.vehicle), vehicleLine]
            }
        }

        this.vehicleBusinessLines.sort((a, b) => { return b.miles - a.miles})
        this.vehiclePersonalLines.sort((a, b) => { return b.miles - a.miles})
        this.lines.sort((a, b) => new Date(a.when.startDate).getTime() - new Date(b.when.startDate).getTime())
    }

    getPersonalMiles() {
        return this.vehiclePersonalLines.map(x => x.miles).reduce((total, num) => total + num, 0)
    }

    getBusinessMiles() {
        return this.vehicleBusinessLines.map(x => x.miles).reduce((total, num) => total + num, 0)
    }

    getPersonalValue() {
        return this.vehiclePersonalLines.map(x => x.mileageValue).reduce((total, num) => total + num, 0)
    }

    getBusinessValue() {
        return this.vehicleBusinessLines.map(x => x.mileageValue).reduce((total, num) => total + num, 0)
    }

    getPersonalTollsValue() {
        return this.vehiclePersonalLines.map(x => x.tollsValue).reduce((total, num) => total + num, 0)
    }

    getBusinessTollsValue() {
        return this.vehicleBusinessLines.map(x => x.tollsValue).reduce((total, num) => total + num, 0)
    }

    getPersonalParkingValue() {
        return this.vehiclePersonalLines.map(x => x.parkingValue).reduce((total, num) => total + num, 0)
    }

    getBusinessParkingValue() {
        return this.vehicleBusinessLines.map(x => x.parkingValue).reduce((total, num) => total + num, 0)
    }

    getPersonalTotalValue() {
        return this.vehiclePersonalLines.map(x => x.totalValue).reduce((total, num) => total + num, 0)
    }

    getBusinessTotalValue() {
        return this.vehicleBusinessLines.map(x => x.totalValue).reduce((total, num) => total + num, 0)
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
        data += 'Business Rate,'
        data += 'Charity Rate,'
        data += 'Moving Rate,'
        data += 'Medical Rate,'
        data += 'Details,'

        data += '\n'

        data += `${this.name},${this.project},${this.customerDetails},`
        
        data += `${metricToMiles(this.businessRateInMiles, this.isMetricSystem, 1000)} $\\${this.isMetricSystem ? 'km' : 'mi'},`
        data += `${metricToMiles(this.charityRateInMiles, this.isMetricSystem, 1000)} $\\${this.isMetricSystem ? 'km' : 'mi'},`
        data += `${metricToMiles(this.movingRateInMiles, this.isMetricSystem, 1000)} $\\${this.isMetricSystem ? 'km' : 'mi'},`
        data += `${metricToMiles(this.medicalRateInMiles, this.isMetricSystem, 1000)} $\\${this.isMetricSystem ? 'km' : 'mi'},`
        data += `${this.details}`

        data += '\n'
        data += '\n'

        data += 'Business Summary'
        
        data += '\n'

        data += 'Vehicle,'
        data += 'Odometer (Start of Year),'
        data += `Business (${this.isMetricSystem ? 'km' : 'mi'}),`
        data += 'Mileage Value,'
        data += 'Parking Value ($),'
        data += 'Tolls Value ($),'
        data += 'Total Value ($),'
        
        data += '\n'
        
        this.vehicleBusinessLines.forEach(vl => {
            data += `${vl.vehicle},`
            data += `${vl.odometerRead},`
            data += `${milesToMetric(vl.miles , this.isMetricSystem)},`
            data += `${roundNumber(vl.mileageValue)},`
            data += `${roundNumber(vl.parkingValue)},`
            data += `${roundNumber(vl.tollsValue)},`
            data += `${roundNumber(vl.totalValue)},`
            data += '\n'
        })

        data += `,`
        data += `Total,`
        data += `${milesToMetric(this.getBusinessMiles() , this.isMetricSystem)},`
        data += `${roundNumber(this.getBusinessValue())},`
        data += `${roundNumber(this.getBusinessParkingValue())},`
        data += `${roundNumber(this.getBusinessTollsValue())},`
        data += `${roundNumber(this.getBusinessTotalValue())},`
        data += '\n'

        data += '\n'
        data += '\n'

        data += 'Personal Summary'
        
        data += '\n'

        data += 'Vehicle,'
        data += 'Odometer (Start of Year),'
        data += `Personal (${this.isMetricSystem ? 'km' : 'mi'}),`
        data += 'Mileage Value,'
        data += 'Parking Value ($),'
        data += 'Tolls Value ($),'
        data += 'Total Value ($),'
        
        data += '\n'
        
        this.vehiclePersonalLines.forEach(vl => {
            data += `${vl.vehicle},`
            data += `${milesToMetric(vl.odometerRead)},`
            data += `${milesToMetric(vl.miles , this.isMetricSystem)},`
            data += `${roundNumber(vl.mileageValue)},`
            data += `${roundNumber(vl.parkingValue)},`
            data += `${roundNumber(vl.tollsValue)},`
            data += `${roundNumber(vl.totalValue)},`
            data += '\n'
        })

        data += `,`
        data += `Total,`
        data += `${milesToMetric(this.getPersonalMiles() , this.isMetricSystem)},`
        data += `${roundNumber(this.getPersonalValue())},`
        data += `${roundNumber(this.getPersonalParkingValue())},`
        data += `${roundNumber(this.getPersonalTollsValue())},`
        data += `${roundNumber(this.getPersonalTotalValue())},`
        data += '\n'

        data += '\n'
        data += '\n'

        data += 'Mileage Log'
        
        data += '\n'

        data += 'When,'
        data += `Why,`
        data += `From -> To,`
        data += `From -> To (Frequent Locations),`
        data += `Vehicle (${this.isMetricSystem ? 'km' : 'mi'}),`
        data += `Distance (${this.isMetricSystem ? 'km' : 'mi'}),`
        data += `Value ($),`
        data += `Parking ($),`
        data += `Tolls ($),`
        data += `Total ($),`

        data += '\n'

        this.lines.forEach(dl => {
            data += `${Moment(new Date(dl.when.startDate)).format('MMMM Do YYYY h:mm a')},`
            data += `${dl.purpose},`
            data += `${dl.fromTo},`
            data += `${dl.fromToPersonalized},`
            data += `${dl.vehicle},`
            data += `${milesToMetric(dl.distanceInMiles, this.isMetricSystem)},`
            data += `${roundNumber(dl.value)},`
            data += `${roundNumber(dl.parking)},`
            data += `${roundNumber(dl.tolls)},`
            data += `${roundNumber(dl.tolls + dl.parking + dl.value)},`
            data += '\n'
        })

        data += `,`
        data += `,`
        data += `,`
        data += `Total,`
        data += `${milesToMetric(this.getBusinessMiles() + this.getPersonalMiles(), this.isMetricSystem)},`
        data += `${roundNumber(this.getBusinessValue() + this.getPersonalValue())},`
        data += `${roundNumber(this.getBusinessParkingValue() + this.getPersonalParkingValue())},`
        data += `${roundNumber(this.getBusinessTollsValue() + this.getPersonalTollsValue())},`
        data += `${roundNumber(this.getBusinessTotalValue() + this.getPersonalTotalValue())},`
        data += '\n'
        data += '\n'

        data += '****,****,****,****,****,****,****,****,****,****\n'
        data += 'This,report,was,generated,by,ThisIsMilo.com\n'
        data += '****,****,****,****,****,****,****,****,****,****\n'

        return data
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMReport('', new Date(), '', '', '', '', 0, 0, 0, 0, false, YMDateRange.fromObject(undefined), [], [], [], '', '', '')
        
        return new YMReport(
            obj.reportName,
            obj.dateCreated,
            obj.name,
            obj.project,
            obj.customerDetails,
            obj.details,
            obj.businessRateInMiles,
            obj.charityRateInMiles,
            obj.movingRateInMiles,
            obj.medicalRateInMiles,
            obj.isMetricSystem,
            obj.dateRange,
            obj.lines,
            obj.vehicleBusinessLines,
            obj.vehiclePersonalLines,
            obj.reportId,
            obj.csvLink,
            obj.pdfLink)
    }
}
