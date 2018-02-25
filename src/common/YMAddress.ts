export default class YMAddress {
    name: string
    street: string
    streetNumber: string
    city: string
    zip: string
    country: string
    countryCode: string
    county: string
    state: string
    neighborhood: string
    areasOfInterest: Array<string>

    // tslint:disable-next-line:max-line-length
    constructor (name: string, street: string, streetNumber: string, city: string, zip: string, country: string,
        countryCode: string, county: string, state: string, neighborhood: string, areasOfInterest: Array<string>) {
        this.name = name
        this.street = street
        this.streetNumber = streetNumber
        this.city = city
        this.zip = zip
        this.country = country
        this.countryCode = countryCode
        this.county = county
        this.state = state
        this.neighborhood = neighborhood
        this.areasOfInterest = areasOfInterest
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMAddress('', '', '', '', '', '', '', '', '', '', [])
        // tslint:disable-next-line:max-line-length
        return new YMAddress(obj.name, obj.street, obj.streetNumber, obj.city, obj.zip, obj.country, obj.countryCode,
                                obj.county, obj.state, obj.neighborhood, obj.areasOfInterest)
    }
}
