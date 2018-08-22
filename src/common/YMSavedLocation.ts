import YMLocation from './YMLocation'
import common from '../store/common'

export default class YMSavedLocation {
    name: string
    location: YMLocation
    purposeId: string
    key: string
    isDeleted: boolean

    // tslint:disable-next-line:max-line-length
    constructor (name: string, location: YMLocation, purposeId: string, key: string = undefined, isDeleted: boolean = false) {
        this.name = name
        this.location = YMLocation.fromObject(location)
        this.purposeId = purposeId
        this.key = key === undefined ? common.getUniqueDriveId() : key
        this.isDeleted = isDeleted === undefined ? false : isDeleted
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMSavedLocation('', YMLocation.fromObject(undefined), '')
        // tslint:disable-next-line:max-line-length
        return new YMSavedLocation(obj.name, obj.location, obj.purposeId, obj.key, obj.isDeleted)
    }
}
