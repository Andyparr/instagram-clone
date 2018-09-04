import * as React from 'react';
import { LoginMutationVariables } from '../../schemaTypes';
import { NormalizedErrorMap } from '../../types/NormalizedErrorMap';
interface Props {
    onSessionId?: (sessionId: string) => void;
    children: (data: {
        submit: (values: LoginMutationVariables) => Promise<NormalizedErrorMap | null>;
    }) => JSX.Element | null;
}
export declare const LoginController: React.ComponentClass<Props>;
export {};
