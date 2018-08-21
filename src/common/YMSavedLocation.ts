import YMLocation from './YMLocation'
import common from '../store/common'

export default class YMSavedLocation {
    name: string
    location: YMLocation
    purposeId: string
    key: string

    // tslint:disable-next-line:max-line-length
    constructor (name: string, location: YMLocation, purposeId: string, key: string = undefined) {
        this.name = name
        this.location = YMLocation.fromObject(location)
        this.purposeId = purposeId
        this.key = key === undefined ? common.getUniqueDriveId() : key
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMSavedLocation('', YMLocation.fromObject(undefined), '')
        // tslint:disable-next-line:max-line-length
        return new YMSavedLocation(obj.name, obj.location, obj.purposeId, obj.key)
    }
}
