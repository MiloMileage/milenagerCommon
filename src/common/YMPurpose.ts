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

        return new YMPurpose(obj.purposeId, obj.rateId, obj.name, obj.category, obj.iconName, obj.visible, 0)
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
}