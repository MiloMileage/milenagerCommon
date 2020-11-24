"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMReport_1 = require("./YMReport");
var YMCompanyApprovalRequestStatus;
(function (YMCompanyApprovalRequestStatus) {
    YMCompanyApprovalRequestStatus["PENDING"] = "PENDING";
    YMCompanyApprovalRequestStatus["APPROVED"] = "APPROVED";
    YMCompanyApprovalRequestStatus["DENIED"] = "DENIED";
})(YMCompanyApprovalRequestStatus = exports.YMCompanyApprovalRequestStatus || (exports.YMCompanyApprovalRequestStatus = {}));
class YMCompanyApprovalRequest {
    constructor(approvalRequestId, approverEmail, corpId, status, denyReason, requesterEmail, userId, drivesReport, createdDate, updatedDate) {
        this.approvalRequestId = approvalRequestId;
        this.approverEmail = approverEmail;
        this.corpId = corpId;
        this.status = status;
        this.denyReason = denyReason;
        this.requesterEmail = requesterEmail;
        this.userId = userId;
        this.drivesReport = YMReport_1.default.fromObject(drivesReport);
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
}
YMCompanyApprovalRequest.fromObject = function (obj) {
    if (obj == null)
        return new YMCompanyApprovalRequest('', null, null, YMCompanyApprovalRequestStatus.PENDING, null, null, null, null, new Date(), new Date());
    return new YMCompanyApprovalRequest(obj.approvalRequestId, obj.approverEmail, obj.corpId, obj.status, obj.denyReason, obj.requesterEmail, obj.userId, obj.drivesReport, obj.createdDate, obj.updatedDate);
};
exports.default = YMCompanyApprovalRequest;
//# sourceMappingURL=YMCompanyApprovalRequest.js.map