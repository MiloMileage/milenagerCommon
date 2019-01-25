import YMImage from './YMImage';
export default class YMTutorialCard {
    headline: string;
    description: string;
    image: YMImage;
    constructor(headline: string, description: string, image: YMImage);
    static fromObject: (obj: any) => YMTutorialCard;
}
