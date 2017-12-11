import YMAddress from './YMAddress'
import YMLocation from './YMLocation'

export default class YMSavedLocation {
    name: string
    location: YMLocation

    // tslint:disable-next-line:max-line-length
    constructor (name: string, location: YMLocation) {
        this.name = name
        this.location = YMLocation.fromObject(location)
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        // tslint:disable-next-line:max-line-length
        return new YMSavedLocation(obj.name, obj.location)
    }
}
