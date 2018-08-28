export default class YMPersonalSettings {
    isMetricSystem: boolean;
    monitoringLevel: string;
    monitorFromTimestamp: number;
    constructor(isMetricSystem: boolean, monitoringLevel: string, monitorFromTimestamp: number);
    static fromObject: (obj: any) => YMPersonalSettings;
    static flipMetric(curr: YMPersonalSettings): YMPersonalSettings;
}
