import YMLocation from './YMLocation';
export default class YMSavedLocation {
    name: string;
    location: YMLocation;
    purposeId: string;
    constructor(name: string, location: YMLocation, purposeId: string);
    static fromObject: (obj: any) => YMSavedLocation;
}
