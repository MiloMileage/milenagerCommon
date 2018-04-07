export default class YMPersonalSettings {
    isMetricSystem: boolean;
    monitoringLevel: string;
    constructor(isMetricSystem: any, monitoringLevel: string);
    static fromObject: (obj: any) => YMPersonalSettings;
    static flipMetric(curr: YMPersonalSettings): YMPersonalSettings;
}
