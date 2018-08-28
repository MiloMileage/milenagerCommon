import YMDrive from './../common/YMDrive';
import YMDateRange from './../common/YMDateRange';
import YMSavedLocation from './../common/YMSavedLocation';
import YMLocation from './../common/YMLocation';
export declare const addDays: (startDate: Date, numberOfDays: number) => Date;
export declare const filterDrives: (drives: YMDrive[], dateRange: YMDateRange, filterTerm: string) => YMDrive[];
export declare const selectedDrivesFromIds: (drives: YMDrive[], selectedDrivesIds: string[]) => YMDrive[];
export declare const selectedDrivesOnDay: (drives: YMDrive[], day: Date) => YMDrive[];
export declare const sortDrivesByDate: (drives: YMDrive[]) => YMDrive[];
export declare const filterDeletedDrives: (drives: YMDrive[]) => YMDrive[];
export declare const roundNumber: (num: number, pow?: number) => number;
export declare const getMapImage: (pathColor: string, pathWeight: string, colorStart: string, colorEnd: string, locationArray: {
    lat: number;
    lon: number;
}[], mapSize: {
    width: number;
    height: number;
}) => string;
export declare const getArrayOfsavedLocations: (map: Map<string, YMSavedLocation>) => YMSavedLocation[];
export declare const getSavedLocationIfExist: (personalLocations: {
    [ind: string]: YMSavedLocation;
}, location: YMLocation, distance?: number) => YMSavedLocation;
export declare const getPersonalNameIfExist: (personalLocations: {
    [ind: string]: YMSavedLocation;
}, location: YMLocation, defaultName: string, distance?: number) => string;
export declare const milesToMetric: (num: number, convert?: boolean, roundFactor?: number) => number;
export declare const metricToMiles: (num: number, convert?: boolean, roundFactor?: number) => number;
declare const _default: {
    filterDrives: (drives: YMDrive[], dateRange: YMDateRange, filterTerm: string) => YMDrive[];
    selectedDrivesFromIds: (drives: YMDrive[], selectedDrivesIds: string[]) => YMDrive[];
    selectedDrivesOnDay: (drives: YMDrive[], day: Date) => YMDrive[];
    addDays: (startDate: Date, numberOfDays: number) => Date;
    sortDrivesByDate: (drives: YMDrive[]) => YMDrive[];
    filterDeletedDrives: (drives: YMDrive[]) => YMDrive[];
    roundNumber: (num: number, pow?: number) => number;
    getMapImage: (pathColor: string, pathWeight: string, colorStart: string, colorEnd: string, locationArray: {
        lat: number;
        lon: number;
    }[], mapSize: {
        width: number;
        height: number;
    }) => string;
    getArrayOfsavedLocations: (map: Map<string, YMSavedLocation>) => YMSavedLocation[];
    getPersonalNameIfExist: (personalLocations: {
        [ind: string]: YMSavedLocation;
    }, location: YMLocation, defaultName: string, distance?: number) => string;
    getSavedLocationIfExist: (personalLocations: {
        [ind: string]: YMSavedLocation;
    }, location: YMLocation, distance?: number) => YMSavedLocation;
    milesToMetric: (num: number, convert?: boolean, roundFactor?: number) => number;
    metricToMiles: (num: number, convert?: boolean, roundFactor?: number) => number;
};
export default _default;
