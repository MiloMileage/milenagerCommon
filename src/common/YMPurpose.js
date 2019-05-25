"use strict";
exports.__esModule = true;
var YMPurpose = /** @class */ (function () {
    function YMPurpose(purposeId, rateId, name, category, iconName, visible, order) {
        if (purposeId === void 0) { purposeId = 'id'; }
        if (rateId === void 0) { rateId = 'rateId'; }
        if (name === void 0) { name = 'name'; }
        if (category === void 0) { category = 'category'; }
        if (iconName === void 0) { iconName = 'iconName'; }
        if (visible === void 0) { visible = true; }
        if (order === void 0) { order = 0; }
        this.purposeId = purposeId;
        this.rateId = rateId;
        this.name = name;
        this.category = category;
        this.visible = visible;
        this.iconName = iconName;
        this.order = order;
    }
    // tslint:disable-next-line:member-ordering
    YMPurpose.fromObject = function (obj) {
        if (obj == null)
            return new YMPurpose('', '', '', '', '', false, 0);
        return new YMPurpose(obj.purposeId, obj.rateId, obj.name, obj.category, obj.iconName, obj.visible, obj.order);
    };
    YMPurpose.categories = {
        personal: 'personal',
        business: 'business'
    };
    YMPurpose.defaultPuposesIds = {
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
    };
    YMPurpose.mergePuprosesArrays = function (first, second, filterVisible) {
        if (filterVisible === void 0) { filterVisible = true; }
        var purposes = new Array();
        if (first) {
            for (var i = 0; i < first.length; i++) {
                purposes.push(YMPurpose.fromObject(JSON.parse(JSON.stringify(first[i]))));
            }
        }
        if (second) {
            var _loop_1 = function (i) {
                var purpose = second[i];
                if (purposes.filter(function (x) { return x.purposeId === purpose.purposeId; }).length === 0) {
                    purposes.push(YMPurpose.fromObject(JSON.parse(JSON.stringify(purpose))));
                }
            };
            for (var i = 0; i < second.length; i++) {
                _loop_1(i);
            }
        }
        return filterVisible ? purposes.filter(function (x) { return x.visible; }) : purposes;
    };
    return YMPurpose;
}());
exports["default"] = YMPurpose;
