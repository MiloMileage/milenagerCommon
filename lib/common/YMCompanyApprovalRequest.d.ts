import YMReport from "./YMReport";
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
    requesterEmail: string;
    userId: string;
    drivesReport: YMReport;
    constructor(approvalRequestId: string, approverEmail: string, corpId: string, status: YMCompanyApprovalRequestStatus, denyReason: string, requesterEmail: string, userId: string, drivesReport: YMReport);
    static fromObject: (obj: any) => YMCompanyApprovalRequest;
}
