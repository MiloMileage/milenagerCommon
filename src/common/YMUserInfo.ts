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
    secondaryEmails: Array<string>
    applePrivateEmail: string
    emailBeforeValidation: string

    constructor (displayName: string, creationDate: Date, lastSignInDate: Date, os: YMOsType, email: string, secondaryEmails: Array<string>, applePrivateEmail: string, emailBeforeValidation: string) {
        this.displayName = displayName
        this.creationDate = creationDate
        this.lastSignInDate = lastSignInDate
        this.os = os
        this.email = email
        this.secondaryEmails = secondaryEmails == null ? [] : secondaryEmails
        this.applePrivateEmail = applePrivateEmail
        this.emailBeforeValidation = emailBeforeValidation
    }

    static fromObject = function(obj: any) {
        if(obj == null) return new YMUserInfo('', new Date(), new Date(), YMOsType.unknown, '', [], undefined, undefined)
        
        return new YMUserInfo(
            obj.displayName,
            obj.creationDate,
            obj.lastSignInDate,
            obj.os,
            obj.email,
            obj.secondaryEmails,
            obj.applePrivateEmail,
            obj.emailBeforeValidation,
        )
    }
}