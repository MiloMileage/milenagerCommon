export default class YMAddress {
    name: string;
    street: string;
    streetNumber: string;
    city: string;
    zip: string;
    country: string;
    countryCode: string;
    county: string;
    state: string;
    neighborhood: string;
    areasOfInterest: Array<string>;
    constructor(name: string, street: string, streetNumber: string, city: string, zip: string, country: string, countryCode: string, county: string, state: string, neighborhood: string, areasOfInterest: Array<string>);
    static fromObject: (obj: any) => YMAddress;
}
