import YMDriveNotes from '../src/common/YMDriveNotes'

const notesObj = {
    'note': 'myNote',
    'parkingMoney': 13,
    'tollMoney': 10,
}

test('Create from object', () => {
    const note = YMDriveNotes.fromObject(notesObj)

    expect(note.note).toEqual('myNote')
    expect(note.parkingMoney).toBe(13)
    expect(note.tollMoney).toBe(10)
})

test('Create from undefined', () => {
    const note = YMDriveNotes.fromObject(undefined)

    expect(note.note).toEqual('')
    expect(note.parkingMoney).toBe(0)
    expect(note.tollMoney).toBe(0)
})