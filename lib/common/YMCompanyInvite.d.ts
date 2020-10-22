import { YMCompanyRole } from './YMCompanySettings';
export declare enum YMCompanyInviteStatus {
    PENDING = "PENDING",
    JOINED = "JOINED",
    LEFT = "LEFT"
}
export default class YMCompanyInvite {
    status: YMCompanyInviteStatus;
    sentTime: Date;
    lastUpdatedTime: Date;
    corpId: string;
    email: string;
    role: YMCompanyRole;
    constructor(status: YMCompanyInviteStatus, sentTime: Date, corpId: string, email: string, role: YMCompanyRole, lastUpdatedTime: Date);
    approve(): void;
    leave(): void;
    static fromObject: (obj: any) => YMCompanyInvite;
}
