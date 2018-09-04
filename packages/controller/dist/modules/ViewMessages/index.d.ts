import * as React from 'react';
import { ViewMessagesQuery_messages } from '../../schemaTypes';
export declare const viewMessagesQuery: any;
export declare const newMessageSubscription: any;
export interface WithViewMessages {
    messages: ViewMessagesQuery_messages[];
    loading: boolean;
    subscribe: () => () => void;
}
interface Props {
    listingId: string;
    children: (data: WithViewMessages) => JSX.Element | null;
}
export declare class ViewMessages extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
