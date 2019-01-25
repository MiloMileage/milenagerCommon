import YMTutorialCard from './YMTutorialCard';
export default class YMTutorialView {
    cards: Array<YMTutorialCard>;
    constructor(cards: Array<YMTutorialCard>);
    static fromObject: (obj: any) => YMTutorialView;
}
