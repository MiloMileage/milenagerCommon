"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YMAddress {
    // tslint:disable-next-line:max-line-length
    constructor(name, street, streetNumber, city, zip, country, countryCode, county, state, neighborhood, areasOfInterest) {
        this.name = name;
        this.street = street;
        this.streetNumber = streetNumber;
        this.city = city;
        this.zip = zip;
        this.country = country;
        this.countryCode = countryCode;
        this.county = county;
        this.state = state;
        this.neighborhood = neighborhood;
        this.areasOfInterest = areasOfInterest;
    }
}
exports.default = YMAddress;
// tslint:disable-next-line:member-ordering
YMAddress.fromObject = function (obj) {
    if (obj == null)
        return new YMAddress('', '', '', '', '', '', '', '', '', '', []);
    // tslint:disable-next-line:max-line-length
    return new YMAddress(obj.name, obj.street, obj.streetNumber, obj.city, obj.zip, obj.country, obj.countryCode, obj.county, obj.state, obj.neighborhood, obj.areasOfInterest);
};
//# sourceMappingURL=YMAddress.js.map