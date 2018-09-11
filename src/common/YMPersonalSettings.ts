import * as Moment from 'moment'

export default class YMPersonalSettings {
    isMetricSystem: boolean
    monitoringLevel: string
    monitorFromTimestamp: number

    constructor (isMetricSystem: boolean, monitoringLevel: string, monitorFromTimestamp: number) {
        this.isMetricSystem = isMetricSystem
        this.monitoringLevel = monitoringLevel === undefined ? '1' : monitoringLevel
        this.monitorFromTimestamp = monitorFromTimestamp === undefined ? Moment.utc().add(-1, 'day').toDate().getTime() : monitorFromTimestamp
    }

    isDriveDetectionEnabled() {
        return this.monitorFromTimestamp < new Date().getTime()
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMPersonalSettings(false, '', Moment.utc().add(-1, 'day').toDate().getTime())

        return new YMPersonalSettings(obj.isMetricSystem, obj.monitoringLevel, obj.monitorFromTimestamp)
    }

    // tslint:disable-next-line:member-ordering
    static flipMetric(curr: YMPersonalSettings) {
        return new YMPersonalSettings(!curr.isMetricSystem, curr.monitoringLevel, curr.monitorFromTimestamp)
    }
}