import YMTutorialCard from './YMTutorialCard'

export default class YMTutorialView {
    cards: Array<YMTutorialCard>

    constructor (cards: Array<YMTutorialCard>) {
        this.cards = cards == null ? new Array<YMTutorialCard>() : cards.map(c => YMTutorialCard.fromObject(c))
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMTutorialView(new Array<YMTutorialCard>())
        
        return new YMTutorialView(obj.cards)
    }
}