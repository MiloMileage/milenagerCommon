export default class YMTutorialContainer {
    tutorialId: string
    name: string

    constructor (tutorialId: string, name: string) {
        this.tutorialId = tutorialId
        this.name = name
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMTutorialContainer('', '')
        
        return new YMTutorialContainer(obj.tutorialId, obj.name)
    }
}