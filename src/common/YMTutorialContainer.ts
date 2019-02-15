import YMTutorialView from './YMTutorialView'

export default class YMTutorialContainer {
    views: Array<YMTutorialView>
    name: string
    category: string

    constructor (views: Array<YMTutorialView>, name: string, category: string) {
        this.views = views == null ? new Array<YMTutorialView>() : views.map(v => YMTutorialView.fromObject(v))
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMTutorialContainer(new Array<YMTutorialView>(), '', '')
        
        return new YMTutorialContainer(obj.views, obj.name, obj.category)
    }
}