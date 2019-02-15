import YMTutorialView from './YMTutorialView';
export default class YMTutorialContainer {
    views: Array<YMTutorialView>;
    name: string;
    category: string;
    constructor(views: Array<YMTutorialView>, name: string, category: string);
    static fromObject: (obj: any) => YMTutorialContainer;
}
