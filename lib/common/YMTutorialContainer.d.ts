export default class YMTutorialContainer {
    tutorialId: string;
    name: string;
    constructor(tutorialId: string, name: string);
    static fromObject: (obj: any) => YMTutorialContainer;
}
