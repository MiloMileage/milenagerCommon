export interface AppleServerNotification {
    latest_receipt:                    string;
    auto_renew_status_change_date:     string;
    environment:                       string;
    auto_renew_status:                 string;
    auto_renew_status_change_date_pst: string;
    latest_receipt_info:               LatestReceiptInfo;
    unified_receipt:                   UnifiedReceipt;
    password:                          string;
    auto_renew_status_change_date_ms:  string;
    auto_renew_product_id:             string;
    notification_type:                 NotificationType;
    latest_expired_receipt:            string;
}

export enum NotificationType {
    CANCEL = "CANCEL",
    DID_CHANGE_RENEWAL_PREF = "DID_CHANGE_RENEWAL_PREF",
    DID_CHANGE_RENEWAL_STATUS = "DID_CHANGE_RENEWAL_STATUS",
    DID_FAIL_TO_RENEW = "DID_FAIL_TO_RENEW",
    DID_RECOVER = "DID_RECOVER",
    INITIAL_BUY = "INITIAL_BUY",
    INTERACTIVE_RENEWAL = "INTERACTIVE_RENEWAL",
    RENEWAL = "RENEWAL"
}

export interface LatestReceiptInfo {
    original_purchase_date_pst: string;
    quantity: string;
    subscription_group_identifier: string;
    unique_vendor_identifier: string;
    original_purchase_date_ms: string;
    expires_date_formatted: string;
    is_in_intro_offer_period: string;
    purchase_date_ms: string;
    expires_date_formatted_pst: string;
    is_trial_period: string;
    unique_identifier: string;
    original_transaction_id: string;
    expires_date: string;
    transaction_id: string;
    bvrs: string;
    web_order_line_item_id: string;
    version_external_identifier: string;
    bid: string;
    product_id: string;
    purchase_date: string;
    purchase_date_pst: string;
    original_purchase_date: string;
}

export interface UnifiedReceipt {
    latest_receipt:       string;
    pending_renewal_info: PendingRenewalInfo[];
    environment:          string;
    status:               number;
    latest_receipt_info:  LatestReceiptInfo[];
}

export interface PendingRenewalInfo {
    original_transaction_id: string;
    product_id:              string;
    auto_renew_status:       string;
    auto_renew_product_id:   string;
}

export interface LatestReceiptInfo {
    expires_date_pst:       string;
    purchase_date:       string;
    purchase_date_ms:       string;
    original_purchase_date_ms:       string;
    transaction_id:       string;
    original_transaction_id:       string;
    quantity:       string;
    expires_date_ms:       string;
    original_purchase_date_pst:       string;
    product_id:       string;
    subscription_group_identifier:       string;
    web_order_line_item_id:       string;
    expires_date:       string;
    is_in_intro_offer_period:       string;
    original_purchase_date:       string;
    purchase_date_pst:       string;
    is_trial_period:       string;
}
