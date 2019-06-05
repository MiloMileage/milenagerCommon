import YMPurpose from '../src/common/YMPurpose'

const purposeObjOriginal =  {
    'purposeId': YMPurpose.defaultPuposesIds.personal,
    'rateId': '0',
    'name': 'name',
    'category': YMPurpose.categories.personal,
    'visible': true,
    'iconName': 'icon',
    'order' : 0
}

let purposeObj = purposeObjOriginal

beforeEach(() => {
    purposeObj =  JSON.parse(JSON.stringify(purposeObjOriginal))
});

test('Create from object', () => {
    const purpose = YMPurpose.fromObject(purposeObj)

    expect(purpose.category).toEqual(YMPurpose.categories.personal)
    expect(purpose.iconName).toEqual('icon')
    expect(purpose.name).toEqual('name')
    expect(purpose.order).toBe(0)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.personal)
    expect(purpose.rateId).toEqual('0')
    expect(purpose.visible).toBeTruthy()
})

test('Create from undefined', () => {
    const purpose = YMPurpose.fromObject(undefined)

    expect(purpose.category).toEqual('')
    expect(purpose.iconName).toEqual('')
    expect(purpose.name).toEqual('')
    expect(purpose.order).toBe(0)
    expect(purpose.purposeId).toEqual('')
    expect(purpose.rateId).toEqual('')
    expect(purpose.visible).toBeFalsy()
})

test('test purpose ids', () => {
    let purpose = YMPurpose.fromObject(purposeObj)

    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.personal)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.betweenOffices
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.betweenOffices)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.business
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.business)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.businessTravel
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.businessTravel)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.charity
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.charity)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.customerVisit
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.customerVisit)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.entertainment
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.entertainment)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.errand
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.errand)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.medical
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.medical)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.meeting
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.meeting)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.moving
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.moving)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.personal
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.personal)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.temporarySite
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.temporarySite)

    purposeObj.purposeId = YMPurpose.defaultPuposesIds.undetermined
    purpose = YMPurpose.fromObject(purposeObj)
    expect(purpose.purposeId).toEqual(YMPurpose.defaultPuposesIds.undetermined)
})

test('merge purpose array', () => {
    const purpose = YMPurpose.fromObject(purposeObj)
    purposeObj.purposeId = YMPurpose.defaultPuposesIds.entertainment
    const purpose2 = YMPurpose.fromObject(purposeObj)
    purposeObj.visible = false
    purposeObj.purposeId = YMPurpose.defaultPuposesIds.charity
    const purpose3 = YMPurpose.fromObject(purposeObj)
    purposeObj.purposeId = YMPurpose.defaultPuposesIds.entertainment
    const purpose4 = YMPurpose.fromObject(purposeObj)

    expect(YMPurpose.mergePuprosesArrays([purpose, purpose2], [purpose3, purpose4], false)).toEqual([purpose, purpose2, purpose3])

    expect(YMPurpose.mergePuprosesArrays([purpose, purpose2], [purpose3, purpose4])).toEqual([purpose, purpose2])
})

test('merge purpose array only second', () => {
    purposeObj.purposeId = YMPurpose.defaultPuposesIds.business
    const purpose = YMPurpose.fromObject(purposeObj)
    purposeObj.purposeId = YMPurpose.defaultPuposesIds.entertainment
    const purpose2 = YMPurpose.fromObject(purposeObj)
    purposeObj.purposeId = YMPurpose.defaultPuposesIds.charity
    const purpose3 = YMPurpose.fromObject(purposeObj)
    purposeObj.purposeId = YMPurpose.defaultPuposesIds.charity
    const purpose4 = YMPurpose.fromObject(purposeObj)

    const mergedArray = YMPurpose.mergePuprosesArrays(null, [purpose, purpose2, purpose3, purpose4])
    expect(mergedArray.length).toBe(3)
    expect(mergedArray[0].purposeId).toEqual(YMPurpose.defaultPuposesIds.business)
    expect(mergedArray[1].purposeId).toEqual(YMPurpose.defaultPuposesIds.entertainment)
    expect(mergedArray[2].purposeId).toEqual(YMPurpose.defaultPuposesIds.charity)
})

test('merge purpose array only first', () => {
    purposeObj.purposeId = YMPurpose.defaultPuposesIds.business
    const purpose = YMPurpose.fromObject(purposeObj)
    purposeObj.purposeId = YMPurpose.defaultPuposesIds.entertainment
    const purpose2 = YMPurpose.fromObject(purposeObj)
    purposeObj.purposeId = YMPurpose.defaultPuposesIds.charity
    const purpose3 = YMPurpose.fromObject(purposeObj)
    purposeObj.purposeId = YMPurpose.defaultPuposesIds.charity
    const purpose4 = YMPurpose.fromObject(purposeObj)

    const mergedArray = YMPurpose.mergePuprosesArrays([purpose, purpose2, purpose3, purpose4], null)
    expect(mergedArray.length).toBe(3)
    expect(mergedArray[0].purposeId).toEqual(YMPurpose.defaultPuposesIds.business)
    expect(mergedArray[1].purposeId).toEqual(YMPurpose.defaultPuposesIds.entertainment)
    expect(mergedArray[2].purposeId).toEqual(YMPurpose.defaultPuposesIds.charity)
})