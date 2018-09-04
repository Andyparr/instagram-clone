import { CreateListingMutationVariables } from '../../schemaTypes';
export declare const createListingMutation: any;
export interface WithCreateListing {
    createListing: (variables: CreateListingMutationVariables) => void;
}
export declare const withCreateListing: (WrappedComponent: import("react").ComponentType<any>) => import("react").ComponentClass<any, import("react").ComponentState>;
