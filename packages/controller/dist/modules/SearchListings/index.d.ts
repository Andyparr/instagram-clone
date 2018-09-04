import * as React from 'react';
import { SearchListingsQueryVariables, SearchListingsQuery_searchListings } from '../../schemaTypes';
export declare const searchListingsQuery: any;
export interface WithSearchListings {
    listings: SearchListingsQuery_searchListings[];
    loading: boolean;
}
interface Props {
    variables: SearchListingsQueryVariables;
    children: (data: WithSearchListings) => JSX.Element | null;
}
export declare class SearchListings extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
