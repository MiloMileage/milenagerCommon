export default class YMCompanyInfo {
    name: string;
    creatorEmail: string;
    supportEmail: string;
    constructor(name: string, creatorEmail: string, supportEmail: string);
    static fromObject: (obj: any) => YMCompanyInfo;
}
