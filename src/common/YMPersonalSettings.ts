export default class YMPersonalSettings {
    isMetricSystem: boolean
    monitoringLevel: string

    constructor (isMetricSystem, monitoringLevel: string) {
        this.isMetricSystem = isMetricSystem
        this.monitoringLevel = monitoringLevel
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMPersonalSettings(false, '')

        return new YMPersonalSettings(obj.isMetricSystem, obj.monitoringLevel)
    }

    // tslint:disable-next-line:member-ordering
    static flipMetric(curr: YMPersonalSettings) {
        return new YMPersonalSettings(!curr.isMetricSystem, curr.monitoringLevel)
    }
}