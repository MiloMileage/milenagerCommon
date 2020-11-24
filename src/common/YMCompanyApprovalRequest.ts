import YMReport from "./YMReport"

export enum YMCompanyApprovalRequestStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DENIED = 'DENIED',
}

export default class YMCompanyApprovalRequest {
    approvalRequestId: string
    approverEmail: string
    corpId: string
    status: YMCompanyApprovalRequestStatus
    denyReason: string
    requesterEmail: string
    userId: string
    drivesReport: YMReport

    constructor (approvalRequestId: string, approverEmail: string, corpId: string, status: YMCompanyApprovalRequestStatus, denyReason: string, requesterEmail: string, userId: string, drivesReport: YMReport) {
        this.approvalRequestId = approvalRequestId
        this.approverEmail = approverEmail
        this.corpId = corpId
        this.status = status
        this.denyReason = denyReason
        this.requesterEmail = requesterEmail
        this.userId = userId
        this.drivesReport = YMReport.fromObject(drivesReport)
    }

    static fromObject = function(obj: any) {
        if(obj == null) return new YMCompanyApprovalRequest('', null, null, YMCompanyApprovalRequestStatus.PENDING, null, null, null, null)
        
        return new YMCompanyApprovalRequest(
            obj.approvalRequestId,
            obj.approverEmail,
            obj.corpId,
            obj.status,
            obj.denyReason,
            obj.requesterEmail,
            obj.userId,
            obj.drivesReport
        )
    }
}