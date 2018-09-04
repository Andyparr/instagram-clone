import * as React from 'react';
import { MutationFn } from 'react-apollo';
import { UpdateListingMutationVariables, UpdateListingMutation } from '../../schemaTypes';
export declare const updateListingMutation: any;
export interface WithUpdateListing {
    updateListing: MutationFn<UpdateListingMutation, UpdateListingMutationVariables>;
}
interface Props {
    children: (data: WithUpdateListing) => JSX.Element | null;
}
export declare class UpdateListing extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
