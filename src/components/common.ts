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

export const getMapImage = function(lat: number, lon: number, color: string) {
    const formatUrl = (la: number, lo: number, colorStr: string) =>
        'https://maps.googleapis.com/maps/api/staticmap?center=' + la + ',' + lo +
        '&zoom=14&size=150x100&scale=2&maptype=roadmap&markers=size:mid%7Ccolor:' + colorStr + '%7Clabel:%7C'
        + la + ',' + lo

    return formatUrl(roundNumber(lat, 3), roundNumber(lon, 3), color) // 0.001 ~ 111 m accuracy
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