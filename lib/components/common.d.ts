import YMDrive from './../common/YMDrive';
import YMDateRange from './../common/YMDateRange';
import YMSavedLocation from './../common/YMSavedLocation';
export declare const addDays: (startDate: Date, numberOfDays: number) => Date;
export declare const filterDrives: (drives: YMDrive[], dateRange: YMDateRange, filterTerm: string) => YMDrive[];
export declare const selectedDrivesFromIds: (drives: YMDrive[], selectedDrivesIds: string[]) => YMDrive[];
export declare const selectedDrivesOnDay: (drives: YMDrive[], day: Date) => YMDrive[];
export declare const sortDrivesByDate: (drives: YMDrive[]) => YMDrive[];
export declare const filterDeletedDrives: (drives: YMDrive[]) => YMDrive[];
export declare const roundNumber: (num: number, pow: number) => number;
export declare const getMapImage: (pathColor: string, pathWeight: string, colorStart: string, colorEnd: string, locationArray: {
    lat: number;
    lon: number;
}[], mapSize: {
    width: number;
    height: number;
}) => string;
export declare const getArrayOfsavedLocations: (map: Map<string, YMSavedLocation>) => YMSavedLocation[];
export declare const getPersonalNameIfExist: (personalNames: any, key: any, defaultName: any) => any;
declare const _default: {
    filterDrives: (drives: YMDrive[], dateRange: YMDateRange, filterTerm: string) => YMDrive[];
    selectedDrivesFromIds: (drives: YMDrive[], selectedDrivesIds: string[]) => YMDrive[];
    selectedDrivesOnDay: (drives: YMDrive[], day: Date) => YMDrive[];
    addDays: (startDate: Date, numberOfDays: number) => Date;
    sortDrivesByDate: (drives: YMDrive[]) => YMDrive[];
    filterDeletedDrives: (drives: YMDrive[]) => YMDrive[];
    roundNumber: (num: number, pow: number) => number;
    getMapImage: (pathColor: string, pathWeight: string, colorStart: string, colorEnd: string, locationArray: {
        lat: number;
        lon: number;
    }[], mapSize: {
        width: number;
        height: number;
    }) => string;
    getArrayOfsavedLocations: (map: Map<string, YMSavedLocation>) => YMSavedLocation[];
    getPersonalNameIfExist: (personalNames: any, key: any, defaultName: any) => any;
};
export default _default;
