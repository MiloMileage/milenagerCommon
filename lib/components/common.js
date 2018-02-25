"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterDrives = function (drives, dateRange, filterTerm) {
    return drives.filter(d => d.isVisible &&
        ((d.origin.address.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1
            || d.dest.address.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1)
            && new Date(d.startTime).getTime() >= new Date(dateRange.startDate).getTime()
            && new Date(d.startTime).getTime() <= addDays(new Date(dateRange.endDate), 1).getTime()));
};
exports.selectedDrivesFromIds = function (drives, selectedDrivesIds) {
    return drives.filter(drive => selectedDrivesIds.indexOf(drive.driveId) === -1);
};
exports.selectedDrivesOnDay = function (drives, day) {
    return drives.filter(drive => new Date(drive.startTime).toDateString() === day.toDateString());
};
function addDays(startDate, numberOfDays) {
    const returnDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + numberOfDays, startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());
    return returnDate;
}
exports.sortDrivesByDate = function (drives) {
    if (drives === undefined) {
        return [];
    }
    drives.sort((x1, x2) => (new Date(x2.startTime).getTime() - new Date(x1.startTime).getTime()));
    return drives;
};
exports.filterDeletedDrives = function (drives) {
    return drives.filter(x => (x.isDeleted === undefined || x.isDeleted === false));
};
exports.roundNumber = function (num, pow) {
    const factor = Math.pow(10, pow);
    return Math.round(num * factor) / factor;
};
exports.getMapImage = function (lat, lon, color) {
    const formatUrl = (la, lo, colorStr) => 'https://maps.googleapis.com/maps/api/staticmap?center=' + la + ',' + lo +
        '&zoom=14&size=150x100&scale=2&maptype=roadmap&markers=size:mid%7Ccolor:' + colorStr + '%7Clabel:%7C'
        + la + ',' + lo;
    return formatUrl(exports.roundNumber(lat, 3), exports.roundNumber(lon, 3), color); // 0.001 ~ 111 m accuracy
};
exports.getArrayOfsavedLocations = (map) => {
    const arr = new Array();
    for (const key in map) {
        const val = map[key];
        if (val.name.length > 0) {
            arr.push(val);
        }
    }
    return arr;
};
exports.getPersonalNameIfExist = (personalNames, key, defaultName) => {
    let name = defaultName;
    if (key in personalNames && personalNames[key].name.length > 0)
        name = personalNames[key].name;
    return name;
};
//# sourceMappingURL=common.js.map