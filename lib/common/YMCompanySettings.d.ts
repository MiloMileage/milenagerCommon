export declare enum YMCompanyRole {
    ADMIN = "ADMIN",
    APPROVER = "APPROVER",
    USER = "USER"
}
export default class YMCompanySettings {
    role: YMCompanyRole;
    corpId: string;
    inviteId: string;
    dateAdded: Date;
    constructor(role: YMCompanyRole, corpId: string, inviteId: string, dateAdded: Date);
    static fromObject(obj: any): YMCompanySettings;
}
