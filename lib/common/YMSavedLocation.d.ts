import YMLocation from './YMLocation';
export default class YMSavedLocation {
    name: string;
    location: YMLocation;
    purposeId: string;
    key: string;
    constructor(name: string, location: YMLocation, purposeId: string, key?: string);
    static fromObject: (obj: any) => YMSavedLocation;
}
