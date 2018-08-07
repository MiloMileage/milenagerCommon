import YMUserSettings from './YMUserSettings';
import YMDrive from './YMDrive';
export default class YMRate {
    name: string;
    deductable: number;
    visible: boolean;
    rateId: string;
    constructor(name: string, deductable: number, rateId?: string, visible?: boolean);
    static fromObject: (obj: any) => YMRate;
    static getRateForPurposeId: (purposeId: string, userSettings: YMUserSettings, rates: Map<string, Map<string, number>>, drive?: YMDrive) => any;
}
