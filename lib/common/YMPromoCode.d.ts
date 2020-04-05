export declare enum YMPromoCodeType {
    NONE = "NONE",
    DOUBLE = "DOUBLE",
    FREE_YEAR = "FREE_YEAR"
}
export declare enum YMPromoCodeUsageType {
    ANNUAL = "ANNUAL",
    MONTHLY = "MONTHLY"
}
export default class YMPromoCode {
    name: string;
    quantity: number;
    clicks: Array<{
        userId: string;
        uniqueId: string;
    }>;
    usages: Array<{
        userId: string;
        uniqueId: string;
        type: YMPromoCodeUsageType;
    }>;
    expiresAt: Date;
    type: YMPromoCodeType;
    constructor(name: string, quantity: number, clicks: Array<{
        userId: string;
        uniqueId: string;
    }>, usages: Array<{
        userId: string;
        uniqueId: string;
        type: YMPromoCodeUsageType;
    }>, expiresAt: Date, type: YMPromoCodeType);
    static fromObject: (obj: any) => YMPromoCode;
}
