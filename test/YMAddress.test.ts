import YMAddress from '../src/common/YMAddress'

test('Create from object', () => {
    const addressObj = {
        'name': 'name',
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

    const address = YMAddress.fromObject(addressObj) 

    expect(address.name).toEqual('name')
    expect(address.street).toEqual('street')
    expect(address.streetNumber).toEqual('streetNumber')
    expect(address.city).toEqual('city')
    expect(address.zip).toEqual('zip')
    expect(address.country).toEqual('country')
    expect(address.state).toEqual('state')
    expect(address.neighborhood).toEqual('neighborhood')
    expect(address.areasOfInterest).toEqual(['areasOfInterest1', 'areasOfInterest2'])
});

test('Create from empty object', () => {
    const address = YMAddress.fromObject(undefined) 

    expect(address.name).toEqual('')
    expect(address.street).toEqual('')
    expect(address.streetNumber).toEqual('')
    expect(address.city).toEqual('')
    expect(address.zip).toEqual('')
    expect(address.country).toEqual('')
    expect(address.state).toEqual('')
    expect(address.neighborhood).toEqual('')
    expect(address.areasOfInterest).toEqual([])
});
