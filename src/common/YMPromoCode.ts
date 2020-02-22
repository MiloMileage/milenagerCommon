export enum YMPromoCodeType {
    NONE = "NONE",
    DOUBLE = "DOUBLE",
    FREE_YEAR = "FREE_YEAR",
}

export default class YMPromoCode {
    name: string
    quantity: number
    clicks: Array<string>
    usages: Array<string>
    expiresAt: Date
    type: YMPromoCodeType

    constructor (name: string, quantity: number, clicks: Array<string>, usages: Array<string>, expiresAt: Date, type: YMPromoCodeType) {
        this.name = name
        this.quantity = quantity
        this.clicks = clicks
        this.usages = usages
        this.expiresAt = expiresAt
        this.type = type
    }

    static fromObject = function(obj: any) {
        if(obj == null) return new YMPromoCode('', 0, [], [], new Date(), YMPromoCodeType.DOUBLE)
        
        return new YMPromoCode(
            obj.name,
            obj.quantity,
            obj.clicks,
            obj.usages,
            obj.expiresAt,
            obj.type
        )
    }
}