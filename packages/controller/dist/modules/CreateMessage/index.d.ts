import * as React from 'react';
import { MutationFn } from 'react-apollo';
import { CreateMessageMutationVariables, CreateMessageMutation } from '../../schemaTypes';
export declare const createMessageMutation: any;
export interface WithCreateMessage {
    createMessage: MutationFn<CreateMessageMutation, CreateMessageMutationVariables>;
}
interface Props {
    children: (data: WithCreateMessage) => JSX.Element | null;
}
export declare class CreateMessage extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
