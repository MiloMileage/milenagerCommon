import YMLocation from './YMLocation';
export default class YMSavedLocation {
    name: string;
    location: YMLocation;
    purposeId: string;
    key: string;
    isDeleted: boolean;
    constructor(name: string, location: YMLocation, purposeId: string, key?: string, isDeleted?: boolean);
    static fromObject: (obj: any) => YMSavedLocation;
}
