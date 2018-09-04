import { FindListingsQuery_findListings } from '../../schemaTypes';
export declare const findListingsQuery: any;
export interface WithFindListings {
    listings: FindListingsQuery_findListings[];
    loading: boolean;
}
export declare const withFindListings: (WrappedComponent: import("react").ComponentType<any>) => import("react").ComponentClass<any, import("react").ComponentState>;
