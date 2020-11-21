export enum YMCompanyRole {
    ADMIN = 'ADMIN',
    APPROVER = 'APPROVER',
    USER = 'USER',
}

export default class YMCompanySettings {
    role: YMCompanyRole
    corpId: string
    inviteId: string
    dateAdded: Date
    internalId: string

    constructor (role: YMCompanyRole, corpId: string, inviteId: string, dateAdded: Date, internalId: string) {
        this.role = role
        this.corpId = corpId
        this.inviteId = inviteId
        this.dateAdded = dateAdded
        this.internalId = internalId
    }

    // tslint:disable-next-line:member-ordering
    static fromObject(obj) {
        if(obj == null) return new YMCompanySettings(YMCompanyRole.USER, '', '', new Date(), '')

        return new YMCompanySettings(obj.role, obj.corpId, obj.inviteId, obj.dateAdded, obj.internalId)
    }
}