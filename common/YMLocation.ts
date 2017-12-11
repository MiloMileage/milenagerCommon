import YMAddress from './YMAddress'
import {roundNumber} from './../components/common/common'

export default class YMLocation {
    address: YMAddress
    lat: number
    lon: number

    constructor (address: YMAddress, lat: number, lon: number) {
        this.address = YMAddress.fromObject(address)
        this.lat = lat
        this.lon = lon
    }

    // tslint:disable-next-line:member-ordering
    getLatLonKey = function() {
        let key =  ('' + roundNumber(this.lat, 2) + '_' + roundNumber(this.lon, 2)).replace('.', '*').replace('.', '*')
        return key
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        // tslint:disable-next-line:max-line-length
        return new YMLocation(obj.address, obj.lat, obj.lon)
    }
}
