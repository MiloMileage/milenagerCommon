import YMDateRange from './YMDateRange'
import YMReportLine from './YMReportLine'
import YMReportVehicleLine from './YMReportVehicleLine'

export default class YMReport {
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
    vehicleLines: Array<YMReportVehicleLine>
    
    constructor (name: string,
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
            vehicleLines: Array<YMReportVehicleLine>) {
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
        this.vehicleLines = vehicleLines
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMReport('', '', '', '', 0, 0, 0, 0, false, YMDateRange.fromObject(undefined), [], [])
        
        return new YMReport(
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
            obj.vehicleLines)
    }
}
