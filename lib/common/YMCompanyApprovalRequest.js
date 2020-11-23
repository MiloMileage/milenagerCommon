"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YMCompanyApprovalRequestStatus;
(function (YMCompanyApprovalRequestStatus) {
    YMCompanyApprovalRequestStatus["PENDING"] = "PENDING";
    YMCompanyApprovalRequestStatus["APPROVED"] = "APPROVED";
    YMCompanyApprovalRequestStatus["DENIED"] = "DENIED";
})(YMCompanyApprovalRequestStatus = exports.YMCompanyApprovalRequestStatus || (exports.YMCompanyApprovalRequestStatus = {}));
class YMCompanyApprovalRequest {
    constructor(approvalRequestId, approverEmail, corpId, status, denyReason) {
        this.approvalRequestId = approvalRequestId;
        this.approverEmail = approverEmail;
        this.corpId = corpId;
        this.status = status;
    }
}
YMCompanyApprovalRequest.fromObject = function (obj) {
    if (obj == null)
        return new YMCompanyApprovalRequest('', null, null, YMCompanyApprovalRequestStatus.PENDING, null);
    return new YMCompanyApprovalRequest(obj.approvalRequestId, obj.approverEmail, obj.corpId, obj.status, obj.denyReason);
};
exports.default = YMCompanyApprovalRequest;
//# sourceMappingURL=YMCompanyApprovalRequest.js.map