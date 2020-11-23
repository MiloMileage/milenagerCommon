
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

    constructor (approvalRequestId: string, approverEmail: string, corpId: string, status: YMCompanyApprovalRequestStatus, denyReason: string) {
        this.approvalRequestId = approvalRequestId
        this.approverEmail = approverEmail
        this.corpId = corpId
        this.status = status
    }

    static fromObject = function(obj: any) {
        if(obj == null) return new YMCompanyApprovalRequest('', null, null, YMCompanyApprovalRequestStatus.PENDING, null)
        
        return new YMCompanyApprovalRequest(
            obj.approvalRequestId,
            obj.approverEmail,
            obj.corpId,
            obj.status,
            obj.denyReason,
        )
    }
}