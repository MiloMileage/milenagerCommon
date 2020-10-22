export default class YMCompanyInfo {
    name: string

    constructor (name: string) {
        this.name = name
    }

    static fromObject = function(obj: any) {
        if(obj == null) return new YMCompanyInfo('')
        
        return new YMCompanyInfo(
            obj.name,
        )
    }
}