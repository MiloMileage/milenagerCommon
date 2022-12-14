import { YMCompanyRole } from './YMCompanySettings';
export declare enum YMCompanyInviteStatus {
    PENDING = "PENDING",
    JOINED = "JOINED",
    LEFT = "LEFT",
    DENIED = "DENIED",
    REMOVED = "REMOVED"
}
export default class YMCompanyInvite {
    status: YMCompanyInviteStatus;
    sentTime: Date;
    lastUpdatedTime: Date;
    corpId: string;
    email: string;
    role: YMCompanyRole;
    userId: string;
    internalId: string;
    constructor(status: YMCompanyInviteStatus, sentTime: Date, corpId: string, email: string, role: YMCompanyRole, lastUpdatedTime: Date, userId: string, internalId: string);
    approve(): void;
    leave(): void;
    static fromObject: (obj: any) => YMCompanyInvite;
}
