export default class YMPurpose {
    purposeId: string
    rateId: string
    name: string
    category: string
    visible: boolean
    iconName: string
    order: number

    constructor (purposeId = 'id', rateId = 'rateId', name = 'name', category = 'category', iconName = 'iconName', visible: boolean = true, order: number = 0) {
        this.purposeId = purposeId
        this.rateId = rateId
        this.name = name
        this.category = category
        this.visible = visible
        this.iconName = iconName
        this.order = order
    }

    // tslint:disable-next-line:member-ordering
    static fromObject = function(obj: any) {
        if(obj == null) return new YMPurpose('', '', '', '', '', false, 0)

        return new YMPurpose(obj.purposeId, obj.rateId, obj.name, obj.category, obj.iconName, obj.visible, obj.order)
    }

    static categories = {
        personal: 'personal',
        business: 'business'
    }

    static defaultPuposesIds = {
        undetermined: '-1',
        business: '0',
        charity: '1',
        moving: '2',
        medical: '3',
        personal: '4',
        betweenOffices: '5',
        customerVisit: '6',
        meeting: '7',
        errand: '8',
        entertainment: '9',
        temporarySite: '10',
        businessTravel: '11'
    }

    static mergePuprosesArrays = (first: Array<YMPurpose>, second: Array<YMPurpose>) => {
        const purposes = new Array<YMPurpose>()
        
        if (first) {
            for(let i=0; i<first.length; i++) {
                purposes.push(YMPurpose.fromObject(JSON.parse(JSON.stringify(first[i]))))
            }
        }
        
        if (second) {
            for(let i=0; i<second.length; i++) {
                const purpose = second[i]
                if (purposes.filter(x => x.purposeId === purpose.purposeId).length === 0) {
                    purposes.push(YMPurpose.fromObject(JSON.parse(JSON.stringify(purpose))))
                }
            }
        }

        return purposes
    }
}