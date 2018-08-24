import YMDateRange from './YMDateRange'
import YMReportLine from './YMReportLine'
import YMReportVehicleLine from './YMReportVehicleLine'
import YMDrive from './YMDrive'
import YMUserSettings from './YMUserSettings'
import YMGlobalUserSettings from './YMGlobalUserSettings'

export default class YMReport {
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
    
    constructor (dateCreated: Date,
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

    addDriveValue(drive: YMDrive, userSettings: YMUserSettings, globalSettings: YMGlobalUserSettings) {
        const newLine = YMReportLine.fromDrive(drive, userSettings, globalSettings)
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
        this.lines.sort((a, b) => new Date(b.when.startDate).getTime() - new Date(a.when.startDate).getTime())
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMReport(new Date(), '', '', '', '', 0, 0, 0, 0, false, YMDateRange.fromObject(undefined), [], [], [], '', '', '')
        
        return new YMReport(
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
