import YMDrive from '../src/common/YMDrive'
import YMAddress from '../src/common/YMAddress'
import * as Moment from 'moment'

const originAddress = {
    'name': 'origin',
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

const origin = {
    "address": YMAddress.fromObject(originAddress),
    "lat": 1.2983,
    "lon": 2.333,
}

const destAddress = {
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

const dest = {
    "address": YMAddress.fromObject(destAddress),
    "lat": 1.2983,
    "lon": 2.333,
}

const notes = {
    'note': 'myNote',
    'parkingMoney': 13,
    'tollMoney': 10,
}

const startTimestamp = 1559319730
const endTimestamp = 1559119730
const timezoneOffset = 60*60*3

const driveObj = {
    "obj_db_id": "1234",
    "driveId": "drive_id",
    "vehicleId": "vehicle_id",
    "drivePurposeId": "drive_purposeId",
    "miles": 100,
    "origin": origin,
    "dest": dest,
    "routeLocations": [origin, dest],
    "endTimeTimestampUtc": endTimestamp,
    "driveNotes": notes,
    "isVisible": true,
    "isDeleted": false,
    "isClassified": true,
    "isAutoWorkHours": true,
    "isAutoLocation": true,
    "isManual": false,
    "joinedFromIds": [],
    "lastUpdated": 1559319800,
    "startTimeTimestampUtc": startTimestamp,
    "timestampOffsetInSeconds": timezoneOffset,
    "deletionReason": 'delete',
    "signalSource": 'source',
    "didApplyDefaults": true
}

test('Create from object', () => {
    const drive = YMDrive.fromObject(driveObj)

    expect(drive.deletionReason).toEqual('delete')
    expect(drive.signalSource).toEqual('source')
    expect(drive.dest.address.name).toEqual('dest')
    expect(drive.origin.address.name).toEqual('origin')
    expect(drive.routeLocations[1].address.name).toEqual('dest')
    expect(drive.routeLocations[0].address.name).toEqual('origin')
    expect(drive.driveId).toEqual('drive_id')
    expect(drive.driveNotes.note).toEqual('myNote')
    expect(drive.drivePurposeId).toEqual('drive_purposeId')
    expect(drive.obj_db_id).toEqual('1234')
    expect(drive.vehicleId).toEqual('vehicle_id')
    expect(drive.miles).toBe(100)
    expect(drive.endTimeTimestampUtc).toBe(endTimestamp)
    expect(drive.lastUpdated).toBe(1559319800)
    expect(drive.startTimeTimestampUtc).toBe(startTimestamp)
    expect(drive.timestampOffsetInSeconds).toBe(timezoneOffset)
    expect(drive.didApplyDefaults).toBeTruthy()
    expect(drive.isVisible).toBeTruthy()
    expect(drive.isClassified).toBeTruthy()
    expect(drive.isManual).toBeFalsy()
});

test('startTimeInUtcEnv test', () => {
    const drive = YMDrive.fromObject(driveObj)

    expect(Moment(drive.startTimeInUtcEnv()).format()).toEqual(Moment((startTimestamp + timezoneOffset) * 1000).format())
    expect(Moment(drive.endTimeInUtcEnv()).format()).toEqual(Moment((endTimestamp + timezoneOffset) * 1000).format())
});