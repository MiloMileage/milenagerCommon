"use strict";
exports.__esModule = true;
var YMLocation_1 = require("./../common/YMLocation");
exports.addDays = function (startDate, numberOfDays) {
    var returnDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + numberOfDays, startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());
    return returnDate;
};
exports.filterDrives = function (drives, dateRange, filterTerm) {
    return drives.filter(function (d) { return d.isVisible &&
        ((d.origin.address.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1
            || d.dest.address.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1)
            && d.startTime().getTime() >= new Date(dateRange.getStartDateLocal()).getTime()
            && d.startTime().getTime() <= exports.addDays(new Date(dateRange.getEndDateLocal()), 1).getTime()); });
};
exports.selectedDrivesFromIds = function (drives, selectedDrivesIds) {
    return drives.filter(function (drive) { return selectedDrivesIds.indexOf(drive.driveId) === -1; });
};
exports.selectedDrivesOnDay = function (drives, day) {
    return drives.filter(function (drive) { return drive.startTime().toDateString() === day.toDateString(); });
};
exports.sortDrivesByDate = function (drives) {
    if (drives === undefined) {
        return [];
    }
    drives.sort(function (x1, x2) { return (x2.startTime().getTime() - x1.startTime().getTime()); });
    return drives;
};
exports.filterDeletedDrives = function (drives) {
    return drives.filter(function (x) { return (x.isDeleted === undefined || x.isDeleted === false); });
};
exports.roundNumber = function (num, pow) {
    if (pow === void 0) { pow = 2; }
    var factor = Math.pow(10, pow);
    return Math.round(num * factor) / factor;
};
var googleMapsStyle = 'style=element:geometry|color:0xebe3cd&style=element:labels.text.fill|color:0x523735&style=element:labels.text.stroke|color:0xf5f1e6&style=feature:administrative|element:geometry.stroke|color:0xc9b2a6&style=feature:administrative.land_parcel|element:geometry.stroke|color:0xdcd2be&style=feature:administrative.land_parcel|element:labels.text.fill|color:0xae9e90&style=feature:landscape.natural|element:geometry|color:0xdfd2ae&style=feature:poi|element:geometry|color:0xdfd2ae&style=feature:poi|element:labels.text.fill|color:0x93817c&style=feature:poi.park|element:geometry.fill|color:0xa5b076&style=feature:poi.park|element:labels.text.fill|color:0x447530&style=feature:road|element:geometry|color:0xf5f1e6&style=feature:road.arterial|element:geometry|color:0xfdfcf8&style=feature:road.highway|element:geometry|color:0xf8c967&style=feature:road.highway|element:geometry.stroke|color:0xe9bc62&style=feature:road.highway.controlled_access|element:geometry|color:0xe98d58&style=feature:road.highway.controlled_access|element:geometry.stroke|color:0xdb8555&style=feature:road.local|element:labels.text.fill|color:0x806b63&style=feature:transit.line|element:geometry|color:0xdfd2ae&style=feature:transit.line|element:labels.text.fill|color:0x8f7d77&style=feature:transit.line|element:labels.text.stroke|color:0xebe3cd&style=feature:transit.station|element:geometry|color:0xdfd2ae&style=feature:water|element:geometry.fill|color:0xb9d3c2&style=feature:water|element:labels.text.fill|color:0x92998d';
exports.getMapImage = function (pathColor, pathWeight, colorStart, colorEnd, locationArray, mapSize) {
    var formatUrl = function (latLonStr, startPoint, endPoint) {
        return 'https://maps.googleapis.com/maps/api/staticmap?path=color:' + pathColor + '|weight:' + pathWeight + '|' + latLonStr +
            '&size=' + mapSize.width + 'x' + mapSize.height + '&scale=2&maptype=roadmap&markers=size:mid|color:' + colorStart + '|label:|' + exports.roundNumber(startPoint.lat, 3) + ',' + exports.roundNumber(startPoint.lon, 3) + '&markers=size:mid|color:' + colorEnd + '|label:|'
            + exports.roundNumber(endPoint.lat, 3) + ',' + exports.roundNumber(endPoint.lon, 3);
    };
    return formatUrl(locationArray.map(function (x) { return exports.roundNumber(x.lat, 3) + ',' + exports.roundNumber(x.lon, 3); }).join('|'), locationArray[0], locationArray.slice(-1)[0]); // 0.001 ~ 111 m accuracy
};
exports.getArrayOfsavedLocations = function (map) {
    var arr = new Array();
    for (var key in map) {
        var val = map[key];
        if (val.name.length > 0) {
            arr.push(val);
        }
    }
    return arr;
};
exports.getSavedLocationIfExist = function (personalLocations, location, distance) {
    if (distance === void 0) { distance = 0.2; }
    var result = undefined;
    Object.keys(personalLocations).forEach(function (key) {
        var currPerLoc = personalLocations[key];
        if (YMLocation_1["default"].fromObject(currPerLoc.location).distanceFrom(location) < distance) {
            result = currPerLoc;
            return;
        }
    });
    return result;
};
exports.getPersonalNameIfExist = function (personalLocations, location, defaultName, distance) {
    if (distance === void 0) { distance = 0.2; }
    var name = defaultName;
    var savedLocation = exports.getSavedLocationIfExist(personalLocations, location, distance);
    return savedLocation ? savedLocation.name : name;
};
exports.milesToMetric = function (num, convert, roundFactor) {
    if (convert === void 0) { convert = true; }
    if (roundFactor === void 0) { roundFactor = 100; }
    return Math.round((convert ? Math.round(num * 1.60934) : num) * roundFactor) / roundFactor;
};
exports.metricToMiles = function (num, convert, roundFactor) {
    if (convert === void 0) { convert = true; }
    if (roundFactor === void 0) { roundFactor = 100; }
    return Math.round((convert ? Number(num / 1.60934) : num) * roundFactor) / roundFactor;
};
exports["default"] = {
    filterDrives: exports.filterDrives,
    selectedDrivesFromIds: exports.selectedDrivesFromIds,
    selectedDrivesOnDay: exports.selectedDrivesOnDay,
    addDays: exports.addDays,
    sortDrivesByDate: exports.sortDrivesByDate,
    filterDeletedDrives: exports.filterDeletedDrives,
    roundNumber: exports.roundNumber,
    getMapImage: exports.getMapImage,
    getArrayOfsavedLocations: exports.getArrayOfsavedLocations,
    getPersonalNameIfExist: exports.getPersonalNameIfExist,
    getSavedLocationIfExist: exports.getSavedLocationIfExist,
    milesToMetric: exports.milesToMetric,
    metricToMiles: exports.metricToMiles
};
