import * as React from 'react';
import { ViewListingQuery_viewListing } from '../../schemaTypes';
export declare const viewListingQuery: any;
export interface WithViewListing {
    listing: ViewListingQuery_viewListing | null;
    loading: boolean;
}
interface Props {
    listingId: string;
    children: (data: WithViewListing) => JSX.Element | null;
}
export declare class ViewListing extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
