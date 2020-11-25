export default class YMCompanyInfo {
    name: string
    creatorEmail: string
    supportEmail: string

    constructor (name: string, creatorEmail: string, supportEmail: string) {
        this.name = name
        this.supportEmail = supportEmail
        this.creatorEmail = creatorEmail
    }

    static fromObject = function(obj: any) {
        if(obj == null) return new YMCompanyInfo('', '', '')
        
        return new YMCompanyInfo(
            obj.name,
            obj.creatorEmail,
            obj.supportEmail,
        )
    }
}