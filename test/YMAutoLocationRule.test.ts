import YMAutoLocationRule from '../src/common/YMAutoLocationRule'

const autoLocationObj = {
    'ruleId': '1',
    'originSavedLocationId': '2',
    'destSavedLocationId': '3',
    'purposeId': '4'
}

test('Create from object', () => {
    const locRule = YMAutoLocationRule.fromObject(autoLocationObj)

    expect(locRule.ruleId).toEqual('1')
    expect(locRule.originSavedLocationId).toEqual('2')
    expect(locRule.destSavedLocationId).toEqual('3')
    expect(locRule.purposeId).toEqual('4')
})

test('Create from undefined', () => {
    const locRule = YMAutoLocationRule.fromObject(undefined)

    expect(locRule.ruleId).toEqual('')
    expect(locRule.originSavedLocationId).toEqual('')
    expect(locRule.destSavedLocationId).toEqual('')
    expect(locRule.purposeId).toEqual('')
})