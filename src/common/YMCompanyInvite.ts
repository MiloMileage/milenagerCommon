import {YMCompanyRole} from './YMCompanySettings'

export enum YMCompanyInviteStatus {
    PENDING = 'PENDING',
    JOINED = 'JOINED',
    LEFT = 'LEFT',
    DENIED = 'DENIED',
    REMOVED = 'REMOVED',
}

export default class YMCompanyInvite {
    status: YMCompanyInviteStatus
    sentTime: Date
    lastUpdatedTime: Date
    corpId: string
    email: string
    role: YMCompanyRole
    userId: string
    internalId: string

    constructor (status: YMCompanyInviteStatus, sentTime: Date, corpId: string, email: string, role: YMCompanyRole, lastUpdatedTime: Date, userId: string, internalId: string) {
        this.status = status
        this.sentTime = sentTime
        this.corpId = corpId
        this.email = email
        this.role = role
        this.lastUpdatedTime = lastUpdatedTime
        this.userId = userId
        this.internalId = internalId
    }

    approve() {
        this.lastUpdatedTime = new Date()
        this.status = YMCompanyInviteStatus.JOINED
    }

    leave() {
        this.lastUpdatedTime = new Date()
        this.status = YMCompanyInviteStatus.LEFT
    }

    static fromObject = function(obj: any) {
        if(obj == null) return new YMCompanyInvite(YMCompanyInviteStatus.PENDING, new Date(), '', '', YMCompanyRole.USER, new Date(), '', '')
        
        return new YMCompanyInvite(
            obj.status,
            obj.sentTime,
            obj.corpId,
            obj.email,
            obj.role,
            obj.lastUpdatedTime,
            obj.userId,
            obj.internalId
        )
    }
}