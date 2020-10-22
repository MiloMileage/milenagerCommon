export default class YMCompanyInfo {
    name: string;
    constructor(name: string);
    static fromObject: (obj: any) => YMCompanyInfo;
}
