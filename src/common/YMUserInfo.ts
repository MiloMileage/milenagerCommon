export enum YMOsType { 
    ios,
    android,
    unknown
}

export default class YMUserInfo {
    displayName: string
    creationDate: Date
    lastSignInDate: Date
    os: YMOsType
    email: string

    constructor (displayName: string, creationDate: Date, lastSignInDate: Date, os: YMOsType, email: string) {
        this.displayName = displayName
        this.creationDate = creationDate
        this.lastSignInDate = lastSignInDate
        this.os = os
        this.email = email
    }

    static fromObject = function(obj: any) {
        if(obj == null) return new YMUserInfo('', new Date(), new Date(), YMOsType.unknown, '')
        
        return new YMUserInfo(
            obj.displayName,
            obj.creationDate,
            obj.lastSignInDate,
            obj.os,
            obj.email
        )
    }
}