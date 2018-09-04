import * as React from 'react';
import { ChildProps } from 'react-apollo';
import { RouteProps, RouteComponentProps } from 'react-router';
import { MeQuery } from '../../schemaTypes';
declare type Props = RouteProps;
export declare class C extends React.PureComponent<ChildProps<Props, MeQuery>> {
    renderRoute: (routeProps: RouteComponentProps<{}, import("react-router").StaticContext>) => JSX.Element | null;
    render(): JSX.Element;
}
export declare const AuthRoute: import("react").ComponentClass<RouteProps, import("react").ComponentState>;
export {};
