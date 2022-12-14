import YMDrive from './../common/YMDrive'
import YMDateRange from './../common/YMDateRange'
import YMSavedLocation from './../common/YMSavedLocation'
import YMLocation from './../common/YMLocation'

export const addDays = (startDate: Date, numberOfDays: number) => {
    const returnDate = new Date(
                            startDate.getFullYear(),
                            startDate.getMonth(),
                            startDate.getDate() + numberOfDays,
                            startDate.getHours(),
                            startDate.getMinutes(),
                            startDate.getSeconds())
    return returnDate
}

export const filterDrives = function (drives: Array<YMDrive>, dateRange: YMDateRange, filterTerm: string) {
    return drives.filter(d =>  d.isVisible &&
        ((d.origin.address.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1
            || d.dest.address.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1)
                && d.startTime().getTime() >= new Date(dateRange.getStartDateLocal()).getTime()
                && d.startTime().getTime() <= addDays(new Date(dateRange.getEndDateLocal()), 1).getTime()))
}

export const selectedDrivesFromIds = function (drives: Array<YMDrive>, selectedDrivesIds: Array<string>) {
    return drives.filter(drive =>  selectedDrivesIds.indexOf(drive.driveId) === -1)
}

export const selectedDrivesOnDay = function (drives: Array<YMDrive>, day: Date) {
    return drives.filter(drive => drive.startTime().toDateString() === day.toDateString())
}

export const sortDrivesByDate = function(drives: Array<YMDrive>) {
    if (drives === undefined) {
        return []
    }

    drives.sort( (x1, x2) => (x2.startTime().getTime() - x1.startTime().getTime()) )

    return drives
}

export const filterDeletedDrives = function(drives: Array<YMDrive>) {
    return drives.filter(x => (x.isDeleted === undefined || x.isDeleted === false))
}

export const roundNumber = function(num: number, pow: number = 2) {
    const factor = Math.pow(10, pow)

    return Math.ceil(num * factor) / factor
}

// const googleMapsStyle = 'style=element:geometry|color:0xebe3cd&style=element:labels.text.fill|color:0x523735&style=element:labels.text.stroke|color:0xf5f1e6&style=feature:administrative|element:geometry.stroke|color:0xc9b2a6&style=feature:administrative.land_parcel|element:geometry.stroke|color:0xdcd2be&style=feature:administrative.land_parcel|element:labels.text.fill|color:0xae9e90&style=feature:landscape.natural|element:geometry|color:0xdfd2ae&style=feature:poi|element:geometry|color:0xdfd2ae&style=feature:poi|element:labels.text.fill|color:0x93817c&style=feature:poi.park|element:geometry.fill|color:0xa5b076&style=feature:poi.park|element:labels.text.fill|color:0x447530&style=feature:road|element:geometry|color:0xf5f1e6&style=feature:road.arterial|element:geometry|color:0xfdfcf8&style=feature:road.highway|element:geometry|color:0xf8c967&style=feature:road.highway|element:geometry.stroke|color:0xe9bc62&style=feature:road.highway.controlled_access|element:geometry|color:0xe98d58&style=feature:road.highway.controlled_access|element:geometry.stroke|color:0xdb8555&style=feature:road.local|element:labels.text.fill|color:0x806b63&style=feature:transit.line|element:geometry|color:0xdfd2ae&style=feature:transit.line|element:labels.text.fill|color:0x8f7d77&style=feature:transit.line|element:labels.text.stroke|color:0xebe3cd&style=feature:transit.station|element:geometry|color:0xdfd2ae&style=feature:water|element:geometry.fill|color:0xb9d3c2&style=feature:water|element:labels.text.fill|color:0x92998d'

export const getMapImage = function(pathColor: string, pathWeight: string, colorStart: string, colorEnd: string, locationArray: Array<{lat: number, lon: number}>, mapSize: {width: number, height: number}) {
    const formatUrl = (latLonStr: string, startPoint: {lat: number, lon: number}, endPoint: {lat: number, lon: number}) =>
        'https://maps.googleapis.com/maps/api/staticmap?path=color:' + pathColor + '|weight:' + pathWeight + '|' + latLonStr +
        '&size=' + mapSize.width + 'x' + mapSize.height + '&scale=2&maptype=roadmap&markers=size:mid|color:' + colorStart + '|label:|' + roundNumber(startPoint.lat, 3) + ',' + roundNumber(startPoint.lon, 3) + '&markers=size:mid|color:' + colorEnd + '|label:|'
        + roundNumber(endPoint.lat, 3) + ',' + roundNumber(endPoint.lon, 3)

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

export const getSavedLocationIfExist = (personalLocations : { [ind: string]: YMSavedLocation }, location: YMLocation, distance: number = 0.2) => {
   let result: YMSavedLocation = undefined
    Object.keys(personalLocations).forEach(key => {
        const currPerLoc = personalLocations[key]

        if (YMLocation.fromObject(currPerLoc.location).distanceFrom(location) < distance) {
            result = currPerLoc
            return
        }
    })

    return result
}

export const getPersonalNameIfExist = (personalLocations : { [ind: string]: YMSavedLocation }, location: YMLocation, defaultName: string, distance: number = 0.2) => {
    const name = defaultName
    const savedLocation = getSavedLocationIfExist(personalLocations, location, distance)

    return savedLocation ? savedLocation.name : name
}

export const milesToMetricNumber = (num: number, convert = true) => {
    return Number(convert ? Math.round(num * 160.934) / 100 : num)
}

export const milesToMetric = (num: number, convert = true) => {
    return milesToMetricNumber(num, convert).toFixed(2)

}

export const metricToMiles = (num: number, convert: boolean = true, roundFactor: number = 100) => {
    return Math.round((convert ? Number(num / 1.60934) : num) * roundFactor) / roundFactor
}

export default {
    filterDrives,
    selectedDrivesFromIds,
    selectedDrivesOnDay,
    addDays,
    sortDrivesByDate,
    filterDeletedDrives,
    roundNumber,
    getMapImage,
    getArrayOfsavedLocations,
    getPersonalNameIfExist,
    getSavedLocationIfExist,
    milesToMetric,
    milesToMetricNumber,
    metricToMiles,
}