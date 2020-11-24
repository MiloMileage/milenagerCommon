"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YMCompanyApprovalRequestStatus;
(function (YMCompanyApprovalRequestStatus) {
    YMCompanyApprovalRequestStatus["PENDING"] = "PENDING";
    YMCompanyApprovalRequestStatus["APPROVED"] = "APPROVED";
    YMCompanyApprovalRequestStatus["DENIED"] = "DENIED";
})(YMCompanyApprovalRequestStatus = exports.YMCompanyApprovalRequestStatus || (exports.YMCompanyApprovalRequestStatus = {}));
class YMCompanyApprovalRequest {
    constructor(approvalRequestId, approverEmail, corpId, status, denyReason, requesterEmail, reportId, userId, drivesReport) {
        this.approvalRequestId = approvalRequestId;
        this.approverEmail = approverEmail;
        this.corpId = corpId;
        this.status = status;
        this.denyReason = denyReason;
        this.requesterEmail = requesterEmail;
        this.reportId = reportId;
        this.userId = userId;
    }
}
YMCompanyApprovalRequest.fromObject = function (obj) {
    if (obj == null)
        return new YMCompanyApprovalRequest('', null, null, YMCompanyApprovalRequestStatus.PENDING, null, null, null, null, null);
    return new YMCompanyApprovalRequest(obj.approvalRequestId, obj.approverEmail, obj.corpId, obj.status, obj.denyReason, obj.requesterEmail, obj.reportId, obj.userId, obj.drivesReport);
};
exports.default = YMCompanyApprovalRequest;
//# sourceMappingURL=YMCompanyApprovalRequest.js.map