import YMAddress from '../src/common/YMAddress'
import YMDrive from '../src/common/YMDrive'
import YMReport from '../src/common/YMReport'
import YMDateRange from '../src/common/YMDateRange'

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
    "drivePurposeId": "0",
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

test('Create Report with 1 drive', () => {
    const drive = YMDrive.fromObject(driveObj)

    const report = new YMReport(
        'ReportName',
        new Date(),
        'myName',
        'myProject',
        'customDetails',
        'details',
        0.1,
        0.2,
        0.3,
        0.4,
        false,
        new YMDateRange(2019, 0, 1, 2020, 1, 0, 0),
        [],
        [],
        [],
        'reportId',
        'csvLink',
        'pdfLink',
        false
    )

    expect(report.getBusinessMiles()).toBe(0)

    report.addDriveValue()
});