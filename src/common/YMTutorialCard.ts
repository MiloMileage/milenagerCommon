import YMImage from './YMImage'

export default class YMTutorialCard {
    headline: string
    description: string
    image: YMImage

    constructor (headline: string, description: string, image: YMImage) {
        this.headline = headline
        this.description = description
        this.image = image == null ? YMImage.fromObject(undefined) : image
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMTutorialCard('', '', undefined)
        
        return new YMTutorialCard(obj.headline, obj.description, obj.image)
    }
}