import * as Moment from 'moment'

export default class YMPersonalSettings {
    isMetricSystem: boolean
    monitoringLevel: string
    monitorFromTimestamp: number

    constructor (isMetricSystem: boolean, monitoringLevel: string, monitorFromTimestamp: number) {
        this.isMetricSystem = isMetricSystem
        this.monitoringLevel = monitoringLevel
        this.monitorFromTimestamp = monitorFromTimestamp === undefined ? Moment().add(-1, 'day').toDate().getTime() : monitorFromTimestamp
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMPersonalSettings(false, '', Moment().add(-1, 'day').toDate().getTime())

        return new YMPersonalSettings(obj.isMetricSystem, obj.monitoringLevel, obj.monitorFromTimestamp)
    }

    // tslint:disable-next-line:member-ordering
    static flipMetric(curr: YMPersonalSettings) {
        return new YMPersonalSettings(!curr.isMetricSystem, curr.monitoringLevel, curr.monitorFromTimestamp)
    }
}