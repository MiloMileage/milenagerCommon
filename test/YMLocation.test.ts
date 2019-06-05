import YMLocation from '../src/common/YMLocation'

const address = {
    'name': 'dest',
    'street': 'street',
    'streetNumber': 'streetNumber',
    'city': 'city',
    'zip': 'zip',
    'country': 'country',
    'countryCode' :'countryCode',
    'county': 'county',
    'state': 'state',
    'neighborhood': 'neighborhood',
    'areasOfInterest': ['areasOfInterest1', 'areasOfInterest2']
}

const loc = {
    "address": address,
    "lat": 37.789002,
    "lon": -122.441236,
}
 
const loc2 = {
    "address": address,
    "lat": 37.805644,
    "lon": -122.443982,
}

test('Create from object', () => {
    const location = YMLocation.fromObject(loc)

    expect(location.lat).toBe(37.789002)
    expect(location.lon).toBe(-122.441236)
    expect(location.address.name).toEqual('dest')
    expect(location.address.street).toEqual('street')
    expect(location.address.streetNumber).toEqual('streetNumber')
    expect(location.address.city).toEqual('city')
    expect(location.address.zip).toEqual('zip')
    expect(location.address.country).toEqual('country')
    expect(location.address.state).toEqual('state')
    expect(location.address.neighborhood).toEqual('neighborhood')
    expect(location.address.areasOfInterest).toEqual(['areasOfInterest1', 'areasOfInterest2'])
})

test('Create from default', () => {
    const location = YMLocation.fromObject(undefined)

    expect(location.lat).toBe(0)
    expect(location.lon).toBe(0)
    expect(location.address.name).toEqual('')
    expect(location.address.street).toEqual('')
    expect(location.address.streetNumber).toEqual('')
    expect(location.address.city).toEqual('')
    expect(location.address.zip).toEqual('')
    expect(location.address.country).toEqual('')
    expect(location.address.state).toEqual('')
    expect(location.address.neighborhood).toEqual('')
    expect(location.address.areasOfInterest).toEqual([])
})

test('Location Distance from', () => {
    const location = YMLocation.fromObject(loc)
    const location2 = YMLocation.fromObject(loc2)

    expect(location.distanceFrom(location2)).toBeCloseTo(1.86607, 4)
})

test('Location getLatLonKey', () => {
    const location = YMLocation.fromObject(loc)

    expect(location.getLatLonKey()).toEqual('37*79_-122*44')
})

test('Location getLatLonKey', () => {
    let location = YMLocation.fromObject(JSON.parse(JSON.stringify(loc)))

    expect(location.getPrettyAddress()).toEqual('dest')

    loc.address.name = ''
    location = YMLocation.fromObject(loc)
    expect(location.getPrettyAddress()).toEqual('neighborhood')

    loc.address.neighborhood = ''
    location = YMLocation.fromObject(loc)
    expect(location.getPrettyAddress()).toEqual('street')

    loc.address.street = ''
    location = YMLocation.fromObject(loc)
    expect(location.getPrettyAddress()).toEqual('city')

    loc.address.city = ''
    location = YMLocation.fromObject(loc)
    expect(location.getPrettyAddress()).toEqual('county')

    loc.address.county = ''
    location = YMLocation.fromObject(loc)
    expect(location.getPrettyAddress()).toEqual('country')

    loc.address.country = ''
    location = YMLocation.fromObject(loc)
    expect(location.getPrettyAddress()).toEqual('Unknown')
})