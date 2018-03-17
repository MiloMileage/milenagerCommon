import YMDrive from './../common/YMDrive'
import YMDateRange from './../common/YMDateRange'
import YMSavedLocation from './../common/YMSavedLocation'

export const filterDrives = function (drives: Array<YMDrive>, dateRange: YMDateRange, filterTerm: string) {
    return drives.filter(d =>  d.isVisible &&
        ((d.origin.address.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1
            || d.dest.address.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1)
                && new Date(d.startTime).getTime() >= new Date(dateRange.startDate).getTime()
                && new Date(d.startTime).getTime() <= addDays(new Date(dateRange.endDate), 1).getTime()))
}

export const selectedDrivesFromIds = function (drives: Array<YMDrive>, selectedDrivesIds: Array<string>) {
    return drives.filter(drive =>  selectedDrivesIds.indexOf(drive.driveId) === -1)
}

export const selectedDrivesOnDay = function (drives: Array<YMDrive>, day: Date) {
    return drives.filter(drive => new Date(drive.startTime).toDateString() === day.toDateString())
}

function addDays(startDate: Date, numberOfDays: number) {
    const returnDate = new Date(
                            startDate.getFullYear(),
                            startDate.getMonth(),
                            startDate.getDate() + numberOfDays,
                            startDate.getHours(),
                            startDate.getMinutes(),
                            startDate.getSeconds())
    return returnDate
}

export const sortDrivesByDate = function(drives: Array<YMDrive>) {
    if (drives === undefined) {
        return []
    }

    drives.sort( (x1, x2) => (new Date(x2.startTime).getTime() - new Date(x1.startTime).getTime()) )

    return drives
}

export const filterDeletedDrives = function(drives: Array<YMDrive>) {
    return drives.filter(x => (x.isDeleted === undefined || x.isDeleted === false))
}

export const roundNumber = function(num: number, pow: number) {
    const factor = Math.pow(10, pow)

    return Math.round(num * factor) / factor
}

const googleMapsStyle = 'style=element:geometry%7Ccolor:0xebe3cd&style=element:labels.text.fill%7Ccolor:0x523735&style=element:labels.text.stroke%7Ccolor:0xf5f1e6&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xc9b2a6&style=feature:administrative.land_parcel%7Celement:geometry.stroke%7Ccolor:0xdcd2be&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xae9e90&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x93817c&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0xa5b076&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x447530&style=feature:road%7Celement:geometry%7Ccolor:0xf5f1e6&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xfdfcf8&style=feature:road.highway%7Celement:geometry%7Ccolor:0xf8c967&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xe9bc62&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0xe98d58&style=feature:road.highway.controlled_access%7Celement:geometry.stroke%7Ccolor:0xdb8555&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x806b63&style=feature:transit.line%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:transit.line%7Celement:labels.text.fill%7Ccolor:0x8f7d77&style=feature:transit.line%7Celement:labels.text.stroke%7Ccolor:0xebe3cd&style=feature:transit.station%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:water%7Celement:geometry.fill%7Ccolor:0xb9d3c2&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x92998d'

export const getMapImage = function(pathColor: string, pathWeight: string, colorStart: string, colorEnd: string, locationArray: Array<{lat: number, lon: number}>, mapSize: {width: number, height: number}) {
    const formatUrl = (latLonStr: string, startPoint: {lat: number, lon: number}, endPoint: {lat: number, lon: number}) =>
        'https://maps.googleapis.com/maps/api/staticmap?path=color:' + pathColor + '|weight:' + pathWeight + '|' + latLonStr +
        '&size=' + mapSize.width + 'x' + mapSize.height + '&scale=2&maptype=roadmap&markers=size:mid|color:' + colorStart + '|label:|' + roundNumber(startPoint.lat, 3) + ',' + roundNumber(startPoint.lon, 3) + '&markers=size:mid|color:' + colorEnd + '|label:|'
        + roundNumber(endPoint.lat, 3) + ',' + roundNumber(endPoint.lon, 3) + '&' + googleMapsStyle

    return formatUrl(locationArray.map(x => roundNumber(x.lat, 3) + ',' + roundNumber(x.lon,3)).join('|'), locationArray[0], locationArray.slice(-1)[0]) // 0.001 ~ 111 m accuracy
}

export const getArrayOfsavedLocations = (map: Map<string, YMSavedLocation>) => {
    const arr = new Array<YMSavedLocation>()

    for (const key in map) {
        const val = map[key]
        if (val.name.length > 0) {
        arr.push(val)
        }
    }

    return arr
}

export const getPersonalNameIfExist = (personalNames, key, defaultName) => {
    let name = defaultName
    if (key in personalNames && personalNames[key].name.length > 0) name = personalNames[key].name

    return name
}