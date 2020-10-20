export declare enum YMOsType {
    ios = 0,
    android = 1,
    unknown = 2
}
export default class YMUserInfo {
    displayName: string;
    creationDate: Date;
    lastSignInDate: Date;
    os: YMOsType;
    email: string;
    secondaryEmails: Array<string>;
    applePrivateEmail: string;
    constructor(displayName: string, creationDate: Date, lastSignInDate: Date, os: YMOsType, email: string, secondaryEmails: Array<string>, applePrivateEmail: string);
    static fromObject: (obj: any) => YMUserInfo;
}
