"use strict";
exports.__esModule = true;
var YMAddress_1 = require("./YMAddress");
var common_1 = require("./../components/common");
var YMLocation = /** @class */ (function () {
    function YMLocation(address, lat, lon) {
        var _this = this;
        // tslint:disable-next-line:member-ordering
        this.getLatLonKey = function () {
            var key = ('' + common_1.roundNumber(this.lat, 2) + '_' + common_1.roundNumber(this.lon, 2)).replace('.', '*').replace('.', '*');
            return key;
        };
        this.distanceFrom = function (loc) {
            var radlat1 = Math.PI * this.lat / 180;
            var radlat2 = Math.PI * loc.lat / 180;
            var theta = this.lon - loc.lon;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344; // transform from miles to km
            return dist;
        };
        this.getPrettyAddress = function () {
            if (_this.address.name && _this.address.name.length > 0) {
                return _this.address.name;
            }
            if (_this.address.neighborhood && _this.address.neighborhood.length > 0) {
                return _this.address.neighborhood;
            }
            if (_this.address.street && _this.address.street.length > 0) {
                return _this.address.street;
            }
            if (_this.address.city && _this.address.city.length > 0) {
                return _this.address.city;
            }
            if (_this.address.county && _this.address.county.length > 0) {
                return _this.address.county;
            }
            if (_this.address.country && _this.address.country.length > 0) {
                return _this.address.country;
            }
            return 'Unknown';
        };
        this.address = YMAddress_1["default"].fromObject(address);
        this.lat = lat;
        this.lon = lon;
    }
    // tslint:disable-next-line:member-ordering
    YMLocation.fromObject = function (obj) {
        if (obj == null)
            return new YMLocation(YMAddress_1["default"].fromObject(undefined), 0, 0);
        return new YMLocation(obj.address, obj.lat, obj.lon);
    };
    return YMLocation;
}());
exports["default"] = YMLocation;
