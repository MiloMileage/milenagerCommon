import YMAddress from './YMAddress'
import {roundNumber} from './../components/common'

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
        const key =  ('' + roundNumber(this.lat, 2) + '_' + roundNumber(this.lon, 2)).replace('.', '*').replace('.', '*')
        return key
    }

    distanceFrom = function(loc: YMLocation) {
        let radlat1 = Math.PI * this.lat/180
        let radlat2 = Math.PI * loc.lat/180
        let theta = this.lon-loc.lon
        let radtheta = Math.PI * theta/180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        dist = dist * 1.609344 // transform from miles to km

	    return dist
    }
    
    getPrettyAddress = () => {
        if (this.address.name !== undefined && this.address.name.length > 0) {
            return this.address.name
        }

        if (this.address.neighborhood !== undefined && this.address.neighborhood.length > 0) {
            return this.address.neighborhood
        }

        if (this.address.street !== undefined && this.address.street.length > 0) {
            return this.address.street
        }

        if (this.address.city !== undefined && this.address.city.length > 0) {
            return this.address.city
        }

        if (this.address.county !== undefined && this.address.county.length > 0) {
            return this.address.county
        }

        if (this.address.country !== undefined && this.address.country.length > 0) {
            return this.address.country
        }

        return 'Unknown'
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMLocation(YMAddress.fromObject(undefined), 0, 0)

        return new YMLocation(obj.address, obj.lat, obj.lon)
    }
}
