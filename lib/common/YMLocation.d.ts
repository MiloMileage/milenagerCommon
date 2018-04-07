import YMAddress from './YMAddress';
export default class YMLocation {
    address: YMAddress;
    lat: number;
    lon: number;
    constructor(address: YMAddress, lat: number, lon: number);
    getLatLonKey: () => string;
    static fromObject: (obj: any) => YMLocation;
}
