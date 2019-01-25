export default class YMImage {
    width: number;
    height: number;
    url: string;
    showBorder: boolean;
    constructor(width: number, height: number, url: string, showBorder: boolean);
    static fromObject: (obj: any) => YMImage;
}
