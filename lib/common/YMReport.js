"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YMDateRange_1 = require("./YMDateRange");
const YMReportLine_1 = require("./YMReportLine");
const YMReportVehicleLine_1 = require("./YMReportVehicleLine");
const YMUserSettings_1 = require("./YMUserSettings");
const YMGlobalUserSettings_1 = require("./YMGlobalUserSettings");
const common_1 = require("./../components/common");
const Moment = require("moment");
const YMRate_1 = require("./YMRate");
const YMPurpose_1 = require("./YMPurpose");
const YMVehicle_1 = require("./YMVehicle");
class YMReport {
    constructor(reportName, dateCreated, name, project, customerDetails, details, userSettings, globalSettings, isMetricSystem, dateRange, lines, vehicleBusinessLines, vehiclePersonalLines, reportId, csvLink, pdfLink, isOutsideOfSubscriptionPeriod, moneySymbol, approvalRequestId, isApproved, denyReason) {
        this.reportName = reportName;
        this.dateCreated = dateCreated;
        this.name = name;
        this.project = project;
        this.customerDetails = customerDetails;
        this.details = details;
        this.userSettings = YMUserSettings_1.default.fromObject(userSettings);
        this.globalSettings = YMGlobalUserSettings_1.default.fromObject(globalSettings);
        this.isMetricSystem = isMetricSystem;
        this.dateRange = YMDateRange_1.default.fromObject(dateRange);
        this.lines = lines.map(line => YMReportLine_1.default.fromObject(line));
        this.vehicleBusinessLines = vehicleBusinessLines.map(line => YMReportVehicleLine_1.default.fromObject(line));
        this.vehiclePersonalLines = vehiclePersonalLines.map(line => YMReportVehicleLine_1.default.fromObject(line));
        this.reportId = reportId;
        this.csvLink = csvLink;
        this.pdfLink = pdfLink;
        this.isOutsideOfSubscriptionPeriod = isOutsideOfSubscriptionPeriod;
        this.moneySymbol = moneySymbol ? moneySymbol : '$';
        this.rates = [];
        if (this.userSettings.country === YMUserSettings_1.YMCountry.US) {
            this.rates.push({ purpose: `business (general)`, rate: `${common_1.milesToMetric(YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.business, this.userSettings, this.globalSettings), this.userSettings.personalSettings.isMetricSystem)}` });
            this.rates.push({ purpose: `medical`, rate: `${common_1.milesToMetric(YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.medical, this.userSettings, this.globalSettings), this.userSettings.personalSettings.isMetricSystem)}` });
            this.rates.push({ purpose: `charity`, rate: `${common_1.milesToMetric(YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.charity, this.userSettings, this.globalSettings), this.userSettings.personalSettings.isMetricSystem)}` });
            this.rates.push({ purpose: `moving`, rate: `${common_1.milesToMetric(YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.moving, this.userSettings, this.globalSettings), this.userSettings.personalSettings.isMetricSystem)}` });
            this.rates.push({ purpose: `personal`, rate: `${common_1.milesToMetric(YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.personal, this.userSettings, this.globalSettings), this.userSettings.personalSettings.isMetricSystem)}` });
        }
        if (this.userSettings.country === YMUserSettings_1.YMCountry.CA) {
            const fromToDistanceInMilesCA = common_1.metricToMiles(5000);
            this.rates.push({ purpose: `business (first ${this.getDistanceFormated(fromToDistanceInMilesCA, this.userSettings)})`, rate: `${common_1.milesToMetric(YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.business, this.userSettings, this.globalSettings), this.userSettings.personalSettings.isMetricSystem)}` });
            this.rates.push({ purpose: `business (after ${this.getDistanceFormated(fromToDistanceInMilesCA, this.userSettings)})`, rate: `${common_1.milesToMetric(YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.business, this.userSettings, this.globalSettings, undefined, fromToDistanceInMilesCA + 1), this.userSettings.personalSettings.isMetricSystem)}` });
            this.rates.push({ purpose: `personal`, rate: `${common_1.milesToMetric(YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.personal, this.userSettings, this.globalSettings), this.userSettings.personalSettings.isMetricSystem)}` });
        }
        if (this.userSettings.country === YMUserSettings_1.YMCountry.AU) {
            const fromToDistanceInMilesAU = common_1.metricToMiles(5000);
            this.rates.push({ purpose: `business (first ${this.getDistanceFormated(fromToDistanceInMilesAU, this.userSettings)})`, rate: `${common_1.milesToMetric(YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.business, this.userSettings, this.globalSettings), this.userSettings.personalSettings.isMetricSystem)}` });
            this.rates.push({ purpose: `personal`, rate: `${common_1.milesToMetric(YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.personal, this.userSettings, this.globalSettings), this.userSettings.personalSettings.isMetricSystem)}` });
        }
        if (this.userSettings.country === YMUserSettings_1.YMCountry.UK) {
            const fromToDistanceInMilesUK = common_1.metricToMiles(10000);
            this.rates.push({ purpose: `car - business (first ${this.getDistanceFormated(fromToDistanceInMilesUK, this.userSettings)})`, rate: `${common_1.milesToMetric(YMRate_1.default.GetRates(undefined, this.globalSettings.ukRates)[YMRate_1.default.BUSINESS].getRateFromMileage(fromToDistanceInMilesUK - 10, YMVehicle_1.YMVehicleType.car), this.userSettings.personalSettings.isMetricSystem)}` });
            this.rates.push({ purpose: `car - business (after ${this.getDistanceFormated(fromToDistanceInMilesUK, this.userSettings)})`, rate: `${common_1.milesToMetric(YMRate_1.default.GetRates(undefined, this.globalSettings.ukRates)[YMRate_1.default.BUSINESS].getRateFromMileage(fromToDistanceInMilesUK + 10, YMVehicle_1.YMVehicleType.car), this.userSettings.personalSettings.isMetricSystem)}` });
            this.rates.push({ purpose: `motorcycle - business`, rate: `${common_1.milesToMetric(YMRate_1.default.GetRates(undefined, this.globalSettings.ukRates)[YMRate_1.default.BUSINESS].getRateFromMileage(0, YMVehicle_1.YMVehicleType.motorcycle), this.userSettings.personalSettings.isMetricSystem)}` });
            this.rates.push({ purpose: `bicycle - business`, rate: `${common_1.milesToMetric(YMRate_1.default.GetRates(undefined, this.globalSettings.ukRates)[YMRate_1.default.BUSINESS].getRateFromMileage(0, YMVehicle_1.YMVehicleType.bicycle), this.userSettings.personalSettings.isMetricSystem)}` });
            this.rates.push({ purpose: `personal`, rate: `${common_1.milesToMetric(YMRate_1.default.getRateForPurposeId(YMPurpose_1.default.defaultPuposesIds.personal, this.userSettings, this.globalSettings), this.userSettings.personalSettings.isMetricSystem)}` });
        }
        if (this.userSettings.country === YMUserSettings_1.YMCountry.CUSTOME || this.userSettings.country === YMUserSettings_1.YMCountry.UNKNOWN) {
            this.userSettings.purposes.map(p => {
                this.rates.push({ purpose: `${p.name}`, rate: `${common_1.milesToMetric(YMRate_1.default.getRateForPurposeId(p.purposeId, this.userSettings, this.globalSettings), this.userSettings.personalSettings.isMetricSystem)}` });
            });
        }
    }
    addDriveValue(drive, savedLocations) {
        const newLine = YMReportLine_1.default.fromDrive(drive, this.userSettings, this.globalSettings, savedLocations);
        this.lines.push(newLine);
        const vehicle = this.userSettings.vehicles.filter(v => v.vehicleId === drive.vehicleId)[0];
        const purpose = drive.getPurpose(this.userSettings, this.globalSettings);
        // Every custom rate the user creates is considered to be 'business'
        const isBusiness = purpose !== undefined && purpose.category.toLowerCase() === 'business';
        const newVehicleLine = new YMReportVehicleLine_1.default(newLine.vehicle, vehicle === undefined ? 0 : vehicle.getOdometerReadIfExist(drive.startTime().getFullYear()), drive.miles, drive.getValue(this.userSettings, this.globalSettings), drive.driveNotes.parkingMoney, drive.driveNotes.tollMoney);
        if (isBusiness) {
            const vehicleLine = this.vehicleBusinessLines.filter(v => v.vehicle === newLine.vehicle)[0];
            if (vehicleLine === undefined) {
                this.vehicleBusinessLines.push(newVehicleLine);
            }
            else {
                vehicleLine.miles += newVehicleLine.miles;
                vehicleLine.mileageValue += newVehicleLine.mileageValue;
                vehicleLine.parkingValue += newVehicleLine.parkingValue;
                vehicleLine.tollsValue += newVehicleLine.tollsValue;
                vehicleLine.totalValue += newVehicleLine.totalValue;
                this.vehicleBusinessLines = [...this.vehicleBusinessLines.filter(v => v.vehicle !== newLine.vehicle), vehicleLine];
            }
        }
        else { // Personal
            const vehicleLine = this.vehiclePersonalLines.filter(v => v.vehicle === newLine.vehicle)[0];
            if (vehicleLine === undefined) {
                this.vehiclePersonalLines.push(newVehicleLine);
            }
            else {
                vehicleLine.miles += newVehicleLine.miles;
                vehicleLine.mileageValue += newVehicleLine.mileageValue;
                vehicleLine.parkingValue += newVehicleLine.parkingValue;
                vehicleLine.tollsValue += newVehicleLine.tollsValue;
                vehicleLine.totalValue += newVehicleLine.totalValue;
                this.vehiclePersonalLines = [...this.vehiclePersonalLines.filter(v => v.vehicle !== newLine.vehicle), vehicleLine];
            }
        }
        this.vehicleBusinessLines.sort((a, b) => { return b.miles - a.miles; });
        this.vehiclePersonalLines.sort((a, b) => { return b.miles - a.miles; });
        this.lines.sort((a, b) => a.when.getTime() - b.when.getTime());
    }
    getPersonalMiles() {
        return this.vehiclePersonalLines.map(x => x.miles).reduce((total, num) => total + num, 0);
    }
    getBusinessMiles() {
        return this.vehicleBusinessLines.map(x => x.miles).reduce((total, num) => total + num, 0);
    }
    getPersonalValue() {
        return this.vehiclePersonalLines.map(x => x.mileageValue).reduce((total, num) => total + num, 0);
    }
    getBusinessValue() {
        return this.vehicleBusinessLines.map(x => x.mileageValue).reduce((total, num) => total + num, 0);
    }
    getPersonalTollsValue() {
        return this.vehiclePersonalLines.map(x => x.tollsValue).reduce((total, num) => total + num, 0);
    }
    getBusinessTollsValue() {
        return this.vehicleBusinessLines.map(x => x.tollsValue).reduce((total, num) => total + num, 0);
    }
    getPersonalParkingValue() {
        return this.vehiclePersonalLines.map(x => x.parkingValue).reduce((total, num) => total + num, 0);
    }
    getBusinessParkingValue() {
        return this.vehicleBusinessLines.map(x => x.parkingValue).reduce((total, num) => total + num, 0);
    }
    getPersonalTotalValue() {
        return this.vehiclePersonalLines.map(x => x.totalValue).reduce((total, num) => total + num, 0);
    }
    getBusinessTotalValue() {
        return this.vehicleBusinessLines.map(x => x.totalValue).reduce((total, num) => total + num, 0);
    }
    DistanceUnit(isMetric) {
        return isMetric ? 'km' : 'mi';
    }
    formatMoney(amount, symbol, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            let amountStr = `${amount}`;
            let _decimalCount = Math.abs(decimalCount);
            _decimalCount = isNaN(_decimalCount) ? 2 : _decimalCount;
            const negativeSign = Number(amountStr) < 0 ? "-" : "";
            const i = parseInt(amountStr = Math.abs(Number(amountStr) || 0).toFixed(_decimalCount)).toString();
            const j = (i.length > 3) ? i.length % 3 : 0;
            return symbol + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, symbol + "1" + thousands) + (_decimalCount ? decimal + Math.abs(Number(amountStr) - Number(i)).toFixed(_decimalCount).slice(2) : "");
        }
        catch (e) {
            console.log(e);
            return symbol + "0.00";
        }
    }
    ;
    getDistanceFormated(miles, userSettings) {
        const dist = common_1.milesToMetricNumber(miles, userSettings.personalSettings.isMetricSystem);
        return `${this.formatMoney(dist, '', 0, '.', ',')}${this.DistanceUnit(userSettings.personalSettings.isMetricSystem)}`;
    }
    getCsvData() {
        let data = '';
        data += '****,****,****,****,****,****,****,****,****,****\n';
        data += 'This,report,was,generated,by,ThisIsMilo.com\n';
        data += '****,****,****,****,****,****,****,****,****,****\n';
        data += '\n';
        data += '\n';
        data += 'Name,';
        data += 'Project,';
        data += 'Customer,';
        data += 'Details,';
        data += '\n';
        data += `${this.name},${this.project},${this.customerDetails},`;
        data += `${this.details}`;
        data += '\n';
        data += '\n';
        data += 'Rates';
        data += '\n';
        data += `Purpose,Rate (per ${this.DistanceUnit(this.userSettings.personalSettings.isMetricSystem)})`;
        this.rates.map(rate => {
            data += '\n';
            data += `${rate.purpose}, ${rate.rate}`;
        });
        data += '\n';
        data += '\n';
        data += 'Business Summary';
        data += '\n';
        data += 'Vehicle,';
        data += 'Odometer (Start of Year),';
        data += `Business (${this.isMetricSystem ? 'km' : 'mi'}),`;
        data += 'Mileage Value,';
        data += 'Parking Value ($),';
        data += 'Tolls Value ($),';
        data += 'Total Value ($),';
        data += '\n';
        this.vehicleBusinessLines.forEach(vl => {
            data += `${vl.vehicle},`;
            data += `${vl.odometerRead},`;
            data += `${common_1.milesToMetric(vl.miles, this.isMetricSystem)},`;
            data += `${common_1.roundNumber(vl.mileageValue)},`;
            data += `${common_1.roundNumber(vl.parkingValue)},`;
            data += `${common_1.roundNumber(vl.tollsValue)},`;
            data += `${common_1.roundNumber(vl.totalValue)},`;
            data += '\n';
        });
        data += `,`;
        data += `Total,`;
        data += `${common_1.milesToMetric(this.getBusinessMiles(), this.isMetricSystem)},`;
        data += `${common_1.roundNumber(this.getBusinessValue())},`;
        data += `${common_1.roundNumber(this.getBusinessParkingValue())},`;
        data += `${common_1.roundNumber(this.getBusinessTollsValue())},`;
        data += `${common_1.roundNumber(this.getBusinessTotalValue())},`;
        data += '\n';
        data += '\n';
        data += '\n';
        data += 'Personal Summary';
        data += '\n';
        data += 'Vehicle,';
        data += 'Odometer (Start of Year),';
        data += `Personal (${this.isMetricSystem ? 'km' : 'mi'}),`;
        data += 'Mileage Value,';
        data += 'Parking Value ($),';
        data += 'Tolls Value ($),';
        data += 'Total Value ($),';
        data += '\n';
        this.vehiclePersonalLines.forEach(vl => {
            data += `${vl.vehicle},`;
            data += `${common_1.milesToMetric(vl.odometerRead)},`;
            data += `${common_1.milesToMetric(vl.miles, this.isMetricSystem)},`;
            data += `${common_1.roundNumber(vl.mileageValue)},`;
            data += `${common_1.roundNumber(vl.parkingValue)},`;
            data += `${common_1.roundNumber(vl.tollsValue)},`;
            data += `${common_1.roundNumber(vl.totalValue)},`;
            data += '\n';
        });
        data += `,`;
        data += `Total,`;
        data += `${common_1.milesToMetric(this.getPersonalMiles(), this.isMetricSystem)},`;
        data += `${common_1.roundNumber(this.getPersonalValue())},`;
        data += `${common_1.roundNumber(this.getPersonalParkingValue())},`;
        data += `${common_1.roundNumber(this.getPersonalTollsValue())},`;
        data += `${common_1.roundNumber(this.getPersonalTotalValue())},`;
        data += '\n';
        data += '\n';
        data += '\n';
        data += 'Mileage Log';
        data += '\n';
        data += '#,';
        data += 'When,';
        data += 'Rate ($),';
        data += `Why,`;
        data += `From -> To,`;
        data += `From -> To (Frequent Locations),`;
        data += `Vehicle,`;
        data += `Distance (${this.isMetricSystem ? 'km' : 'mi'}),`;
        data += `Value ($),`;
        data += `Parking ($),`;
        data += `Tolls ($),`;
        data += `Total ($),`;
        data += `Notes,`;
        data += '\n';
        this.lines.forEach((dl, index) => {
            data += `${index + 1},`;
            data += `${Moment.utc(dl.when.getTime()).format('MMMM Do YYYY h:mm a')},`;
            data += `${dl.rate},`;
            data += `${dl.purpose},`;
            data += `${dl.fromTo},`;
            data += `${dl.fromToPersonalized},`;
            data += `${dl.vehicle},`;
            data += `${common_1.milesToMetric(dl.distanceInMiles, this.isMetricSystem)},`;
            data += `${common_1.roundNumber(dl.value)},`;
            data += `${common_1.roundNumber(dl.parking)},`;
            data += `${common_1.roundNumber(dl.tolls)},`;
            data += `${common_1.roundNumber(dl.tolls + dl.parking + dl.value)},`;
            data += dl.note;
            data += '\n';
        });
        data += `,`;
        data += `,`;
        data += `,`;
        data += `Total,`;
        data += `${common_1.milesToMetric(this.getBusinessMiles() + this.getPersonalMiles(), this.isMetricSystem)},`;
        data += `${common_1.roundNumber(this.getBusinessValue() + this.getPersonalValue())},`;
        data += `${common_1.roundNumber(this.getBusinessParkingValue() + this.getPersonalParkingValue())},`;
        data += `${common_1.roundNumber(this.getBusinessTollsValue() + this.getPersonalTollsValue())},`;
        data += `${common_1.roundNumber(this.getBusinessTotalValue() + this.getPersonalTotalValue())},`;
        data += '\n';
        data += '\n';
        data += '****,****,****,****,****,****,****,****,****,****\n';
        data += 'This,report,was,generated,by,ThisIsMilo.com\n';
        data += '****,****,****,****,****,****,****,****,****,****\n';
        return data;
    }
}
// tslint:disable-next-line:member-ordering
YMReport.fromObject = function (obj) {
    if (obj == null)
        return new YMReport('', new Date(), '', '', '', '', YMUserSettings_1.default.fromObject(undefined), YMGlobalUserSettings_1.default.fromObject(undefined), false, YMDateRange_1.default.fromObject(undefined), [], [], [], '', '', '', false, '$', null, null, null);
    return new YMReport(obj.reportName, new Date(obj.dateCreated), obj.name, obj.project, obj.customerDetails, obj.details, obj.userSettings, obj.globalSettings, obj.isMetricSystem, obj.dateRange, obj.lines, obj.vehicleBusinessLines, obj.vehiclePersonalLines, obj.reportId, obj.csvLink, obj.pdfLink, obj.isOutsideOfSubscriptionPeriod, obj.moneySymbol, obj.approvalRequestId, obj.isApproved, obj.denyReason);
};
exports.default = YMReport;
//# sourceMappingURL=YMReport.js.map