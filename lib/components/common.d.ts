import YMDrive from './../common/YMDrive';
import YMDateRange from './../common/YMDateRange';
import YMSavedLocation from './../common/YMSavedLocation';
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
