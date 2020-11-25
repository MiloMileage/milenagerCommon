export default class YMCompanyInfo {
    name: string
    creatorEmail: string
    supportEmail: string
    createdDate: Date
    updatedDate: Date

    constructor (name: string, creatorEmail: string, supportEmail: string, createdDate: Date, updatedDate: Date) {
        this.name = name
        this.supportEmail = supportEmail
        this.creatorEmail = creatorEmail
        this.createdDate = createdDate
        this.updatedDate = updatedDate
    }

    static fromObject = function(obj: any) {
        if(obj == null) return new YMCompanyInfo('', '', '', new Date(), new Date())
        
        return new YMCompanyInfo(
            obj.name,
            obj.creatorEmail,
            obj.supportEmail,
            obj.createdDate,
            obj.updatedDate
        )
    }
}