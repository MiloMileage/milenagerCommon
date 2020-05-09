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
    constructor(displayName: string, creationDate: Date, lastSignInDate: Date, os: YMOsType, email: string);
    static fromObject: (obj: any) => YMUserInfo;
}
