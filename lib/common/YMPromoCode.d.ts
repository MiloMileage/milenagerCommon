export declare enum YMPromoCodeType {
    NONE = "NONE",
    DOUBLE = "DOUBLE",
    FREE_YEAR = "FREE_YEAR"
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
    }>;
    expiresAt: Date;
    type: YMPromoCodeType;
    constructor(name: string, quantity: number, clicks: Array<{
        userId: string;
        uniqueId: string;
    }>, usages: Array<{
        userId: string;
        uniqueId: string;
    }>, expiresAt: Date, type: YMPromoCodeType);
    static fromObject: (obj: any) => YMPromoCode;
}
