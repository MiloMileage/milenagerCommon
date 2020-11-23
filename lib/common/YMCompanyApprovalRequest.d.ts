export declare enum YMCompanyApprovalRequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    DENIED = "DENIED"
}
export default class YMCompanyApprovalRequest {
    approvalRequestId: string;
    approverEmail: string;
    corpId: string;
    status: YMCompanyApprovalRequestStatus;
    denyReason: string;
    constructor(approvalRequestId: string, approverEmail: string, corpId: string, status: YMCompanyApprovalRequestStatus, denyReason: string);
    static fromObject: (obj: any) => YMCompanyApprovalRequest;
}
