export default class YMSubscription {
    subscriptionId: string;
    subscriptionType: string;
    startDate: Date;
    endDate: Date;
    constructor(subscriptionId?: string, subscriptionType?: string, startDate?: Date, endDate?: Date);
    static fromObject: (obj: any) => YMSubscription;
}
