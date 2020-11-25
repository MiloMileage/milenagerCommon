export default class YMCompanyInfo {
    name: string;
    creatorEmail: string;
    supportEmail: string;
    createdDate: Date;
    updatedDate: Date;
    constructor(name: string, creatorEmail: string, supportEmail: string, createdDate: Date, updatedDate: Date);
    static fromObject: (obj: any) => YMCompanyInfo;
}
